import React from "react";

// Import Swiper styles
import { Navigation, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faLeaf } from "@fortawesome/free-solid-svg-icons";

// Import Swiper styles
import "swiper/css";

export default function Banner() {
  return (
    <>
      <div className="relative p-0 ">
        {/* slider */}
        <Swiper
          spaceBetween={1}
          slidesPerView={1}
          autoplay={{
            delay: 100000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay]}
          className="slider flex justify-center text-center"
          loop={true}
        >
          {[1, 2, 3, 4, 5].map((index) => (
            <SwiperSlide key={index}>
              <div className="relative w-[100%] border-none h-[500px]"
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                display:"flex",
              }}
              >
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* end slider */}
      </div>
    </>
  );
}
