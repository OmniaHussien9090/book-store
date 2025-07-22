import { useState } from "react";
import axios from "axios";

const BookForm = () => {
  const [formData, setFormData] = useState({
    bookTitle: "",
    authorName: "",
    imageURL: "",
    category: "",
    bookDescription: "",
    bookPDFURL: "",
    price: "",
    rating: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/upload-book",
        formData
      );

      if (response.data.acknowledged) {
        setSuccess("Book successfully added to the database!");
        // Reset form
        setFormData({
          bookTitle: "",
          authorName: "",
          imageURL: "",
          category: "",
          bookDescription: "",
          bookPDFURL: "",
          price: "",
          rating: "",
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add book. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h1 class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">
        Sell your{" "}
        <mark class="px-2 text-white bg-[#9dd1c8] rounded-sm ">
          book
        </mark>{" "}
        with ease
      </h1>
      <p class="md:text-sm text-xs  text-gray-500   mb-7">
        Join our platform to reach thousands of readers. List your book, track
        sales, and grow your audience with simple tools designed for authors
        like you.
      </p>

    

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Book Title */}
          <div className="col-span-1">
            <label
              htmlFor="bookTitle"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="bookTitle"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter book title"
            />
          </div>

          {/* Author Name */}
          <div className="col-span-1">
            <label
              htmlFor="authorName"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Author Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter author name"
            />
          </div>

          {/* Image URL */}
          <div className="col-span-1">
            <label
              htmlFor="imageURL"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Image URL{" "}
              <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <input
              type="url"
              id="imageURL"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Category */}
          <div className="col-span-1">
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Category <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select a category</option>
              <option value="self help">Self Help</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="science">Science</option>
              <option value="biography">Biography</option>
              <option value="business">Business</option>
              <option value="crime">Crime</option>
              <option value="romance">Romance</option>
              <option value="children">Children</option>
              <option value="business">Business</option>
            </select>
          </div>

          {/* Price */}
          <div className="col-span-1">
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full pl-8 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="col-span-1">
            <label
              htmlFor="rating"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Rating <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="0-5"
            />
          </div>
        </div>

        {/* Book PDF URL */}
        <div>
          <label
            htmlFor="bookPDFURL"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Book PDF URL{" "}
            <span className="text-gray-500 text-xs">(optional)</span>
          </label>
          <input
            type="url"
            id="bookPDFURL"
            name="bookPDFURL"
            value={formData.bookPDFURL}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="https://example.com/book.pdf"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="bookDescription"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Description{" "}
            <span className="text-gray-500 text-xs">(optional)</span>
          </label>
          <textarea
            id="bookDescription"
            name="bookDescription"
            value={formData.bookDescription}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Enter book description..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg bg-[#9dd1c8]  text-white font-medium transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Submit Book"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
