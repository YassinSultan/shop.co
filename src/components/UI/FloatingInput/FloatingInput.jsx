import React from "react";
// import style from "./FloatingInput.module.css";
export default function FloatingInput({
  id,
  label,
  type = "text",
  name,
  error,
  ...props
}) {
  return (
    <>
      <div className="relative z-0 w-full mb-7 group">
        <input
          type={type}
          name={name}
          id={id}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-1  peer"
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={id}
          className={`peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-prborder-primary-1 peer-focus:dark:text-prborder-primary-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 capitalize`}
        >
          {label}
          {error && <span className="text-red-600 text-xs ms-4 ">{error}</span>}
        </label>
      </div>
    </>
  );
}
