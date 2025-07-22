import React from "react";
import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";

const Cart = () => {
  const { 
    cart, 
    cartTotal, 
    removeFromCart,
    incrementCartItem,
    decrementCartItem
  } = useShop();

  const handleDecrement = async (id) => {
    await decrementCartItem(id);
  };

  const handleIncrement = async (id) => {
    await incrementCartItem(id);
  };

  // Helper function to safely format prices
  const formatPrice = (price) => {
    const numericPrice = Number(price) || 0;
    return numericPrice.toFixed(2);
  };

  return (
    <div className="container mx-auto mt-20 px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-gray-600 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any items yet.
          </p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-[#9dd1c8] text-white rounded-lg hover:bg-[#7dbeb5] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-700">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              <ul className="divide-y divide-gray-200">
                {cart.map((item) => {
                  const price = Number(item.bookDetails?.price) || 0;
                  const subtotal = price * item.quantity;

                  return (
                    <li
                      key={item.productId}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="grid grid-cols-12 items-center gap-4">
                        <div className="col-span-12 md:col-span-5 flex items-center">
                          <img
                            src={
                              item.bookDetails?.imageURL ||
                              "https://via.placeholder.com/80x120?text=No+Image"
                            }
                            alt={item.bookDetails?.bookTitle || "Book"}
                            className="w-20 h-28 object-cover rounded mr-4"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/80x120?text=No+Image";
                            }}
                          />
                          <div>
                            <h3 className="font-medium text-gray-800 line-clamp-2">
                              {item.bookDetails?.bookTitle || "Untitled Book"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              by {item.bookDetails?.authorName || "Unknown Author"}
                            </p>
                          </div>
                        </div>

                        <div className="col-span-4 md:col-span-2 text-center text-gray-700">
                          ${formatPrice(price)}
                        </div>

                        <div className="col-span-4 md:col-span-3">
                          <div className="flex items-center justify-center">
                            <button
                              className="p-2 text-gray-500 hover:text-[#9dd1c8] transition-colors"
                              onClick={() => handleDecrement(item.productId)}
                            >
                              <FiMinus />
                            </button>
                            <span className="mx-4 w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              className="p-2 text-gray-500 hover:text-[#9dd1c8] transition-colors"
                              onClick={() => handleIncrement(item.productId)}
                            >
                              <FiPlus />
                            </button>
                          </div>
                        </div>

                        <div className="col-span-4 md:col-span-2 flex items-center justify-end">
                          <span className="font-medium mr-4">
                            ${formatPrice(subtotal)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-red-400 hover:text-red-600 transition-colors p-1"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="divide-y divide-gray-200">
                <div className="py-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ${formatPrice(cartTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                </div>

                <div className="py-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">
                      Total
                    </span>
                    <span className="text-xl font-bold text-[#9dd1c8]">
                      ${formatPrice(cartTotal)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-[#9dd1c8] text-white rounded-lg hover:bg-[#7dbeb5] transition-colors">
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="block mt-4 text-center text-[#9dd1c8] hover:text-[#7dbeb5] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;