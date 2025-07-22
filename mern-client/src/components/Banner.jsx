import React from "react";
import { FiSearch } from "react-icons/fi";
import BannerCard from "./BannerCard/BannerCard";
import BlurText from "./Animation/BlurText";
import { motion } from "motion/react";

const Banner = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  return (
    <div className="px-4 lg:px-24 flex items-center">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-8 md:gap-12 py-20 md:py-40">
        {/* the left side */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-10">
          <div className="text-center md:text-left">
            <BlurText
              text="Buy and sell your book"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-4xl capitalize font-semibold mb-8"
            />

            <h3 className="font-second-heading font-bold text-4xl md:text-5xl text-[#9dd1c8] capitalize">
              For the best prices
            </h3>
            <p className="text-gray-500 capitalize pt-3 text-sm md:text-base">
              Find and read more books you will love, and keep track of the
              books you want to read. Be part of the world's largest community
              of book lovers
            </p>
          </div>

          <form className="flex items-center w-full">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="simple-search"
                className="bg-white border-2 border-[#9dd1c8] text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 focus:outline-0"
                placeholder="Search..."
                required
              />
            </div>
            <button
              type="submit"
              className="p-3 ms-2 text-sm font-medium text-white bg-[#9dd1c8] rounded-lg"
            >
              <FiSearch className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log("hover started!")}
        >
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <BannerCard />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
