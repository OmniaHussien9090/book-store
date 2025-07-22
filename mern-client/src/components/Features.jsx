import React from "react";
import FeatureCard from "./Features/FeatureCard";
import { IoIosArrowRoundForward } from "react-icons/io";

import { Link } from "react-router-dom";

const Features = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-12 px-4 sm:px-6 lg:px-8 ">
      {/* the left side */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
        <FeatureCard />
      </div>
      {/* the right side  */}
      <div className="w-full md:w-1/2 space-y-6 group">
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
            Find Your Favorite
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#9dd1c8]">
            Book Here !
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Discover a world of knowledge and imagination
          </p>
        </div>
        <div className="text-gray-500 leading-relaxed text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, ut
          excepturi quia doloribus mollitia quibusdam a ipsa veritatis quaerat
          magni ea ipsum nobis ullam amet. Dolore doloribus nemo facilis
          suscipit!
        </div>
        <Link
          to="/shop"
          className="inline-flex px-6 py-3 bg-[#9dd1c8] text-white font-medium rounded-md hover:bg-[#7ebfb4] transition duration-300 items-center gap-2"
        >
          Explore Now
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 mt-1">
            <IoIosArrowRoundForward className="w-5 h-5" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Features;
