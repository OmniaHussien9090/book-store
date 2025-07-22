require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://book-store:DjC953MDkvPuKDs@cluster0.ngp2ztv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const bookCollections = client.db("BookInventory").collection("books");
    const userCollections = client.db("UserAuth").collection("users");
    await userCollections.createIndex({ email: 1 }, { unique: true });

    // Helper function to populate cart/wishlist with book details
    const populateUserItems = async (user) => {
      const cartWithDetails = await Promise.all(
        user.cart.map(async (item) => {
          const book = await bookCollections.findOne({
            _id: new ObjectId(item.productId),
          });
          return { ...item, bookDetails: book };
        })
      );

      const wishlistWithDetails = await Promise.all(
        user.wishlist.map(async (item) => {
          const book = await bookCollections.findOne({
            _id: new ObjectId(item.productId),
          });
          return { ...item, bookDetails: book };
        })
      );

      return {
        ...user,
        cart: cartWithDetails.filter((item) => item.bookDetails), // Filter out invalid items
        wishlist: wishlistWithDetails.filter((item) => item.bookDetails),
      };
    };

    // Register
    app.post("/register", async (req, res) => {
      try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
          return res.status(400).json({ message: "All fields are required" });
        }

        const existedUser = await userCollections.findOne({ email });
        if (existedUser)
          return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
          name,
          email,
          password: hashedPassword,
          cart: [],
          wishlist: [],
          createdAt: new Date(),
        };

        await userCollections.insertOne(newUser);
        res.status(201).json({ message: "User registered successfully" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    // Login
    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res
            .status(400)
            .json({ message: "Email and password are required" });
        }

        const user = await userCollections.findOne({ email });
        if (!user)
          return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        const populatedUser = await populateUserItems(user);

        res
          .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
          })
          .json({
            message: "Login successful",
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              cart: populatedUser.cart,
              wishlist: populatedUser.wishlist,
            },
          });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    // Logout
    app.post("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        })
        .json({ message: "Logged out successfully" });
    });

    // Get current user
    app.get("/auth/me", async (req, res) => {
      try {
        const token = req.cookies.token;
        if (!token)
          return res.status(401).json({ message: "Not authenticated" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userCollections.findOne(
          { _id: new ObjectId(decoded.userId) },
          { projection: { password: 0 } }
        );

        if (!user) return res.status(404).json({ message: "User not found" });

        const populatedUser = await populateUserItems(user);
        res.json(populatedUser);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    // Cart operations
    app.post("/cart", async (req, res) => {
      try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const { productId, quantity = 1 } = req.body;
        if (!productId)
          return res.status(400).json({ message: "Product ID is required" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if product exists
        const product = await bookCollections.findOne({
          _id: new ObjectId(productId),
        });
        if (!product)
          return res.status(404).json({ message: "Product not found" });

        // Update existing item or add new one
        const result = await userCollections.updateOne(
          { _id: new ObjectId(decoded.userId), "cart.productId": productId },
          { $set: { "cart.$.quantity": quantity } }
        );

        if (result.matchedCount === 0) {
          await userCollections.updateOne(
            { _id: new ObjectId(decoded.userId) },
            { $addToSet: { cart: { productId, quantity } } }
          );
        }

        // Return updated user data
        const updatedUser = await userCollections.findOne(
          { _id: new ObjectId(decoded.userId) },
          { projection: { password: 0 } }
        );
        const populatedUser = await populateUserItems(updatedUser);

        res.json({
          message: "Cart updated successfully",
          cart: populatedUser.cart,
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    app.delete("/cart/:productId", async (req, res) => {
      try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await userCollections.updateOne(
          { _id: new ObjectId(decoded.userId) },
          { $pull: { cart: { productId: req.params.productId } } }
        );

        // Return updated user data
        const updatedUser = await userCollections.findOne(
          { _id: new ObjectId(decoded.userId) },
          { projection: { password: 0 } }
        );
        const populatedUser = await populateUserItems(updatedUser);

        res.json({
          message: "Product removed from cart",
          cart: populatedUser.cart,
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    // Wishlist operations
    app.post("/wishlist", async (req, res) => {
      try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const { productId } = req.body;
        if (!productId)
          return res.status(400).json({ message: "Product ID is required" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if product exists
        const product = await bookCollections.findOne({
          _id: new ObjectId(productId),
        });
        if (!product)
          return res.status(404).json({ message: "Product not found" });

        await userCollections.updateOne(
          { _id: new ObjectId(decoded.userId) },
          { $addToSet: { wishlist: { productId } } }
        );

        // Return updated user data
        const updatedUser = await userCollections.findOne(
          { _id: new ObjectId(decoded.userId) },
          { projection: { password: 0 } }
        );
        const populatedUser = await populateUserItems(updatedUser);

        res.json({
          message: "Product added to wishlist",
          wishlist: populatedUser.wishlist,
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    app.delete("/wishlist/:productId", async (req, res) => {
      try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await userCollections.updateOne(
          { _id: new ObjectId(decoded.userId) },
          { $pull: { wishlist: { productId: req.params.productId } } }
        );

        // Return updated user data
        const updatedUser = await userCollections.findOne(
          { _id: new ObjectId(decoded.userId) },
          { projection: { password: 0 } }
        );
        const populatedUser = await populateUserItems(updatedUser);

        res.json({
          message: "Product removed from wishlist",
          wishlist: populatedUser.wishlist,
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    // Books APIs
    app.post("/upload-book", async (req, res) => {
      const result = await bookCollections.insertOne(req.body);
      res.send(result);
    });

    app.get("/books", async (req, res) => {
      const result = await bookCollections.find().toArray();
      res.send(result);
    });

    app.get("/books/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await bookCollections.findOne({ _id: new ObjectId(id) });
        if (!result) return res.status(404).json({ message: "Book not found" });
        res.json(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    app.put("/book/:id", async (req, res) => {
      const filter = { _id: new ObjectId(req.params.id) };
      const updatedDocs = { $set: { ...req.body } };
      const result = await bookCollections.updateOne(filter, updatedDocs);
      res.send(result);
    });

    app.delete("/delete-book/:id", async (req, res) => {
      const result = await bookCollections.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    app.get("/books/category=:category", async (req, res) => {
      const books = await bookCollections
        .find({ category: req.params.category })
        .toArray();
      res.send(books);
    });

    console.log("Connected to MongoDB successfully!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
