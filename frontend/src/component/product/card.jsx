import React from "react";
import { Rating } from "@mui/material";

export default function Card({ num }) {
  return (
    <>
      {Array.from({ length: num }, (_, index) => (
        <div className="w-full md:w-full rounded-xl bg-gradient-to-br from-gray-300 to-white shadow-2xl ">
          <div className="h-full flex gap-3 flex-row ">
            <div className=" flex flex-col w-full ">
              <div className=" w-full p-3">
                <img
                  src="tshirt.jpeg"
                  alt=""
                  className=" w-full aspect-square object-cover border-non rounded-lg overflow-hidden dark:border-gray-800"
                />
              </div>
              <div className="px-3">
                <h3 className=" text-sm font-bold text-gray cursor-pointer">
                  {" "}
                  Tshirt
                </h3>
                <h2 className=" font-semibold text-lg cursor-pointer">
                  Acme Circles T-Shirt
                </h2>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Rating name="size-small" value={3} readOnly size="small" />
                  </div>
                </div>
                <h3 className=" text-xl font-bold text-gray cursor-pointer">
                  {" "}
                  Rs. 50
                </h3>
                <div className=" w-full">
                  <a href="/productDescription" className=" flex gap-2 justify-center border capitalize w-full p-1 text-lg font-extrabold hover:bg-primary hover:text-white my-3 rounded-xl  ">
                    view Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function handleClick() {
  
}