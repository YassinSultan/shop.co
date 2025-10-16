import React, { useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { useCart } from "../../hooks/useCart";
// import style from "./Navbar.module.css";
export default function Navbar() {
  const { token, deleteToken } = useAuth();
  const { cart } = useCart();
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();
  function logout() {
    deleteToken();
    navigate("/login");
  }
  return (
    <>
      <header className="sticky  w-full z-50  top-0 bg-primary">
        {/* Announcement */}
        <div className="hidden md:block bg-text-button text-text p-1 text-center text-sm">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <Link to="/" className="font-bold underline ps-4">
            Shop Now
          </Link>
        </div>
        {/* Navigation */}
        <nav className="relative after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 border-b-1 border-gray-300">
          <div className="container">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
                {/* Mobile menu button*/}
                {token && (
                  <>
                    <button
                      onClick={() => setMobile(!mobile)}
                      type="button"
                      className="relative inline-flex items-center justify-center rounded-md p-2 text-text-1 cursor-pointer  focus:outline-2 focus:-outline-offset-1 focus:outline-primary-1"
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        data-slot="icon"
                        aria-hidden="true"
                        className="size-6 in-aria-expanded:hidden"
                      >
                        <path
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        data-slot="icon"
                        aria-hidden="true"
                        className="size-6 not-in-aria-expanded:hidden"
                      >
                        <path
                          d="M6 18 18 6M6 6l12 12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center pe-2">
                  <Link to={"/"} className="font-title font-extrabold text-xl">
                    SHOP.CO
                  </Link>
                </div>
                <div className="hidden sm:mx-6 w-full sm:flex sm:justify-center">
                  {token && (
                    <>
                      <div className="flex space-x-4">
                        {/* Current: "bg-gray-950/50 text-white", Default: "text-gray-300 hover:bg-white/5 hover:text-white" */}
                        <NavLink
                          to="/"
                          className={({ isActive }) =>
                            `py-2 text-sm font-medium text-text-2 ${
                              isActive ? "underline" : "opacity-50"
                            }`
                          }
                        >
                          Home
                        </NavLink>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3">
                {!token ? (
                  <>
                    <Link to={"/login"}>Login</Link>
                    <Link to={"/register"}>Register</Link>
                  </>
                ) : (
                  <div className="flex gap-5">
                    <Link to={"/cart"}>
                      <div className="relative text-2xl">
                        <IoCartOutline />
                        {cart?.data.data?.products?.length > 0 && (
                          <span>
                            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
                              {cart?.data.numOfCartItems}
                            </span>
                          </span>
                        )}
                      </div>
                    </Link>
                    <Link to={"/wishlist"}>
                      <div className="relative text-2xl">
                        <IoHeartOutline />
                      </div>
                    </Link>
                    <span
                      onClick={logout}
                      className="hidden md:flex items-center justify-center bg-red-600 text-text px-2 py-1 rounded-md cursor-pointer hover:bg-red-700 transition"
                    >
                      Logout
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* mobile  */}
          <div
            id="mobile-menu"
            className={`absolute w-full bg-primary z-100 border-b-2 border-gray-300 ${
              mobile ? "sm:hidden" : "hidden"
            }`}
          >
            <div className="space-y-1 px-2 pt-2 pb-3">
              {/* Current: "bg-gray-950/50 text-white", Default: "text-gray-300 hover:bg-white/5 hover:text-white" */}
              {token && (
                <>
                  <div className="border-b-2 border-gray-200 pb-5 space-y-2">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `block rounded-md px-3 py-2 text-base font-medium ${
                          isActive ? "bg-primary-1 text-text" : "opacity-50"
                        }`
                      }
                    >
                      Home
                    </NavLink>
                  </div>
                  <span
                    onClick={logout}
                    className="flex mt-5  items-center justify-center bg-red-600 text-text px-2 py-1 rounded-md cursor-pointer hover:bg-red-700 transition"
                  >
                    Logout
                  </span>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
