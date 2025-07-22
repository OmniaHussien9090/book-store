import React, { useEffect, useState } from "react";
import { fetchAllBooks } from "../axios/api";
import { useNavigate } from "react-router-dom";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { FiFilter, FiX } from "react-icons/fi";
import { useShop } from "../context/ShopContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlurText from "../components/Animation/BlurText";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const [activeBook, setActiveBook] = useState(null);
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist } = useShop();
  // Filter states
  const [ratingFilter, setRatingFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRangeFilter, setPriceRangeFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueAuthors, setUniqueAuthors] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Apply filters
  useEffect(() => {
    let result = [...books];

    if (searchQuery) {
      result = result.filter(
        (book) =>
          book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (book.authorName &&
            book.authorName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (book.category &&
            book.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (ratingFilter) {
      result = result.filter((book) => book.rating >= ratingFilter);
    }

    if (categoryFilter) {
      result = result.filter(
        (book) =>
          book.category &&
          book.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    if (priceRangeFilter) {
      const [min, max] = priceRangeFilter.split("-").map(Number);
      result = result.filter(
        (book) => book.price >= min && (max ? book.price <= max : true)
      );
    }

    if (authorFilter) {
      result = result.filter(
        (book) =>
          book.authorName &&
          book.authorName.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    setFilteredBooks(result);
    setCurrentPage(1);
  }, [
    searchQuery,
    ratingFilter,
    categoryFilter,
    priceRangeFilter,
    authorFilter,
    books,
  ]);
  useEffect(() => {
    const getBooks = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllBooks();
        setBooks(data);
        setFilteredBooks(data);

        // Extract unique categories
        const categories = new Set();
        const authors = new Set();

        data.forEach((book) => {
          if (book.category) {
            book.category.split(",").forEach((cat) => {
              categories.add(cat.trim());
            });
          }
          if (book.authorName) {
            authors.add(book.authorName);
          }
        });

        setUniqueCategories(Array.from(categories).sort());
        setUniqueAuthors(Array.from(authors).sort());

        setIsLoading(false);
      } catch (error) {
        console.log("error fetching data", error);
        setIsLoading(false);
      }
    };
    getBooks();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...books];

    if (ratingFilter) {
      result = result.filter((book) => book.rating >= ratingFilter);
    }

    if (categoryFilter) {
      result = result.filter(
        (book) =>
          book.category &&
          book.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    if (priceRangeFilter) {
      const [min, max] = priceRangeFilter.split("-").map(Number);
      result = result.filter(
        (book) => book.price >= min && (max ? book.price <= max : true)
      );
    }

    if (authorFilter) {
      result = result.filter(
        (book) =>
          book.authorName &&
          book.authorName.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    setFilteredBooks(result);
    setCurrentPage(1);
  }, [ratingFilter, categoryFilter, priceRangeFilter, authorFilter, books]);

  // Toast notification
  const handleAddToCart = async (book) => {
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
          background: "#ffff",
          color: "#2d3748",
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
  };

  const handleAddToWishlist = async (book) => {
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
          background: "#ffff",
          color: "#2d3748",
        },
      });
    } else {
      toast.error(result.message || "Failed to add to wishlist", {
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

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const clearFilters = () => {
    setRatingFilter(null);
    setCategoryFilter("");
    setPriceRangeFilter("");
    setAuthorFilter("");
    setShowMobileFilters(false);
  };

  // Star Rating Component
  const StarRating = ({ rating, size = 4 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className={`w-${size} h-${size} text-yellow-400`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        {hasHalfStar && (
          <svg
            key="half"
            className={`w-${size} h-${size} text-yellow-400`}
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
            className={`w-${size} h-${size} text-gray-200`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Rating Filter Dropdown
  const RatingFilterDropdown = () => {
    const ratingOptions = [
      { value: 5, label: "★★★★★" },
      { value: 4, label: "★★★★☆" },
      { value: 3, label: "★★★☆☆" },
      { value: 2, label: "★★☆☆☆" },
      { value: 1, label: "★☆☆☆☆" },
    ];

    return (
      <div className="min-w-[200px] ">
        <label className="block text-sm font-medium text-gray-700  mb-1">
          Ratings6
        </label>
        <div className="relative">
          <select
            value={ratingFilter || ""}
            onChange={(e) =>
              setRatingFilter(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md  appearance-none bg-white focus:outline-0"
          >
            <option value="">All Ratings</option>
            {ratingOptions.map((option) => (
              <option
                className="text-yellow-500 "
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {ratingFilter ? (
              <div className="flex items-center ">
                <StarRating rating={ratingFilter} size={3} />
              </div>
            ) : (
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  // Filters Section Component
  const FiltersSection = () => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <RatingFilterDropdown />

        <div className="min-w-[200px] ">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <select
            value={priceRangeFilter}
            onChange={(e) => setPriceRangeFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Prices</option>
            <option value="0-10">$0 - $10</option>
            <option value="10-20">$10 - $20</option>
            <option value="20-50">$20 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-">$100+</option>
          </select>
        </div>

        <div className="min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <select
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Authors</option>
            {uniqueAuthors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 underline text-gray-500 rounded-md text-sm transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
  // Toggle overlay for mobile
  const toggleOverlay = (bookId) => {
    if (activeBook === bookId) {
      setActiveBook(null);
    } else {
      setActiveBook(bookId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center my-15">
        <BlurText
          text="Discover Your Books"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-4xl md:text-5xl font-bold text-[#9dd1c8] pb-3"
        />

        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          Browse our curated collection of books across all genres.
        </p>
        <div className="mt-6 flex justify-center">
          <div className="w-24 h-1 bg-[#9dd1c8] rounded-full"></div>
        </div>
      </div>

      {/* Mobile Filters Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-[#9dd1c8] text-white rounded-md"
        >
          {showMobileFilters ? <FiX size={18} /> : <FiFilter size={18} />}
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <FiltersSection />
      </div>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <div className="lg:hidden">
          <FiltersSection />
        </div>
      )}

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredBooks.length}{" "}
        {filteredBooks.length === 1 ? "book" : "books"}
        {filteredBooks.length !== books.length && " (filtered)"}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9dd1c8]"></div>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No Books Found !</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-[#9dd1c8] text-white rounded-md hover:bg-[#7dbeb5] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  onClick={() => {
                    // On mobile, toggle overlay on click
                    if (window.innerWidth < 768) {
                      toggleOverlay(book._id);
                    }
                  }}
                  className="relative md:h-[450px] h-[500px] w-full overflow-hidden"
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
                    <div className="flex gap-1 items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(book);
                        }}
                        className="bg-[#9dd1c8] hover:bg-[#7dbeb5] text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1 mx-auto transition-colors mt-8"
                      >
                        <PiShoppingCartSimpleFill className="w-6 h-6 cursor-pointer" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToWishlist(book);
                        }}
                        className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1 mx-auto transition-colors mt-8 cursor-pointer ${
                          isInWishlist(book._id) ? "text-pink-500" : "bg-white"
                        }`}
                      >
                        {isInWishlist(book._id) ? (
                          <IoIosHeart className="w-6 h-6" />
                        ) : (
                          <IoIosHeartEmpty className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <GrPrevious />
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 rounded-md border ${
                      currentPage === i + 1
                        ? "bg-[#9dd1c8] border-[#9dd1c8] text-white"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    } transition-colors`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <GrNext />
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;
