import React from "react";
// import style from "./Shop.module.css";
import { RiListSettingsLine } from "react-icons/ri";
import Products from "../Products/Products";
export default function Shop() {
  return (
    <section className="container py-4  grid grid-cols-12 flex-1 ">
      {/* Filters sidebar */}
      <aside className=" hidden md:block col-span-3 max-h-fit bg-primary p-4 rounded-lg shadow sticky top-30">
        <div className="flex justify-between items-center border-b-2 border-gray-200 py-2">
          <h2 className="text-lg font-semibold font-heading">Filters</h2>
          <RiListSettingsLine />
        </div>
        {/* Add filter options here */}
      </aside>
      {/* Products grid */}
      <div className="p-4 col-span-12 md:col-span-9">
        {/* Product cards go here */}
        <Products limit="12" />
      </div>
    </section>
  );
}
