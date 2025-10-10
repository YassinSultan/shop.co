import React, { useEffect, useState } from "react";
import { getUserOrders } from "../../services/ordersService";
// import style from "./AllOrders.module.css";
export default function AllOrders() {
  const [userOrders, setUserOrders] = useState(null);
  useEffect(() => {
    const getUserOrdersHandler = async () => {
      try {
        const orders = await getUserOrders();
        console.log("orders", orders);
        setUserOrders(orders);
        console.log("userOrders", userOrders);
      } catch (error) {
        console.log(error);
      }
    };
    getUserOrdersHandler;
  }, [userOrders]);
  return (
    <>
      {userOrders ? (
        <>
          <div className="container w-full">
            {userOrders.map((order) => (
              <div
                key={order._id}
                className="mb-4 rounded-lg overflow-hidden shadow-md"
              >
                {/* card header */}
                <div className="p-2 bg-primary-1 text-primary flex justify-between items-center">
                  <h2 className="text-lg font-bold">Order ID: {order.id}</h2>
                  <p className=" !mb-0 !text-primary">
                    {/* convert  2025-09-30T08:48:36.459Z to 2025-09-30 12:48 */}
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </div>
                <div className="p-4">
                  {/* order state */}
                  <div>
                    <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base">
                      <li
                        className={`flex md:w-full items-center ${
                          order.isPaid
                            ? "text-secondary-2"
                            : "text-primary-1 opacity-50"
                        }  sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-primary-1 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
                      >
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                          {order.isPaid && (
                            <svg
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                          )}
                          Paid
                        </span>
                      </li>
                      <li
                        className={`flex md:w-full items-center ${
                          order.isDelivered
                            ? "text-secondary-2"
                            : "text-primary-1 opacity-50"
                        }  sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-primary-1 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
                      >
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2">
                          {order.isDelivered && (
                            <svg
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                          )}
                          Delivered
                        </span>
                      </li>
                      <li class="flex items-center">
                        <span
                          className={`flex md:w-full items-center ${
                            order.isDelivered
                              ? "text-secondary-2"
                              : "text-primary-1 opacity-50"
                          }  sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-primary-1 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
                        >
                          Shipped
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
                {/* cart items */}
                <div className="p-4">
                  {order.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-4 mb-4 p-4 shadow-md rounded-xl items-center"
                    >
                      {/* product image */}
                      <div className="w-28 h-28 border border-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                        <img
                          src={item.product.imageCover}
                          className="w-full h-full object-contain"
                          alt="product"
                        />
                      </div>
                      {/* product details */}
                      <div className="flex-1">
                        <p className="!text-lg !text-primary-1 !font-semibold">
                          {item.product.title}
                        </p>
                        <p className="text-sm font-semibold text-gray-600">
                          Quantity: {item.count}
                        </p>
                        <p className="text-sm font-semibold text-gray-600">
                          Price per item: {item.price} EGP
                        </p>
                        <p className="text-sm font-semibold text-gray-600">
                          Price : {item.price * item.count} EGP
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* order summary */}
                <div className="flex justify-between p-4 items-center">
                  {order.shippingAddress && (
                    <>
                      <div>
                        <h3>Shipping Address</h3>
                        <p>{order.shippingAddress?.details}</p>
                        <p>phone: {order.shippingAddress?.phone}</p>
                        <p>city: {order.shippingAddress?.city}</p>
                      </div>
                    </>
                  )}
                  {/* payment method and order price  */}
                  <div>
                    <p>
                      <span className="pe-2 text-sm font-light">
                        Shipping Price :
                      </span>
                      {order.shippingPrice}
                    </p>
                    <p>
                      <span className="pe-2 text-sm font-light">Tax :</span>
                      {order.taxPrice}
                    </p>
                    <hr className="my-1 opacity-10" />
                    <p>
                      <span className="pe-2 text-sm font-light">
                        Total Price :{" "}
                      </span>
                      {order.totalOrderPrice} EGP
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p>no orders</p>
        </>
      )}
    </>
  );
}
