import {
  A11y,
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { getCategories } from "../../services/catergoriesService";
import { useQuery } from "@tanstack/react-query";
// import style from "./CategoriesSwiper.module.css";
export default function CategoriesSwiper() {
  let { data, isLoading } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
    select: (data) => data.data.data,
  });

  return (
    <Swiper
      className="!py-10"
      // install Swiper modules
      modules={[Navigation, Pagination, A11y, Autoplay, EffectFade]}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      keyboard={{ enabled: true }}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        320: { slidesPerView: 2, spaceBetween: 20 },
        640: { slidesPerView: 3, spaceBetween: 30 },
        1024: { slidesPerView: 4, spaceBetween: 40 },
        1280: { slidesPerView: 5, spaceBetween: 50 },
      }}
    >
      {isLoading ? (
        <>
          {Array.from({ length: 7 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="relative flex w-full flex-col rounded-xl bg-gradient-to-br  bg-clip-border text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
                  <div className="absolute inset-0 bg-gradient-to-r opacity-90" />
                  <div className="absolute inset-0 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                </div>
                <div className="p-6 pt-0">
                  <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </>
      ) : (
        <>
          {data?.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="relative flex w-full flex-col rounded-xl bg-gradient-to-br  bg-clip-border text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
                  <div className="absolute inset-0 bg-gradient-to-r opacity-90" />
                  <div className="absolute inset-0 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={category.image}
                      alt={category.slug}
                      className="object-center pos w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-900 antialiased group-hover:text-secondary-2 transition-colors duration-300">
                    {category.name}
                  </h5>
                </div>
                <div className="p-6 pt-0">
                  <button className="relative  w-full inline-flex items-center justify-center px-6 py-3 font-bold  rounded-lg bg-gradient-to-r shadow-lg  transition-all duration-300 hover:-translate-y-0.5">
                    <span className="relative flex items-center gap-2">
                      Discover More
                      <svg
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                      >
                        <path
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                          strokeWidth={2}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </>
      )}
    </Swiper>
  );
}
