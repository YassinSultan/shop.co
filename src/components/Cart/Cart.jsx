import React from "react";
import { useCart } from "../../hooks/useCart";
import { BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router";
import Loading from "../Loading/Loading";

export default function Cart() {
  const { cart, isLoading, updateCount, removeFromCart } = useCart();
  const navigate = useNavigate();
  if (isLoading) return <Loading />;
  console.log(cart);
  return (
    <>
      {cart ? (
        <>
          <div className="container mx-auto py-10">
            <h2 className="text-4xl font-extrabold mb-10 font-heading">
              Your Cart
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {cart?.data?.products?.map((product) => (
                  <div
                    key={product._id}
                    className="relative flex gap-4 p-4 bg-white shadow-md rounded-xl items-center"
                  >
                    {/* remove button */}
                    <div
                      onClick={() => removeFromCart(product._id)}
                      className="absolute top-4 right-4 cursor-pointer hover:text-red-500"
                    >
                      <BiTrash /> {removeFromCart.isPending && <Loading />}
                    </div>
                    {/* product image */}
                    <div className="w-28 h-28 border border-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className="object-contain w-full h-full"
                      />
                    </div>

                    {/* product details */}
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-lg font-bold">
                          {product.product.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Category: {product.product.category.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          SubCategory:{" "}
                          {product.product.subcategory
                            .map((item) => item?.name)
                            .join(", ")}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <p className="text-lg font-bold text-primary-1">
                          {product.price * product.count} EGP
                        </p>
                        {/* quantity controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              updateCount(
                                product.product._id,
                                product.count - 1
                              );
                            }}
                            disabled={
                              product.count === 1 || updateCount.isLoading
                            }
                            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {product.count}
                          </span>
                          <button
                            onClick={() => {
                              updateCount(
                                product.product._id,
                                product.count + 1
                              );
                            }}
                            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-white shadow-lg rounded-xl p-6 h-fit">
                <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold">
                    {cart.data.totalCartPrice} EGP
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-xl font-bold mb-6">
                  <span>Total</span>
                  <span>{cart.data.totalCartPrice} EGP</span>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="btn-primary w-full"
                >
                  checkout
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>Your cart is empty</div>
        </>
      )}
    </>
  );
}
