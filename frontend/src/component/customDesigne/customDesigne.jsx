import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Element from "./element";

const CustomDesigne = ({ info, currentComponent, removeComponent, color }) => {
  const randomValue = Math.floor(Math.random() * 1000 + 1);

  let html = "";

  if (info.name === "main_frame") {
    html = (
      <div
        onClick={() => info.setCurrentComponent(info)}
        className="hover:border-[2px] hover:border-indigo-500 shadow-2"
        style={{
          height: 500 + "px",
          width: 700 + "px",
          backgroundColor: info.colour, // Use info.colour for main_frame
          zIndex: info.z_index,
          transform: null,
          rotate: null,
          position: "relative",
          backgroundImage: `url(${info.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

        }}
      >
        
      </div>
    );
  }

  if (info.name === "shape" && info.shape === "rectangle") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          height: info.height + "px",
          width: info.width + "px",
          backgroundColor: info.colour, // Use info.colour for rectangle
          opacity: info.opacity,
          top: info.top + "px",
          left: info.left + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className=" group absolute hover:border-[2px]  hover:border-indigo-500 shadow-2"
      >
        <Element id={randomValue} info={info} exId="" />
        {currentComponent?.id === info.id && (
          <div
            className="px-3 bg-white absolute top-0   hidden group-hover:block cursor-pointer "
            onClick={() => removeComponent(info.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        )}
      </div>
    );
  }
  if (info.name === "shape" && info.shape === "circle") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          top: info.top + "px",
          left: info.left + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className=" group absolute  hover:border-indigo-500 "
      >
        <Element id={randomValue} info={info} exId={`${randomValue}c`} />
        <div
          id={`${randomValue}c`}
          className=" rounded-full"
          style={{
            height: info.width + "px",
            width: info.width + "px",
            backgroundColor: info.colour,
            opacity: info.opacity,
          }}
        ></div>
        {currentComponent?.id === info.id && (
          <div
            className="px-3 bg-white absolute top-0   hidden group-hover:block cursor-pointer "
            onClick={() => removeComponent(info.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        )}
      </div>
    );
  }

  if (info.name === "shape" && info.shape === "triangle") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          top: info.top + "px",
          left: info.left + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className=" group absolute  hover:border-indigo-500 "
      >
        <Element id={randomValue} info={info} exId={`${randomValue}c`} />

        <div
          id={`${randomValue}t`}
          className=""
          style={{
            height: info.width + "px",
            width: info.width + "px",
            backgroundColor: info.colour,
            opacity: info.opacity,
            clipPath: "polygon(50% 0%, 100% 100%,0% 100%)",
          }}
        ></div>
        {currentComponent?.id === info.id && (
          <div
            className="px-3 bg-white absolute top-0   hidden group-hover:block cursor-pointer "
            onClick={() => removeComponent(info.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        )}
      </div>
    );
  }
  if (info.name === "text") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
          padding:info.padding+"px",
          color: info.colour,
          opacity: info.opacity,
        }}
        className=" group absolute  hover:border-indigo-500 "
      >
        <Element id={randomValue} info={info} exId="" />

        <h2 className=" w-full h-full "
        style={{
          fontSize: info.fontSize + "px",
          fontWeight: info.fontWeight,
        }}>
          {info.title} 
        </h2>
        {currentComponent?.id === info.id && (
          <div
            className="px-3 bg-white absolute top-0 hidden group-hover:block cursor-pointer "
            onClick={() => removeComponent(info.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        )}
      </div>
    );
  }

  if (info.name === "image") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
          opacity: info.opacity,
        }}
        className=" group absolute  hover:border-indigo-500 "
      >
        <Element id={randomValue} info={info} exId={`${randomValue}img`} />

        <div
          id={`${randomValue}img`}
          className=" overflow-hidden"
          style={{
            height: info.height + "px",
            width: info.width + "px",
            borderRadius:`${info.borderRadius}%`,
          }}
        >
          <img className=" w-full h-full" src={info.image} alt="" />
          <p>{info.borderRadius}</p>
        </div>
        {currentComponent?.id === info.id && (
          <div
            className="px-3 bg-white absolute top-0 hidden group-hover:block cursor-pointer "
            onClick={() => removeComponent(info.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        )}
      </div>
    );
  }

  return html;
};

export default CustomDesigne;
