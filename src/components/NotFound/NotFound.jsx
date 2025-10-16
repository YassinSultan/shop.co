import React from "react";
import Image from "../../assets/images/404 error with person looking for-bro.svg";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mt-6">Page Not Found</h1>
      <div className="w-1/2 max-w-lg mx-auto">
        <img src={Image} alt="404 Not Found" className="w-full" />
      </div>
      <Link
        to="/"
        className="bg-secondary-2 text-white px-5 py-2 rounded-md hover:opacity-50 w-fit mt-6"
      >
        Go Home
      </Link>
    </div>
  );
}
