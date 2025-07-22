// components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { useShop } from "../context/ShopContext";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { cart, wishlist } = useShop();
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Sell Your Book", path: "/admin/dashboard" },
  ];

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav
      className={`bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 transition-all duration-300 ${
        isSticky ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 text-2xl font-bold text-[#9dd1c8] rtl:space-x-reverse hover:text-[#7dbeb5] transition-colors"
        >
          <FaBlog className="mr-1" /> Book
        </Link>

        {/* Mobile Menu Toggle - Moved to be alongside logo */}
        <div className="flex items-center md:order-2 space-x-4">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <FaXmark className="w-6 h-6" />
            ) : (
              <FaBarsStaggered className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Wishlist Icon */}
            <div className="relative">
              <Link
                to="/wishlist"
                className="text-gray-700 hover:text-[#9dd1c8] cursor-pointer transition-colors duration-300 relative"
              >
                {wishlist.length > 0 ? (
                  <IoIosHeart className="w-6 h-6 text-pink-500" />
                ) : (
                  <IoIosHeartEmpty className="w-6 h-6" />
                )}
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </div>

            {/* Cart Icon */}
            <div className="relative">
              <Link
                to="/cart"
                className="text-gray-700 hover:text-[#9dd1c8] transition-colors duration-300 relative"
              >
                <CiShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#9dd1c8] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* User Profile or Login */}
            <div className="relative">
              {user ? (
                <div className="flex items-center space-x-3 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                  <span className="text-sm font-semibold text-[#6b9080]">
                    👋 Hello,{" "}
                    <span className="text-[#9dd1c8]">{user.name}</span>
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm px-3 py-1 bg-[#9dd1c8] text-white rounded-full hover:bg-[#aad9cf] transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-[#9dd1c8] cursor-pointer transition-colors duration-300 relative"
                >
                  <CiUser className="w-6 h-6" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-5 w-full md:hidden">
            {/* Nav Links */}
            <ul className="flex flex-col items-center p-4 font-medium border-2 border-[#A7D2CB] rounded-2xl bg-white">
              {navItems.map(({ name, path }, index) => (
                <li
                  key={index}
                  className="relative group w-full text-center py-3"
                >
                  <Link
                    to={path}
                    onClick={toggleMenu}
                    className=" py-2 px-3 text-black rounded-md transition-all duration-300 hover:text-[#9dd1c8] relative inline-flex flex-col items-center"
                  >
                    {name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#9dd1c8] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Icons */}
            <div className="mt-5 flex justify-center  space-x-8 p-4">
              <Link
                to="/wishlist"
                onClick={toggleMenu}
                className="text-gray-700 hover:text-[#9dd1c8] transition-colors duration-300 relative cursor-pointer"
              >
                {wishlist.length > 0 ? (
                  <IoIosHeart className="w-6 h-6 text-pink-500" />
                ) : (
                  <IoIosHeartEmpty className="w-6 h-6" />
                )}
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                onClick={toggleMenu}
                className="text-gray-700  hover:text-[#9dd1c8] transition-colors duration-300 relative"
              >
                <CiShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#9dd1c8] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 text-xs underline font-semibold">
                    Hello, {user.name}
                  </span>
                  <button
                    onClick={() => {
                      toggleMenu();
                      logout();
                    }}
                    className="text-gray-500 cursor-pointer hover:text-[#9dd1c8] transition-colors duration-300 text-xs mr-5"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="text-gray-700 hover:text-[#9dd1c8] transition-colors duration-300 relative"
                >
                  <CiUser className="w-6 h-6" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Desktop Nav Links */}
        <div className="hidden md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {navItems.map(({ name, path }, index) => (
              <li key={index} className="relative group">
                <Link
                  to={path}
                  className="block py-2 px-3 text-black rounded-md md:p-0 transition-all duration-300 hover:text-[#9dd1c8]"
                >
                  {name}
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 bg-[#9dd1c8] w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
