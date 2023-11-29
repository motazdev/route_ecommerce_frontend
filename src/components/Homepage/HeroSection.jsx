import React from "react";
import { HeaderImage } from "./HeaderImage.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, Navigation } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useData } from "../../contexts/DataProvider.js";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const { categories } = useData();

  return (
    <div className="HeroSection relative h-5/6 header-img-shape ">
      <div className="max-w-7xl mx-auto ">
        <div className="hero-header relative items-stretch flex justify-between px-5 md:px-0">
          <div className="container pl-0 sm:pl-6 lg:">
            <div className="py-10 layer flex flex-col top-0 left-0 h-full">
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 1 }}
                transition={{
                  duration: 0.5,
                }}
              >
                <div className="md:mb-0 lg:w-5/6 ">
                  <h1 className="text-2xl font-bold text-gray-800 md:text-4xl lg:text-5xl !leading-snug	">
                    Buy now and benefit up to{" "}
                    <span className="text-primary dark:text-indigo-600">
                      30% off
                    </span>
                  </h1>
                </div>
              </motion.div>
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8,
                }}
              >
                <div className="hero-btn mt-4 md:mt-10">
                  <Link
                    to="/offers"
                    className="inline-flex overflow-hidden shadow-lg group relative text-slate-900 bg-gray-300 rounded "
                  >
                    <span className="px-3.5 py-2 text-white bg-indigo-600 group-hover:bg-indigo-800 transition-all duration-200 flex items-center justify-center">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeWidth="currentColor"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        ></path>
                      </svg>
                    </span>

                    <span className="pl-4 pr-5 py-2.5">Check Offers</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
          <HeaderImage />
        </div>
      </div>

      <motion.div
        className=" rounded-lg md:absolute w-4/5 md:w-2/4 py-6 left-0 right-0 mx-auto top-[22rem] my-0 shadow-[0_2px_10px] shadow-blackA7 bg-white"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 20,
            stiffness: 500,
            restDelta: 0.0001,
          },
        }}
      >
        <Swiper
          className="h-full flex flex-row justify-start"
          spaceBetween={1}
          centeredSlides={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          slidesPerView={3}
          modules={[Autoplay, Mousewheel, Pagination, Navigation]}
          mousewheel={true}
        >
          <div>
            {categories && categories?.length ? (
              categories.map((categ) => (
                <SwiperSlide key={categ._id} className="w-[300px]">
                  <Link
                    className="flex flex-col justify-center items-center"
                    to={categ.slug}
                  >
                    <img
                      className="rounded-full h-[60px] w-[60px] md:h-[100px] md:w-[100px]"
                      src={categ?.image.url}
                      alt=""
                    />
                    <span>{categ.name}</span>
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <p>No Categories at this moment...</p>
            )}
          </div>
        </Swiper>
      </motion.div>
    </div>
  );
};
