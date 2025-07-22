import { createContext, useContext, useMemo } from "react";
import { AuthContext } from "./AuthContext";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const {
    cart,
    wishlist,
    loading,
    error,
    updateCart,
    updateWishlist,
    removeFromCart,
    removeFromWishlist,
    isAuthenticated,
  } = useContext(AuthContext);

  // Calculate cartTotal based on cart items
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = item.bookDetails?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  }, [cart]);

  // Calculate cart item count
  const cartItemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  // Add to cart with quantity
  const addToCart = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      return { success: false, message: "Please login to add to cart" };
    }
    return await updateCart(product._id, quantity);
  };

  // Increment cart item
  const incrementCartItem = async (productId) => {
    const item = cart.find(item => item.productId === productId);
    if (!item) return { success: false };
    return await updateCart(productId, item.quantity + 1);
  };

  // Decrement cart item
  const decrementCartItem = async (productId) => {
    const item = cart.find(item => item.productId === productId);
    if (!item) return { success: false };
    
    if (item.quantity <= 1) {
      return await removeFromCart(productId);
    }
    return await updateCart(productId, item.quantity - 1);
  };

  // Add to wishlist
  const addToWishlist = async (product) => {
    if (!isAuthenticated) {
      return { success: false, message: "Please login to add to wishlist" };
    }
    return await updateWishlist(product._id);
  };

  // Move item from wishlist to cart
  const moveToCart = async (product) => {
    if (!isAuthenticated) {
      return { success: false, message: "Please login to perform this action" };
    }

    try {
      // First remove from wishlist
      await removeFromWishlist(product._id);
      // Then add to cart
      await addToCart(product);
      return { success: true };
    } catch (err) {
      return { success: false, message: "Failed to move item to cart" };
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.productId === productId);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        loading,
        error,
        cartTotal,
        cartItemCount,
        addToCart,
        removeFromCart,
        incrementCartItem,
        decrementCartItem,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        isInWishlist,
        isAuthenticated,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};