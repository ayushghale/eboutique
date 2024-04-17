import React, { useState, useEffect } from "react";
import Card from "../component/product/card.jsx";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import api from "../utils/api.js";

import CustomDropDown from "../component/filter/dropdown.jsx";

function valuetext(value) {
  return `${value}°C`;
}
const filter = [
  { name: "Relevent" },
  { name: "High to Low" },
  { name: "Low to High" },
];

export default function ProductPage() {
  const [value, setValue] = useState([300, 10000]);

  const [product, setProduct] = useState([]);

  const categoryFetch = async () => {
    try {
      const response = await api.get("product/getAllProducts");
      if (response.success) {
        setProduct(response.data); // Update state with the data array from the response

        console.log("Product fetched successfully:", response.data);
      } else {
        console.error("Failed to fetch category:", response.message);
      }
    } catch (error) {
      console.error("Error fetching category:", error.message);
    }
  };

  useEffect(() => {
    categoryFetch();
  }, []);

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
                    <div className="z-3">
                      <CustomDropDown data={filter} />
                    </div>
                    <div className=" flex flex-col justify-center">
                      <p className=" flex gap-1">
                        showing itmes <p className=" text-primary">{(product).length}</p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card productData={product.slice(0, 5)} />
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <button className="btn bg-primary p-3 rounded-md hover:bg-primary-dark text-white">
                    Load More
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
