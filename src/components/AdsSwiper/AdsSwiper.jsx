import {
  A11y,
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import style from "./AdsSwiper.module.css";
export default function AdsSwiper() {
  // array of ads images
  const ads = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
  ];
  return (
    <Swiper
      className="!py-10"
      // install Swiper modules
      modules={[A11y, Autoplay, EffectFade]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      keyboard={{ enabled: true }}
      slidesPerView={1}
    >
      {ads.map((ad, index) => (
        <SwiperSlide key={index} className="!h-90">
          <img
            src={ad}
            alt={`Ad ${index + 1}`}
            className="rounded-lg h-full w-full object-cover object-center"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
