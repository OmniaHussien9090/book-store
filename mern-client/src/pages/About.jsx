import React from "react";
import photo1 from "../assets/aboutPhoto.jpg";
import photo2 from "../assets/aboutPhoto2.jpg";
import photo3 from "../assets/aboutPhoto3.jpg";
import photo4 from "../assets/favoritebook.jpg";
import { Link } from "react-router-dom";
import BlurText from "../components/Animation/BlurText";

const About = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  return (
    <div>
      <section class="py-24 relative xl:mr-0 lg:mr-5 mr-0">
        <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div class="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
            <div class="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div class="w-full flex-col justify-center items-start gap-8 flex">
                <div class="flex-col justify-start lg:items-start items-center gap-4 flex">
                  <h6 class="text-gray-400 text-base font-normal leading-relaxed">
                    About Us
                  </h6>
                  <div class="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                    <BlurText
                      text="Our Journey Through the World of Books"
                      delay={150}
                      animateBy="words"
                      direction="top"
                      onAnimationComplete={handleAnimationComplete}
                      className="text-[#9dd1c8] text-4xl font-bold font-manrope leading-normal lg:text-start text-center"
                    />
                    <p class="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                      From passionate readers to dedicated curators, our story
                      is built around the love for literature. We've created a
                      space that connects readers with books that inspire,
                      inform, and entertain — one page at a time.
                    </p>
                  </div>
                </div>
                <div class="w-full flex-col justify-center items-start gap-6 flex">
                  <div class="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div class="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">
                        10+ Years
                      </h4>
                      <p class="text-gray-500 text-base font-normal leading-relaxed">
                        Sharing the Joy of Reading with the World
                      </p>
                    </div>
                    <div class="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">
                        5K+ Titles
                      </h4>
                      <p class="text-gray-500 text-base font-normal leading-relaxed">
                        Curated Collection Across Every Genre
                      </p>
                    </div>
                  </div>
                  <div class="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div class="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">
                        50+ Authors
                      </h4>
                      <p class="text-gray-500 text-base font-normal leading-relaxed">
                        Collaborating with Local and Global Writers
                      </p>
                    </div>
                    <div class="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">
                        98% Happy Readers
                      </h4>
                      <p class="text-gray-500 text-base font-normal leading-relaxed">
                        Driven by Community Trust and Feedback
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button class="sm:w-fit w-full group px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
                <Link to="/shop">
                  <span class="px-1.5 text-[#9dd1c8] text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                    Read More
                  </span>
                </Link>

                <svg
                  class="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996"
                    stroke="#9dd1c8"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div class="w-full lg:justify-start justify-center items-start flex">
              <div class=" sm:w-[564px] w-full sm:h-[646px] h-screen sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
                <img
                  class="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl shadow-xl object-cover"
                  src={photo4}
                  alt="About Our Bookstore"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
