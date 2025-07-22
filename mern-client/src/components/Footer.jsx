import React from "react";
import { FaBlog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-gray-100 py-16 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Section */}
          <div className="md:col-span-4 flex flex-col items-start">
            <div className="flex items-center space-x-3 text-3xl font-bold text-[#9dd1c8] transition-colors mb-6">
              <FaBlog className="mr-2" /> 
              <span>Book</span>
            </div>
            <p className="text-gray-600 text-lg mb-6">
              Your one-stop destination for discovering and sharing great books.
            </p>
            <div className="flex space-x-5">
              {[
                { icon: <FaXTwitter size={20} />, color: "hover:text-gray-800" },
                { icon: <FaInstagram size={20} />, color: "hover:text-pink-600" },
                { icon: <FaSquareFacebook size={20} />, color: "hover:text-blue-600" },
                { icon: <FaYoutube size={20} />, color: "hover:text-red-600" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`block text-gray-500 transition-all duration-300 ${social.color}`}
                  aria-label={`${social.icon.type.displayName} link`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-4">
              {[
                { to: "/", text: "Home" },
                { to: "/about", text: "About" },
                { to: "/shop", text: "Shop" },
                { to: "/admin/dashboard", text: "Sell Your Book" },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="text-gray-600 hover:text-[#9dd1c8] transition-colors duration-300 py-2"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Stay Updated</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for the latest books and offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-3 w-full border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#9dd1c8] focus:border-transparent"
              />
              <button className="bg-[#9dd1c8] hover:bg-[#7eaaa2] text-white px-6 py-3 rounded-r-lg transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Book Haven. All rights reserved.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-[#9dd1c8] mx-4">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#9dd1c8] mx-4">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-[#9dd1c8] mx-4">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;