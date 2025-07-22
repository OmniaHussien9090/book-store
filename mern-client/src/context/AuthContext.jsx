import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data with error handling
  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/auth/me", {
        withCredentials: true,
      });

      const userData = res.data;
      setUser({
        id: userData._id,
        name: userData.name,
        email: userData.email,
      });

      setCart(userData.cart || []);
      setWishlist(userData.wishlist || []);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.log("Not logged in:", err.message);
      setUser(null);
      setCart([]);
      setWishlist([]);
      localStorage.removeItem("user");
      setError(err.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:5000/login", credentials, {
        withCredentials: true,
      });

      const { user: userInfo } = res.data;
      setUser({
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
      });

      setCart(userInfo.cart || []);
      setWishlist(userInfo.wishlist || []);
      localStorage.setItem("user", JSON.stringify(userInfo));

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post("http://localhost:5000/register", userData);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function - now returns success status instead of navigating
  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
      setCart([]);
      setWishlist([]);
      localStorage.removeItem("user");
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Update cart on server and refresh
  const updateCart = async (productId, quantity) => {
    try {
      await axios.post(
        "http://localhost:5000/cart",
        { productId, quantity },
        { withCredentials: true }
      );
      await fetchUserData();
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update cart");
      return { success: false };
    }
  };

  // Update wishlist on server and refresh
  const updateWishlist = async (productId) => {
    try {
      await axios.post(
        "http://localhost:5000/wishlist",
        { productId },
        { withCredentials: true }
      );
      await fetchUserData();
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update wishlist");
      return { success: false };
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${productId}`, {
        withCredentials: true,
      });
      await fetchUserData();
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove from cart");
      return { success: false };
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/wishlist/${productId}`, {
        withCredentials: true,
      });
      await fetchUserData();
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove from wishlist");
      return { success: false };
    }
  };

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + (item.bookDetails?.price || 0) * item.quantity,
    0
  );

  // Calculate cart item count
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <AuthContext.Provider
      value={{
        user,
        cart,
        wishlist,
        loading,
        error,
        login,
        register,
        logout,
        updateCart,
        updateWishlist,
        removeFromCart,
        removeFromWishlist,
        fetchUserData,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default AuthProvider;
