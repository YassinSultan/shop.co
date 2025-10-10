import React from "react";
import CategoriesSwiper from "../CategoriesSwiper/CategoriesSwiper";
import AdsSwiper from "../AdsSwiper/AdsSwiper";
import Products from "../Products/Products";
import HeroSection from "../HeroSection/HeroSection";
// import style from "./Home.module.css";
export default function Home() {
  return (
    <>
      <div className="w-full">
        <HeroSection />
        {/*         <section className="container">
          <AdsSwiper />
        </section> */}
        <section className="container border-b-2 border-gray-100 !py-20 ">
          <h2 className="!font-title !text-5xl uppercase !font-extrabold text-center mb-10">
            categories
          </h2>
          <CategoriesSwiper />
        </section>
        <section className="container border-b-2 border-gray-100 !py-20 ">
          <h2 className="!font-title !text-5xl uppercase !font-extrabold text-center mb-10">
            Top Rated
          </h2>
          <Products queryName="top-rated" sort="-ratingsAverage" limit="4" />
          <div className="flex justify-center mt-10">
            <button className="btn-primary">Show More</button>
          </div>
        </section>
        <section className="container border-b-2 border-gray-100 !py-20 ">
          <h2 className="!font-title !text-5xl uppercase !font-extrabold text-center mb-10">
            Top Selling
          </h2>
          <Products queryName="top-selling" sort="sold" limit="4" />
          <div className="flex justify-center mt-10">
            <button className="btn-primary">Show More</button>
          </div>
        </section>
      </div>
    </>
  );
}
