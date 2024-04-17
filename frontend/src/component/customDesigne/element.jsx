import React from "react";

const Element = ({ id, info, exId }) => {
  return (
    <>
      {exId ? (
        <>
          <div
            onClick={() => info.resizeElement(exId, info)}
            className=" group group-hover:block hidden absolute -bottom-1 -right-1 w-2 
            aspect-square cursor-nesw-resize bg-green-600 z-[99999] "
          ></div>
          <div
            onClick={() => info.resizeElement(exId, info)}
            className=" group group-hover:block hidden absolute -bottom-1 -left-1 w-2 
            aspect-square cursor-nesw-resize bg-green-600 z-[99999] "
          ></div>
          <div
            onClick={() => info.resizeElement(exId, info)}
            className=" group group-hover:block hidden absolute -top-1 -right-1 w-2 
            aspect-square cursor-nesw-resize bg-green-600 z-[99999] "
          ></div>
          <div
            onClick={() => info.resizeElement(exId, info)}
            className=" group group-hover:block hidden absolute -top-1 -left-1 w-2 
            aspect-square cursor-nesw-resize bg-green-600 z-[99999] "
          ></div>
        </>
      ) : (
        <>
          <div
            onClick={() => info.resizeElement(id, info)}
            className=" group group-hover:block hidden absolute -bottom-1 -right-1 w-2 
            aspect-square cursor-nesw-resize bg-green-600 z-[99999] "
          ></div>
           <div
            onClick={() => info.resizeElement(exId, info)}
            className=" group group-hover:block hidden absolute -bottom-1 -left-1 w-2 
            aspect-square cursor-nesw-resize bg-green-600 z-[99999] "
          ></div>
          <div
            onClick={() => info.resizeElement(id, info)}
            className=" group group-hover:block hidden absolute -top-1 -right-1 w-2 
            aspect-square cursor-nesw-resize bg-green-600 z-[99999] "
          ></div>
          <div
            onClick={() => info.resizeElement(id, info)}
            className=" group group-hover:block hidden absolute -bottom-1 -left-1 w-2 
            aspect-square cursor-nesw-resize bg-green-600 z-[99999] "
          ></div>
        </>
      )}
      <div
        onClick={() => info.rotateElement(id, info)}
        className=" group group-hover:block hidden absolute -top-1 -left-1 w-2 
            aspect-square cursor-nesw-resize bg-green-600 z-[99999] "
      ></div>
      <div
        onClick={() => info.moveElement(id, info)}
        className=" group group-hover:block hidden absolute -top-1 left-[45%] 
         translate-[-50%, 0%] w-2 aspect-square cursor-nesw-resize bg-blue-500 z-[99999] "
      ></div>
      <div
        onClick={() => info.moveElement(id, info)}
        className=" group group-hover:block hidden absolute top-[45%] -right-1
        translate-[-50%, 0%] w-2 
            aspect-square cursor-nesw-resize bg-blue-500 z-[99999] "
      ></div>
      <div
        onClick={() => info.moveElement(id, info)}
        className=" group group-hover:block hidden absolute -bottom-1 left-[45%] 
        translate-[-50%, 0%] w-2 
            aspect-square cursor-nesw-resize bg-blue-500 z-[99999] "
      ></div>
      <div
        onClick={() => info.moveElement(id, info)}
        className=" group group-hover:block hidden absolute top-[45%] -left-1 
        translate-[-50%, 0%] w-2 
            aspect-square cursor-nesw-resize bg-blue-500 z-[99999] "
      ></div>

    </>
  );
};

export default Element;
