import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Accordion({ title, content }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [open]);

  return (
    <div className="rounded-lg overflow-hidden shadow-md p-4 my-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between !p-0"
      >
        <h2 className="capitalize">{title}</h2>

        <IoIosArrowDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-all duration-300"
      >
        <div className="py-4">{content}</div>
      </div>
    </div>
  );
}
