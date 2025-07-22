import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById } from "../axios/api";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { useShop } from "../context/ShopContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useShop();

  const truncateDescription = (text, maxLength = 200) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBookById(id);
        setBook(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details");
        setIsLoading(false);
      }
    };
    getBookDetails();
  }, [id]);

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        {hasHalfStar && (
          <svg
            key="half"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="half-star">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-star)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-5 h-5 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        <span className="ml-2 text-gray-600">({rating})</span>
      </div>
    );
  };

  const handleAddToCart = async () => {
    if (!book) return;

    try {
      const result = await addToCart(book);
      if (result.success) {
        toast.success(`${book.bookTitle} added to cart!`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            background: "#f0f7f6",
            color: "#2d3748",
            borderLeft: "4px solid #9dd1c8",
          },
        });
      } else {
        toast.error(result.message || "Failed to add to cart", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      toast.error("Failed to add to cart", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleWishlistAction = async () => {
    if (!book) return;

    try {
      if (isInWishlist(book._id)) {
        const result = await removeFromWishlist(book._id);
        if (result.success) {
          toast.info(`${book.bookTitle} removed from wishlist!`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
              background: "#f0f7f6",
              color: "#2d3748",
              borderLeft: "4px solid #9dd1c8",
            },
          });
        }
      } else {
        const result = await addToWishlist(book);
        if (result.success) {
          toast.info(`${book.bookTitle} added to wishlist!`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
              background: "#f0f7f6",
              color: "#2d3748",
              borderLeft: "4px solid #9dd1c8",
            },
          });
        }
      }
    } catch (err) {
      toast.error("Failed to update wishlist", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9dd1c8]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-500 my-20">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-[#9dd1c8] hover:bg-[#7dbeb5] text-white px-4 py-2 rounded-md flex items-center gap-1 mx-auto transition-colors"
        >
          <IoIosArrowRoundBack size={20} />
          Back to Shop
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-4">Book not found</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-[#9dd1c8] hover:bg-[#7dbeb5] text-white px-4 py-2 rounded-md flex items-center gap-1 mx-auto transition-colors"
        >
          <IoIosArrowRoundBack size={20} />
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-18">
      <ToastContainer />

      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#9dd1c8] hover:text-[#7dbeb5] mb-6 transition-colors"
      >
        <IoIosArrowRoundBack size={24} />
        <span className="ml-1">Back to Shop</span>
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Book Cover */}
          <div className="md:w-1/3 lg:w-1/2 p-6 flex justify-center">
            <div className="relative w-full md:h-auto">
              <img
                src={book.imageURL}
                alt={book.bookTitle}
                className="w-full h-full object-contain max-h-[500px]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/300x400?text=No+Image";
                }}
              />
            </div>
          </div>

          {/* Book Details */}
          <div className="md:w-2/3 lg:w-3/4 p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {book.bookTitle}
            </h1>
            <p className="text-lg text-gray-600 mb-4">by {book.authorName}</p>

            <div className="flex items-center mb-6">
              <StarRating rating={book.rating} />
              <span className="ml-4 text-xs text-gray-500">
                {book.reviewCount} reviews
              </span>
            </div>

            <div className="mb-6">
              <span className="text-2xl font-bold text-[#9dd1c8]">
                ${book.price}
              </span>
              {book.originalPrice && (
                <span className="ml-2 text-gray-400 line-through">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <button
                onClick={handleAddToCart}
                className="bg-[#9dd1c8] hover:bg-[#7dbeb5] text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
              >
                <PiShoppingCartSimpleFill size={20} />
                Add to Cart
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleWishlistAction(book);
                }}
                aria-label={
                  isInWishlist(book._id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 hover:text-pink-500 hover:bg-pink-50 ${
                  isInWishlist(book._id) ? "text-pink-500" : "text-gray-700"
                }`}
              >
                {isInWishlist(book._id) ? (
                  <IoIosHeart className="w-6 h-6" />
                ) : (
                  <IoIosHeartEmpty className="w-6 h-6" />
                )}
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Description
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {showFullDescription
                  ? book.bookDescription
                  : truncateDescription(book.bookDescription)}
              </p>
              {book.bookDescription && book.bookDescription.length > 200 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-[#9dd1c8] hover:text-[#7dbeb5] mt-2 font-medium transition-colors"
                >
                  {showFullDescription ? "Show less" : "Read more"}
                </button>
              )}
            </div>

            <div className="flex flex-col gap-6 mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-gray-800 mb-1">Category: </h3>
                {book.category ? (
                  book.category.split(",").map((cat, index) => (
                    <p
                      key={index}
                      className="text-gray-600 capitalize px-3 py-1.5 rounded-full shadow-md bg-gray-50"
                    >
                      {cat.trim()}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-600">N/A</p>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Book URL:</h3>
                <Link
                  to={book.bookPDFURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:underline cursor-pointer"
                >
                  {book.bookPDFURL || "N/A"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
