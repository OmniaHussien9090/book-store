import React, { useEffect, useState } from "react";
import { fetchAllBooks } from "../axios/api";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeBook, setActiveBook] = useState(null); // Track which book overlay is active on mobile
  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllBooks();

        // Sort books by rating (highest first) and take top 4
        const topRatedBooks = [...data]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);

        setBooks(topRatedBooks);
        setIsLoading(false);
      } catch (error) {
        console.log("error fetching data", error);
        setIsLoading(false);
      }
    };
    getBooks();
  }, []);

  // Toggle overlay for mobile
  const toggleOverlay = (bookId) => {
    if (activeBook === bookId) {
      setActiveBook(null);
    } else {
      setActiveBook(bookId);
    }
  };

 
  // Star rating component
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

        <span className="ml-1 text-gray-600 text-sm">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
     
      <h1 className="text-3xl font-bold text-center mb-8 uppercase text-[#9dd1c8]">
        our best books
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9dd1c8]"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map((book) => (
              <div
                key={book.bookTitle}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image with hover overlay */}
                <div
                  className="relative md:h-[450px] h-[500px] w-full overflow-hidden"
                  onClick={() => {
                    // On mobile, toggle overlay on click
                    if (window.innerWidth < 768) {
                      toggleOverlay(book._id);
                    }
                  }}
                >
                  <img
                    src={book.imageURL}
                    alt={book.bookTitle}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x400?text=No+Image";
                    }}
                  />

                  {/* Hover overlay - modified for mobile */}
                  <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-center px-4 
                      md:opacity-0 md:group-hover:opacity-100 
                      ${activeBook === book._id ? "opacity-100" : "opacity-0"} 
                      transition-opacity duration-300`}
                  >
                    <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">
                      {book.bookTitle}
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      by {book.authorName}
                    </p>
                    <div className="mb-3">
                      <StarRating rating={book.rating} />
                    </div>
                    <p className="text-gray-200 text-xs line-clamp-4 mb-4">
                      {book.bookDescription}
                    </p>
                    <Link
                      to={`/books/${book._id}`}
                      className="text-[#9dd1c8] hover:text-[#7dbeb5] text-sm font-medium mb-4 transition-colors text-center"
                    >
                      View Book
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Explore More button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate("/shop")}
              className="group  flex items-center justify-center gap-1 text-gray-500 hover:text-[#9dd1c8] px-6 py-3 rounded-lg transition-all duration-300 text-md font-medium cursor-pointer"
            >
              
              Explore More Books
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                <IoIosArrowRoundForward className="w-5 h-5 mt-1" />
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
