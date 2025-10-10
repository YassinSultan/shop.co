import React from "react";
import heroImage from "../../assets/images/hero.png";
import { getCategories } from "../../services/catergoriesService";
import { useQuery } from "@tanstack/react-query";

export default function HeroSection() {
  let { data, isLoading } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
    select: (data) => data.data.data,
  });
  return (
    <section className="relative h-[calc(100vh-65px)] md:h-[calc(100vh-90px)] flex items-center bg-gray-200 w-full overflow-hidden">
      {/* النص */}
      <div className="relative container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center h-full">
        <div className="flex-1 flex flex-col items-center justify-center text-center md:text-left md:items-start z-6">
          <h2 className="!font-extrabold text-3xl md:text-5xl lg:text-7xl mb-5 font-heading">
            You Can Find <br /> EveryThings You Need
          </h2>
          <p className="text-gray-600 text-base lg:text-lg mb-8 max-w-md">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="btn-primary w-fit">Shop Now</button>
        </div>
        <img
          src={heroImage}
          alt=""
          className="hidden md:block absolute right-0 bottom-0"
        />
      </div>

      {/* logos banner */}
      <div className="absolute bottom-0 w-full bg-primary-1 py-4 shadow-md h-fit">
        <div className="container mx-auto px-6 lg:px-20 flex justify-around items-center gap-x-5 flex-wrap h-full">
          {isLoading ? (
            <>
              {Array.from({ length: 5 })?.map((_, index) => (
                <h2
                  key={index}
                  className="text-primary font-bold uppercase w-fit"
                >
                  Loading ...
                </h2>
              ))}
            </>
          ) : (
            <>
              {data?.map((category) => (
                <h2
                  key={category._id}
                  className="text-primary font-bold uppercase w-fit"
                >
                  {category.name}
                </h2>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
