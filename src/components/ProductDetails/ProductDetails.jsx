import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById } from "../../services/productService";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import { useCart } from "../../hooks/useCart";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const { addToCartHandler } = useCart(CartContext);
  /*   const handleAddToCart = async (id) => {
    try {
      setLoading(true);
      await addProductToCart(id);
      toast.success("Product added to cart successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }; */

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await getProductById(productId);
        setProduct(data);
        // أول صورة تبقى هي اللي شغالة
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0]);
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };
    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return (
      <div className="container my-10">
        <p>Loading product details...</p>
      </div>
    );
  }

  // 🔢 حساب النجوم
  const fullStars = Math.floor(product.ratingsAverage);
  const hasHalfStar = product.ratingsAverage % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-center">
      {/* الصور */}
      <div className="flex flex-col-reverse gap-4 items-center">
        {/* Thumbnails */}
        <div className="flex flex-row flex-wrap gap-3">
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              className={`w-24 h-24 object-cover rounded-lg cursor-pointer border ${
                activeImage === img ? "border-black" : "border-gray-200"
              }`}
              onClick={() => setActiveImage(img)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="w-full p-2 shadow-md rounded-lg">
          <img
            src={activeImage}
            alt="Main product"
            className="w-full h-[500px] object-contain"
          />
        </div>
      </div>

      {/* التفاصيل */}
      <div className="details">
        <h2 className="text-4xl uppercase font-extrabold my-2">
          {product.title}
        </h2>

        {/* التقييم */}
        <div className="flex items-center text-yellow-400 gap-1 my-2 text-xl">
          {Array.from({ length: fullStars }).map((_, i) => (
            <FaStar key={`full-${i}`} />
          ))}
          {hasHalfStar && <FaStarHalfAlt />}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <FaRegStar key={`empty-${i}`} />
          ))}
          <span className="ml-3 text-gray-600">
            {product.ratingsAverage.toFixed(1)} / 5
          </span>
        </div>

        {/* السعر */}
        <div className="flex items-center my-4 gap-5">
          {product.priceAfterDiscount ? (
            <>
              <div className="text-3xl font-bold flex gap-2">
                <span>{product.priceAfterDiscount} EGP</span>
                <span className="line-through text-gray-500 mx-2">
                  {product.price} EGP
                </span>
              </div>
              <span className="bg-red-100 p-2 text-red-500 font-bold rounded-full">
                -
                {Math.round(
                  ((product.price - product.priceAfterDiscount) /
                    product.price) *
                    100
                )}
                %
              </span>
            </>
          ) : (
            <span className="text-3xl font-bold">{product.price} EGP</span>
          )}
        </div>

        <p className="border-b-1 py-3 border-gray-200">{product.description}</p>

        {/* الألوان */}
        {product.colors && product.colors.length > 0 && (
          <div className="my-4 border-b-1 py-3 border-gray-200">
            <h4 className="font-sNemibold mb-2">Available Colors:</h4>
            <div className="flex gap-2">
              {product.colors.map((color, index) => (
                <span
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: color }}
                  title={color}
                ></span>
              ))}
            </div>
          </div>
        )}

        <button
          className="btn-primary mt-5 w-full"
          onClick={() => addToCartHandler(product._id)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
