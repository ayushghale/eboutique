import React from "react";
import { Link } from "react-router-dom";

export default function Project() {
  return (
    <div className="h-[85vh] overflow-auto ">
      <div className="grid grid-cols-2 gap-2 h-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
          <Link key={index} className=" w-full  rounded-sm cursor-pointer">
            <img src="tshirt.jpeg" alt="" className="h-[150px]" />
          </Link>
        ))}
      </div>
    </div>
  );
}
