import React, { useState } from "react";
import "swiper/css";

export default function ProductGallery({ images = [] }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3 w-24">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumb-${index}`}
            className={`w-full h-24 object-cover rounded-lg cursor-pointer border ${
              activeImage === img ? "border-black" : "border-gray-200"
            }`}
            onClick={() => setActiveImage(img)}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <img
          src={activeImage}
          alt="Main product"
          className="w-full h-[500px] object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}
