import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Shop from "./pages/Shop";
import BookDetails from "./components/BookDetails";
import About from "./pages/About";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import SellYourBook from "./pages/SellYourBook";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";


import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// Scroll animation component wrapper
const ScrollAnimation = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true, // Set to true if you want animation only once
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
      }}
      transition={{ duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ScrollAnimation>
              <Home />
            </ScrollAnimation>
          }
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin/dashboard" element={<SellYourBook />} />
      </Route>
    </Routes>
  );
}

export default App;
