import React, { useState } from "react";
import Card from "../component/product/card.jsx";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";

import CustomDropDown from "../component/filter/dropdown.jsx";

function valuetext(value) {
  return `${value}°C`;
}
const people = [
    { name: 'Relevent' },
    { name: 'High to Low' },
    { name: 'Low to High' },
  ]


export default function ProductPage() {
  const [value, setValue] = useState([300, 10000]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section className="flex flex-col">
      <div className="w-full max-w-[1224px] self-center">
        <div className=" flex flex-col">
          <div className="">
            <h1 className="text-2xl font-extrabold">Product</h1>
          </div>
          <div className=" grid grid-cols-4 gap-4">
            <div className=" flex  flex-col gap-9">
              {/* category  */}
              <div className=" bg-gradient-to-br from-gray-300 to-white shadow-2xl">
                <div className=" px-5">
                  <h2 className=" font-bold text-xl border-b-2 border-b-gray pb-2">
                    {" "}
                    Cartegory
                  </h2>
                  <div className=" flex flex-col gap-1 my-3">
                    <div className="">
                      <input type="checkbox" />
                      <label htmlFor=""> Cartegory</label>
                    </div>
                    <div className="">
                      <input type="checkbox" />
                      <label htmlFor=""> Cartegory</label>
                    </div>
                    <div className="">
                      <input type="checkbox" />
                      <label htmlFor=""> Cartegory</label>
                    </div>
                  </div>
                </div>
              </div>
              {/* price  */}
              <div className=" bg-gradient-to-br from-gray-300 to-white shadow-2xl">
                <div className=" px-5">
                  <h2 className=" font-bold text-xl border-b-2 pb-2 border-b-gray">
                    Price
                  </h2>
                  <div className=" flex flex-col gap-1 my-3">
                    <Box sx={{ width: 250 }}>
                      <Slider
                        getAriaLabel={() => "Price range"}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        min={300}
                        max={10000}
                        getAriaValueText={valuetext}
                      />
                    </Box>
                    <div className="flex flex-row gap-6 w-full">
                      <input
                        type="text"
                        className="border-gray border p-1 rounded-md w-1/2"
                        value={value[0]}
                        readOnly
                      />
                      <span>-</span>
                      <input
                        type="text"
                        className="border-gray border p-1 rounded-md w-1/2"
                        value={value[1]}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* color  */}
              <div className=" bg-gradient-to-br from-gray-300 to-white shadow-2xl">
                <div className=" px-5">
                  <h2 className=" font-bold text-xl border-b-2 pb-2 border-b-gray">
                    Rating
                  </h2>
                  <div className=" flex flex-col gap-1 my-3">
                    <Rating name="read-only" value={5} readOnly />
                    <Rating name="read-only" value={4} readOnly />
                    <Rating name="read-only" value={3} readOnly />
                    <Rating name="read-only" value={2} readOnly />
                    <Rating name="read-only" value={1} readOnly />
                  </div>
                </div>
              </div>
            </div>
            <section className="col-span-3 ">
              <div className="">
                <div className="">
                  <div className="flex flex-row justify-between border border-[#dfdfdf] mb-4 rounded-md  pr-2">
                    <div className="">
                     <CustomDropDown data={people}     />
                    </div>
                    <div className=" flex flex-col justify-center">
                      <p className=" flex gap-1">
                        showing itmes <p className=" text-primary">20</p>
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <Card num={25} />
                  </div>
                  <div className="">Shorting</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
