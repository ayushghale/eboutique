import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHeart,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import User from "../menu/user.jsx";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";
import api from "../../utils/api.js";

export default function NavBar() {
  const [isCategoryHovered, setCategoryHovered] = useState(false);
  const [category, setCategory] = useState([]);

  const accessToken = sessionStorage.getItem("accessToken");

  const navigator = useNavigate();

  const hover = (name) => {
    if (name === "Category") {
      setCategoryHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setCategoryHovered(false);
  };

  // Function to add new address
  const create = () => {
    navigator("/customDesign", {
      state: { id: 1, width: 200, height: 150 },
    });
  };

  const wishlist = () => {
    navigator("/user/wishlist");
  };

  const categoryFetch = async () => {
    try {
      const response = await api.get("category/getAllCategories");
      if (response.success) {
        setCategory(response.data); // Update state with the data array from the response
      } else {
        console.error("Failed to fetch category:", response.message);
      }
    } catch (error) {
      console.error("Error fetching category:", error.message);
    }
  };

  const [CategoryImage, setCategoryImage] = useState("");
  const [categoryInfo, setCategoryInfo] = useState("");

  const handleCategoryHover = (img) => {
    setCategoryImage(img);
    setCategoryInfo(
      category.find((item) => item.image === img)?.description || ""
    );
  };

  useEffect(() => {
    setCategoryHovered(false);
    categoryFetch();
  }, []);
  return (
    <div className="bg-orange-600 flex flex-col items-stretch h-[auto] relative">
      <span className="text-orange-600 text-center text-xs font-semibold tracking-wider whitespace-nowrap items-center bg-white w-full justify-center px-16 py-2.5 max-md:max-w-full max-md:px-5">
        Enjoy Free Shipping On All Orders
      </span>
      <div className="self-center flex h-[60px] w-full max-w-[1224px] items-stretch justify-between gap-5  max-md:max-w-full max-md:flex-wrap">
        <span className="flex-col  max-md:px-5 py-1 w-[165px]">
          <img
            src="logo_1.png"
            className="object-contain object-center w-[5rem] pb-1"
          />
        </span>
        <nav className="justify-between items-start self-center flex gap-2 my-auto pl-2.5 pr-1.5 h-full  max-md:max-w-full max-md:flex-wrap">
          <li className="px-2  h-full text-lg font-semibold capitalize flex justify-center items-center ">
            <a href="/" className="text-white ">
              <span className="flex items-center justify-center">Home</span>
            </a>
          </li>
          <li className="px-2  h-full text-lg font-semibold capitalize flex justify-center items-center ">
            <a href="/product" className="text-white ">
              <span className="flex items-center justify-center">Product</span>
            </a>
          </li>
          <li
            className="px-2  h-full text-lg font-semibold capitalize flex justify-center items-center "
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => hover("Category")}
          >
            <button className="text-white ">
              <span className="flex items-center justify-center">Category</span>
            </button>
          </li>
          <li
            className="px-2  h-full text-lg font-semibold capitalize flex justify-center items-center "
            onClick={create}
          >
            <button className="text-white ">
              <span className="flex items-center justify-center">
                {" "}
                Customize{" "}
              </span>
            </button>
          </li>
        </nav>

        <div className=" w-[165px]  items-stretch self-center flex gap-5 my-auto px-2 py-1 text-lg text-white">
          <div className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>

          <div className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full">
            <User />
          </div>

          {accessToken ? (
            <>
              <div
                onClick={wishlist}
                className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
              >
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full">
                <a href="/user/Cart" className=" hover:text-black">
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className=" text-white"
                  />
                </a>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {isCategoryHovered && (
        <div className="absolute flex justify-center top-full w-screen">
          <div
            className=" top-full h-[40vh] z-30 w-[100vh] border  border-gray  rounded-md  bg-white shadow-md p-5 transition-opacity duration-300 opacity-100"
            onMouseEnter={() => hover("Category")}
            onMouseLeave={handleMouseLeave}
          >
            <div className=" grid  grid-cols-12 h-full gap-4">
              <div
                className="col-span-4 h-full flex items-start flex-col gap-2 overflow-auto "
                style={{
                  scrollbarColor: "#d4d4d4 #f3f4f6",
                }}
              >
                {category &&
                  category.map((item) => (
                    <button
                      key={item.id}
                      className="w-full flex items-start p-4  rounded-md  hover:bg-gray transition-all duration-300"
                      onMouseEnter={() => handleCategoryHover(item.image)}
                    >
                      <span className=" font-semibold text-lg">
                        {item.name}
                      </span>
                    </button>
                  ))}
              </div>
              <div className="col-span-8 h-full w-full relative ">
                {/* Background Image */}
                <div
                  className="h-full w-full rounded-md bg-cover bg-center bg-no-repeat  relative"
                  style={{
                    backgroundImage: `url(${CategoryImage})`,
                  }}
                />
                {/* Text at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-black bg-opacity-75 rounded-b-md">
                  <span className="text-lg font-semibold">{categoryInfo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
