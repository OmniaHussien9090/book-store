import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import books images
import book1 from "../../assets/banner-books/book1.jpg";
import book2 from "../../assets/banner-books/book2.jpg";
import book3 from "../../assets/banner-books/book3.jpg";
import book4 from "../../assets/banner-books/book4.jpg";
import book5 from "../../assets/banner-books/book5.png";
import book6 from "../../assets/banner-books/book6.jpg";
import book8 from "../../assets/banner-books/book8.jpg";
import book9 from "../../assets/banner-books/book9.jpg";
import book10 from "../../assets/banner-books/book10.jpg";
import book11 from "../../assets/banner-books/book11.jpg";
import book12 from "../../assets/banner-books/book12.jpg";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function BookSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="max-w-4xl mx-auto p-4 shadow-lg  ">
      {/* Main Swiper */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#9dd1c8",
          "--swiper-pagination-color": "#9dd1c8",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mb-4  overflow-hidden "
      >
        {[book1,book2,book3,book4,book5,book6, book8, book9, book10, book11, book12].map((book, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center justify-center md:h-96 h-40 ">
              <img 
                src={book} 
                alt={`Book ${index + 1}`}
                className="object-contain h-full w-full rounded-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="rounded-lg"
        
      >
        {[book1,book2,book3,book4,book5,book6, book8, book9, book10, book11, book12].map((book, index) => (
          <SwiperSlide key={index}>
            <div className="md:h-[220px] h-20 rounded-md  overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
              <img 
                src={book} 
                alt={`Thumbnail ${index + 1}`}
                className="object-cover h-full w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}