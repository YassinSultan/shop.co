import React from "react";
import { OrbitProgress } from "react-loading-indicators";
// import style from "./Loading.module.css";
export default function Loading() {
  const setting = {
    color: "#DB4444",
    size: "medium",
    text: "Loading",
    textColor: "",
  };
  return (
    <>
      <OrbitProgress {...setting} />
    </>
  );
}
