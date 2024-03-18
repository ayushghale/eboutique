import React, { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faHeart,
  faBagShopping,
  faL,
} from "@fortawesome/free-solid-svg-icons";

import User from "../menu/user.jsx";

export default function NavBar() {
  const [hovering, setHovering] = useState(null);
  const [popoverLeft, setPopoverLeft] = useState(null);
  const [popoverHeight, setPopoverHeight] = useState(null);

  const ref = useRef([]);

  const onMouseEnter = (index, el) => {
    setHovering(index);
    setPopoverLeft(el.offsetLeft);
    const menuElement = ref.current[index];
    if (menuElement) {
      setPopoverHeight(menuElement.offsetHeight);
    }
  };

  return (
    <div className="bg-orange-600 flex flex-col items-stretch h-[auto]">
      <span className="text-orange-600 text-center text-xs font-semibold tracking-wider whitespace-nowrap items-center bg-white w-full justify-center px-16 py-2.5 max-md:max-w-full max-md:px-5">
        Enjoy Free Shipping On All Orders
      </span>
      <div className="self-center flex h-[60px] w-full max-w-[1224px] items-stretch justify-between gap-5  max-md:max-w-full max-md:flex-wrap">
        <span className=" flex-col  max-md:px-5 py-1 w-[165px]">
          <img
            src="logo_1.png"
            className=" object-contain object-center w-[5rem] pb-1"
          />
        </span>
        <nav
          onMouseLeave={() => {
            setHovering(null);
          }}
          className="justify-between items-start self-center flex gap-2 my-auto pl-2.5 pr-1.5 py-2 max-md:max-w-full max-md:flex-wrap"
        >
          <li className=" px-2 list-none">
            <a
              href="/"
              className="text-white text-center text-lg font-semibold leading-8 capitalize grow whitespace-nowrap self-start"
            >
              Home
            </a>
          </li>
          <li className="px-2 list-none">
            <a
              href="/product"
              className="text-white text-center text-lg font-semibold leading-8 capitalize grow whitespace-nowrap self-start"
            >
              Product
            </a>
          </li>
          <li className="px-2 list-none">
            <a
              href="##"
              className="text-white text-center text-lg font-semibold leading-8 capitalize grow whitespace-nowrap self-start"
            >
              Category
            </a>
          </li>
          <li className="px-2 list-none">
            <a
              href="/productDescription"
              className="text-white text-center text-lg font-semibold leading-8 capitalize grow whitespace-nowrap self-start"
            >
              About
            </a>
          </li>
          <li className="px-2">
            <a
              href="##"
              className="text-white text-center text-lg font-semibold leading-8 capitalize grow whitespace-nowrap self-start"
            >
              Cutomize
            </a>
          </li>
        </nav>

        <div className=" w-[165px] justify-between items-stretch self-center flex gap-5 my-auto px-2 py-1 text-lg text-white">
          <div className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>

          <div className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full">
            <User />
          </div>

          <div className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full">
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full">
            <a href="/user/Cart" className=" hover:text-black">
              <FontAwesomeIcon icon={faBagShopping} className=" text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
