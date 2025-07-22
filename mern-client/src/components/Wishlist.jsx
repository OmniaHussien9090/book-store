import React from "react";
import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";

const Wishlist = () => {
  const { 
    wishlist, 
    removeFromWishlist,
    addToCart,
    isInWishlist
  } = useShop();

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-gray-600 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save items you love for later.</p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-[#9dd1c8] text-white rounded-lg hover:bg-[#7dbeb5] transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => {
            // Safely access book details with fallbacks
            const book = item.bookDetails || {};
            const price = parseFloat(book.price) || 0;
            
            return (
              <div
                key={item.productId}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={book.imageURL || "https://via.placeholder.com/300x400?text=No+Image"}
                    alt={book.bookTitle || "Book"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                    }}
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => removeFromWishlist(item.productId)}
                      className="p-2 bg-white rounded-full shadow-md text-red-400 hover:text-red-600 transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">
                    {book.bookTitle || "Untitled Book"}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    by {book.authorName || "Unknown Author"}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-[#9dd1c8]">
                      ${price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(book)}
                      className="flex items-center gap-1 px-3 py-1 bg-[#9dd1c8] text-white rounded-full text-sm hover:bg-[#7dbeb5] transition-colors"
                    >
                      <FiShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;