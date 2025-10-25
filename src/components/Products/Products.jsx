import React from "react";
import {
  FaHeart,
  FaRegStar,
  FaSpinner,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService";
import { useCart } from "../../hooks/useCart";
import ProductSkeleton from "../ProductSkelton/ProductSkelton";
import { useWishlist } from "../../hooks/useWishlist";
import Loading from "../Loading/Loading";
// import style from "./Products.module.css";
export default function Products({ queryName = "products", ...filters }) {
  const { addToCart, addToCartLoading } = useCart();
  const { addToWishlist, addToWishlistLoading } = useWishlist();
  let { data, isPending } = useQuery({
    queryKey: [`${queryName}`],
    queryFn: () => getProducts({ ...filters }),
    gcTime: 5 * 60 * 1000, // 5 minutes
    // staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => data.data,
  });

  // Loading
  if (isPending && !data) {
    // skelton loading
    return <ProductSkeleton limit={filters.limit} />;
  }
  console.log(data.data);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {data.data.map((product) => {
          // calculate stars
          const fullStars = Math.floor(product.ratingsAverage);
          const hasHalfStar = product.ratingsAverage % 1 !== 0;
          const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
          return (
            // card
            <div
              key={product._id}
              className="relative w-full max-w-sm text-primary-1 bg-gray-100 rounded-lg hover:shadow-lg flex flex-col overflow-hidden"
            >
              {/* card content */}
              <Link
                to={`/products/${product._id}`}
                className="flex-1 flex flex-col"
              >
                {/* image */}
                <img src={product.imageCover} alt={product.title} />
                <div className="px-5 py-2.5">
                  {/* title */}
                  <div>
                    <h5 className="text-sm font-semibold text-secondary-2">
                      {product.category.name ?? "No Category"}
                    </h5>
                    <h6 className="text-xl font-bold">
                      {/* least 4 words and add ...*/}
                      {/* if words > 12 add ...  */}
                      {product.title.split(" ").length > 4
                        ? product.title.split(" ").slice(0, 4).join(" ") +
                          " ..."
                        : product.title}
                    </h6>
                  </div>
                  {/* rating  */}
                  <div className="flex items-center my-2.5">
                    <div className="flex items-center text-yellow-400 gap-1">
                      {/* full stars */}
                      {Array.from({ length: fullStars }).map((_, i) => (
                        <FaStar key={`full-${i}`} />
                      ))}

                      {/* half star */}
                      {hasHalfStar && <FaStarHalfAlt />}

                      {/* empty stars */}
                      {Array.from({ length: emptyStars }).map((_, i) => (
                        <FaRegStar key={`empty-${i}`} />
                      ))}
                    </div>
                    {/* rating number */}
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">
                      {product.ratingsAverage.toFixed(1)}
                    </span>
                  </div>
                  {/* price and action button */}
                  <span className="text-3xl font-bold ">
                    {product.price} EGP
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-2 px-5 pb-5">
                <button
                  onClick={() =>
                    addToCart({
                      productId: product._id,
                    })
                  }
                  disabled={addToCartLoading(product._id)}
                  className="btn-primary flex-1"
                >
                  {addToCartLoading(product._id) ? "Adding..." : "Add to cart"}
                </button>
                <button
                  onClick={() =>
                    addToWishlist({
                      productId: product._id,
                    })
                  }
                  disabled={addToWishlistLoading(product._id)}
                  className="btn-primary h-full "
                >
                  {addToWishlistLoading(product._id) ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaHeart />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
