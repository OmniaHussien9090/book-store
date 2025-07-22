import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import book1 from '../../assets/banner-books/book1.jpg';
import book2 from '../../assets/banner-books/book2.jpg';
import book3 from '../../assets/banner-books/book3.jpg';
import book4 from '../../assets/banner-books/book4.jpg';
import book5 from '../../assets/banner-books/book5.png';
import book6 from '../../assets/banner-books/book6.jpg';


const BannerCard = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="w-[240px] h-[320px]"
      >
        <SwiperSlide className="flex items-center justify-center rounded-xl text-2xl font-bold ">
          <img src={book1} alt="" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center rounded-xl text-2xl font-bold">
          <img src={book2} alt="" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center rounded-xl text-2xl font-bold">
          <img src={book3} alt="" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center rounded-xl text-2xl font-bold ">
          <img src={book4} alt="" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center rounded-xl text-2xl font-bold">
          <img src={book5} alt="" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center rounded-xl text-2xl font-bold">
          <img src={book6} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerCard;