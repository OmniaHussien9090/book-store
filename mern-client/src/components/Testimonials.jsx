import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; // Added Autoplay
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Added autoplay CSS
import { FaBlog } from "react-icons/fa";

const Testimonial = () => {
const testimonials = [
  {
    id: 1,
    name: "Jane D.",
    role: "Avid Reader",
    avatar: "https://pagedone.io/asset/uploads/1696229969.png",
    rating: 5,
    content:
      "This website has completely changed the way I discover books. The recommendations are spot-on and the interface is super easy to navigate.",
  },
  {
    id: 2,
    name: "Harsh P.",
    role: "Book Blogger",
    avatar: "https://pagedone.io/asset/uploads/1696229994.png",
    rating: 5,
    content:
      "I love how organized everything is—from categories to detailed reviews. It's now my go-to place to find new reads!",
  },
  {
    id: 3,
    name: "Alex M.",
    role: "Literature Teacher",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    content:
      "Great selection of classic and modern titles. I especially appreciate the curated reading lists for different genres.",
  },
  {
    id: 4,
    name: "Sarah K.",
    role: "Student",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    content:
      "Thanks to this site, I’ve found amazing books that helped me with my studies and personal growth. Highly recommended!",
  },
];



  const StarIcon = () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:justify-between">
          {/* Heading Section */}
          <div className="w-full lg:w-2/5 text-center lg:text-left">
            <span className="text-sm text-gray-500 font-medium mb-4 block">
              Feedbacks
            </span>
            <h2 className="capitilize text-4xl font-bold text-gray-900 dark:text-white leading-[3.25rem] mb-8">
              What our Customers says about!
              <div className="inline-block ms-3">
                <span className="flex items-center  space-x-3  text-3xl font-bold text-[#9dd1c8] rtl:space-x-reverse hover:text-[#7dbeb5] transition-colors">
                  <FaBlog className="mr-1 " /> Book
                </span>
              </div>
            </h2>
          </div>

          {/* Testimonial Slider */}
          <div className="w-full lg:w-3/5">
            <Swiper
              modules={[Navigation, Autoplay]} // Added Autoplay module
              spaceBetween={28}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              autoplay={{
                delay: 3000, // 3 seconds delay between slides
                disableOnInteraction: false, // Continue autoplay after user interaction
                pauseOnMouseEnter: true, // Pause on hover
              }}
              loop={true} // Enable infinite loop
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
              }}
              className="mySwiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="group bg-white dark:bg-gray-800 border-2 cursor-pointer border-solid border-gray-300 dark:border-gray-700 rounded-2xl p-6 transition-all duration-500 hover:border-[#9dd1c8]">
                    <div className="flex items-center gap-5 mb-5 sm:mb-9">
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <div>
                        <h5 className="text-gray-900 dark:text-white font-medium">
                          {testimonial.name}
                        </h5>
                        <span className="text-sm text-gray-500">
                          {testimonial.role}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center mb-5 sm:mb-9 gap-2 text-amber-500">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 transition-all duration-500 min-h-24 group-hover:text-gray-800 dark:group-hover:text-gray-300">
                      {testimonial.content}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;