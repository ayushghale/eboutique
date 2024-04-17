import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faShapes,
  faT,
  faFolder,
  faImage,
  faUpload,
  faChessBoard,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Designe from "../../component/customDesigne/Designe";
import Image from "../../component/customDesigne/images";
import MyImages from "../../component/customDesigne/myImages";
import Project from "../../component/customDesigne/project";
import CustomDesigne from "../../component/customDesigne/customDesigne";
import styled from "@emotion/styled";

export default function CustomDesign() {
  let isRotating = false;
  let isMoving = false;
  let isResizing = false;

  // const [state, setState] = useState({
  //   height: 500,
  //   width: 700,
  // });
  const [showDescription, setShowDescription] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [currentComponent, setCurrentComponent] = useState();
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [rotate, setRotate] = useState(0);
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [fontSize, setFontSize] = useState(16); // Default font size
  const [fontWeight, setFontWeight] = useState("");
  const [opacity, setOpacity] = useState("");
  const [text, setText] = useState("");
  const [z_index, setZ_index] = useState(1);

  const [borderRadius, setBorderRadius] = useState(0);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
    setSelectedElement(null);
  };

  // Function to handle color change
  const handleColorChange = (event) => {
    setColor(event.target.value); // Update color state when color picker value changes
  };

  // Function to set selected element
  const setElements = (type, name) => {
    setSelectedElement({ type, name });
    setShowDescription(true);
  };

  // Function to move element
  const moveElement = (id, currentInfo) => {
    if (isRotating || isResizing) return;

    let isMoving = true;

    const currentDiv = document.getElementById(id);

    const mouseMoving = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const left = parseInt(getStyle.left);
      const top = parseInt(getStyle.top);

      if (isMoving) {
        currentDiv.style.left = `${left + movementX}px`;
        currentDiv.style.top = `${top + movementY}px`;
      }
    };

    const mouseUp = () => {
      isMoving = false;
      document.removeEventListener("mousemove", mouseMoving);
      document.removeEventListener("mouseup", mouseUp);
      setLeft(parseInt(currentDiv.style.left));
      setTop(parseInt(currentDiv.style.top));
    };

    const mouseDown = () => {
      document.addEventListener("mousemove", mouseMoving);
      document.addEventListener("mouseup", mouseUp);
    };

    document.addEventListener("mousedown", mouseDown);
  };

  // Function to resize element
  const resizeElement = (id, currentInfo) => {
    if (isRotating || isMoving) return;

    console.log("resizing", currentInfo);

    let isResizing = true;

    // Retrieve the currentDiv element
    const currentDiv = document.getElementById(id);

    if (!currentDiv) {
      return;
    }

    const mouseMoving = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const width = parseInt(getStyle.width);
      const height = parseInt(getStyle.height);

      if (isResizing) {
        currentDiv.style.width = `${width + movementX}px`;
        currentDiv.style.height = `${height + movementY}px`;
      }
    };

    const mouseUp = () => {
      isResizing = false;
      document.removeEventListener("mousemove", mouseMoving);
      document.removeEventListener("mouseup", mouseUp);
      setWidth(parseInt(currentDiv.style.width));
      setHeight(parseInt(currentDiv.style.height));
      // Here you can perform additional operations after resizing
    };

    const mouseDown = () => {
      document.addEventListener("mousemove", mouseMoving);
      document.addEventListener("mouseup", mouseUp);
    };

    document.addEventListener("mousedown", mouseDown);
  };

  // Function to rotate element
  const rotateElement = (id, currentInfo) => {
    setCurrentComponent("");
    setCurrentComponent(currentInfo);

    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    isRotating = true;

    const mouseMove = ({ movementX }) => {
      if (!isRotating) return; // Exit if not rotating
      const getStyle = window.getComputedStyle(target);
      const trans = getStyle.transform;

      if (!trans || trans === "none") {
        target.style.transform = `rotate(0deg)`;
        return;
      }

      const value = trans.split("(")[1].split(")")[0].split(",");
      const angle = Math.round(
        Math.atan2(value[1], value[0]) * (180 / Math.PI)
      );

      let deg = angle < 0 ? angle + 360 : angle;

      if (movementX) {
        deg += movementX;
      }
      target.style.transform = `rotate(${deg}deg)`;

      setRotate(deg);
    };

    const mouseUp = () => {
      isRotating = false; // Update rotation state
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setRotate(0);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  // Function to delete element
  const deleteElement = (id) => {
    const com = component.filter((item) => item.id !== id);
    setCurrentComponent(null);
    setComponent([...com]);
  };
  const opacityHandler = (e) => {
    setOpacity(parseFloat(e.target.value));
  };
  const textHandler = (e) => {
    setText(e.target.value);
  };
  const fontSizeHandler = (e) => {
    const newSize = parseInt(e.target.value);
    console.log("fontSizeHandler", newSize);
    setFontSize(newSize);

    setCurrentComponent((prevComponent) => ({
      ...prevComponent,
      fontSize: newSize,
    }));
  };

  const fontweightHandler = (e) => {
    console.log("fontweightHandler", e.target.value);

    const newFontWeignt = setFontWeight(e.target.value);

    setCurrentComponent({
      ...currentComponent,
      fontWeight: newFontWeignt,
    });
  };
  const heightHandler = (e) => {
    const newHight = setHeight(parseInt(e.target.value));

    setCurrentComponent({
      ...currentComponent,
      height: newHight,
    });
  };
  const widthHandler = (e) => {
    const newWidth = setWidth(parseInt(e.target.value));

    // Update the currentComponent state with the new width value
    setCurrentComponent({
      ...currentComponent,
      width: newWidth,
    });
  };

  const rotateHandler = (e) => {
    const newRotate = parseInt(e.target.value);

    // Update the rotate state
    setRotate(newRotate);

    // Update the currentComponent state with the new rotate value
    setCurrentComponent({
      ...currentComponent,
      rotate: newRotate,
    });
  };

  const xAsisHandler = (e) => {
    console.log("xAsisHandler", e.target.value);
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setLeft(value);
      console.log("xAsisHandler", value);
    }

    setCurrentComponent({
      ...currentComponent,
      left: value,
    });
  };

  const yAsisHandler = (e) => {
    console.log("yAsisHandler", e.target.value);
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setTop(value);
      console.log(value);
    }

    setCurrentComponent({
      ...currentComponent,
      top: value, // Use the parsed integer value here
    });
  };

  const setZIndex = (e) => {
    const newZIndex = parseInt(e.target.value);

    // Update the z_index state
    setZ_index(newZIndex);

    // Update the currentComponent state with the new z_index value
    setCurrentComponent({
      ...currentComponent,
      z_index: newZIndex,
    });
  };

  const borderHandler = (e) => {
    const newBorder = setBorderRadius(parseInt(e.target.value));
    setCurrentComponent({
      ...currentComponent,
      borderRadius: newBorder,
    });
  };
  

  // Function to add image to main_frame
  const [component, setComponent] = useState([
    {
      name: "main_frame",
      trpe: "react",
      id: Math.floor(Math.random() * 1000 + 1),
      height:  500,
      width: 700,
      z_index: 0,
      colour: "gray",
      image: "",
      setCurrentComponent: (a) => setCurrentComponent(a),
    },
  ]);

  // Function to add image to main_frame
  const removeBackground = () => {
    const updatedComponents = component.map((item) => {
      if (item.name === "main_frame") {
        return { ...item, image: "" }; // Clear the image property
      }
      return item;
    });

    setImage(""); // Clear the image state
    setComponent(updatedComponents); // Update the component state
  };

  const createShape = (name, type) => {
    const style = {
      id: Math.floor(Math.random() * 1000 + 1),
      name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      width: 100,
      height: 80,
      rotate: rotate || 0,
      z_index: 2,
      colour: "#3c3c3d", // Default color
      shape: type,
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };

    setComponent([...component, style]);
  };

  const addText = (name, type) => {
    const style = {
      id: Math.floor(Math.random() * 1000 + 1),
      name,
      title: text || "Title",
      type,
      left: 10,
      top: 10,
      opacity: 1,
      rotate,
      z_index: 10,
      padding: 6,
      fontSize: fontSize || 16,
      fontWeight: fontWeight || "normal",
      colour: "#000000", // Default color
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };

    setFontSize("");
    setFontWeight("");
    setCurrentComponent(style);
    setComponent([...component, style]);
  };

  const add_image = (img) => {
    const style = {
      id: Math.floor(Math.random() * 1000 + 1),
      name: "image",
      type: "image",
      left: 10,
      top: 10,
      opacity: 1,
      rotate,
      z_index: z_index || 10,
      width: 100,
      height: 80,
      image: img,
      borderRadius: borderRadius || 0, // Make sure borderRadius is defined
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };
  
    setBorderRadius(""); // Ensure borderRadius is initialized with a value
    setZ_index("");
    setCurrentComponent(style);
    setComponent([...component, style]);
  };
  

  useEffect(() => {
    if (currentComponent) {
      const index = component.findIndex(
        (item) => item.id === currentComponent.id
      );
      const temp = component.filter((item) => item.id !== currentComponent.id);

      if (currentComponent.name !== "text") {
        component[index].width = width || currentComponent.width;
        component[index].height = height || currentComponent.height;
        component[index].rotate = rotate || currentComponent.rotate;
      }

      if (currentComponent.name === "main_frame" && image) {
        component[index].image = image;
      }

      if (currentComponent.name !== "main_frame") {
        component[index].left = left || currentComponent.left;
        component[index].top = top || currentComponent.top;
        component[index].opacity = opacity || currentComponent.opacity;
        component[index].z_index = z_index || currentComponent.z_index;
        component[index].borderRadius = borderRadius || currentComponent.borderRadius;
      }
      if (currentComponent.name === "text") {
        component[index].title = text || currentComponent.title;
        component[index].fontSize = fontSize || currentComponent.fontSize;
        component[index].fontWeight = fontWeight || currentComponent.fontWeight;
      }

      component[index].colour = color || currentComponent.colour;
      setComponent([...temp, component[index]]);

      setLeft("");
      setTop("");
      setWidth("");
      setHeight("");
      setRotate(0);
      setOpacity("");
      setText("");
      setFontSize(16);
      setFontWeight("");
      setZ_index(1);
      setBorderRadius(0);

    }
  }, [
    color,
    image,
    left,
    top,
    width,
    height,
    rotate,
    opacity,
    text,
    fontSize,
    fontWeight,
    z_index,
    borderRadius,
  ]);

  return (
    <div className="flex flex-col h-screen">
      {/* header */}
      <div className="border-b border-gray bg-white">
        <Header />
      </div>
      {/* header end */}
      {/* main content */}
      <div className="flex flex-row overflow-hidden h-screen">
        {/* sidebar */}
        <div className=" w-[100px] border-r border-gray ">
          <div className="w-full">
            {/* Navigation */}
            <div className="  overflow-y-auto">
              <div className="flex flex-col gap-3 p-3">
                <button onClick={() => setElements("design", "design")}>
                  <div
                    className={`hover:bg-gray-3 flex items-center flex-col aspect-square justify-center rounded-lg ${
                      selectedElement && selectedElement.name === "design"
                        ? "bg-primary rounded-5xl hover:bg-primary text-white"
                        : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faLightbulb} className="text-2xl" />
                    <p className="mt-1">Design</p>
                  </div>
                </button>
                <button onClick={() => setElements("shapes", "shapes")}>
                  <div
                    className={`hover:bg-gray-3 flex items-center flex-col aspect-square justify-center rounded-lg ${
                      selectedElement && selectedElement.name === "shapes"
                        ? "bg-primary rounded-5xl hover:bg-primary text-white"
                        : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faShapes} className="text-2xl" />
                    <p className="mt-1"> Shapes</p>
                  </div>
                </button>
                <button onClick={() => setElements("upload", "upload")}>
                  <div
                    className={`hover:bg-gray-3 flex items-center flex-col aspect-square justify-center rounded-lg ${
                      selectedElement && selectedElement.name === "upload"
                        ? "bg-primary rounded-5xl hover:bg-primary text-white"
                        : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faUpload} className="text-2xl" />
                    <p className="mt-1"> upload</p>
                  </div>
                </button>
                <button onClick={() => setElements("text", "text")}>
                  <div
                    className={`hover:bg-gray-3 flex items-center flex-col aspect-square justify-center rounded-lg ${
                      selectedElement && selectedElement.name === "text"
                        ? "bg-primary rounded-5xl hover:bg-primary text-white"
                        : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faT} className="text-2xl" />
                    <p className="mt-1">Text</p>
                  </div>
                </button>
                <button onClick={() => setElements("project", "project")}>
                  <div
                    className={`hover:bg-gray-3 flex items-center flex-col aspect-square justify-center rounded-lg ${
                      selectedElement && selectedElement.name === "project"
                        ? "bg-primary rounded-5xl hover:bg-primary text-white"
                        : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faFolder} className="text-2xl" />
                    <p className="mt-1">Project</p>
                  </div>
                </button>
                <button onClick={() => setElements("initImage", "initImage")}>
                  <div
                    className={`hover:bg-gray-3 flex items-center flex-col aspect-square justify-center rounded-lg ${
                      selectedElement && selectedElement.name === "initImage"
                        ? "bg-primary rounded-5xl hover:bg-primary text-white"
                        : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faImage} className="text-2xl" />
                    <p className="mt-1">Image</p>
                  </div>
                </button>
                <button onClick={() => setElements("background", "background")}>
                  <div
                    className={`hover:bg-gray-3 flex items-center flex-col aspect-square justify-center rounded-lg ${
                      selectedElement && selectedElement.name === "background"
                        ? "bg-primary rounded-5xl hover:bg-primary text-white"
                        : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faChessBoard} className="text-2xl" />
                    <p className="mt-1">Background</p>
                  </div>
                </button>
              </div>
            </div>
            {/* end Navigation */}
          </div>
        </div>

        {/* main  */}
        <div className=" w-full h-screen flex flex-row">
          {/* description */}
          <div
            className={`${
              showDescription ? "border-r border-gray" : "border-none"
            }`}
          >
            <div
              className={`${
                showDescription ? "inline-block" : "hidden"
              } w-[350px]`}
            >
              <div className="flex flex-col h-full hi">
                <div className="flex justify-between p-3">
                  <h1 className="text-lg">{selectedElement?.name}</h1>
                  <button
                    onClick={toggleDescription}
                    className="w-6 rounded-lg font-bold text-lg"
                  >
                    X
                  </button>
                </div>
                <div className="flex flex-col gap-2 p-3 overflow-auto h-screen">
                  {(() => {
                    switch (selectedElement?.name) {
                      case "design":
                        return <Designe />;
                      case "shapes":
                        return (
                          <div className=" grid grid-cols-3 gap-3 cursor-pointer ">
                            <button
                              onClick={() => createShape("shape", "rectangle")}
                            >
                              <div
                                className={`hover:bg-gray-3 flex items-center flex-col h-20 justify-center rounded-lg ${
                                  selectedElement &&
                                  selectedElement.name === "shapes"
                                    ? "bg-primary rounded-5xl hover:bg-primary text-white"
                                    : ""
                                }`}
                              >
                                <div className=" w-20 h-10 border-2 flex items-center justify-center">
                                  <p className=""> Rectrangle</p>
                                </div>
                              </div>
                            </button>

                            <button
                              onClick={() => createShape("shape", "circle")}
                            >
                              <div
                                className={`hover:bg-gray-3 flex items-center flex-col aspect-square justify-center rounded-full ${
                                  selectedElement &&
                                  selectedElement.name === "shapes"
                                    ? "bg-primary rounded-5xl hover:bg-primary text-white"
                                    : ""
                                }`}
                              >
                                <div className=" h-18 w-18 border-2 rounded-full flex items-center justify-center ">
                                  <p className=""> Circle</p>
                                </div>
                              </div>
                            </button>

                            <button
                              onClick={() => createShape("shape", "triangle")}
                            >
                              <div
                                className="w-full aspect-square bg-slate-400"
                                style={{
                                  clipPath:
                                    "polygon(50% 0%, 0% 100%, 100% 100%)",
                                }}
                              >
                                <div
                                  className="w-full aspect-square bg-slate-600"
                                  style={{
                                    clipPath:
                                      "polygon(50% 10%, 10% 90%, 90% 90%)",
                                  }}
                                >
                                  {/* Content of the inner triangle */}
                                </div>
                              </div>
                            </button>
                          </div>
                        );
                      case "upload":
                        return <MyImages />;
                      case "text":
                        return (
                          <>
                            <div className="grid grid-cols-1 gap-2">
                              <div
                                onClick={() => addText("text", "title")}
                                className="cursor-pointer font-bold p-3 rounded-sm text-xl"
                              >
                                <h2>Add Text</h2>
                              </div>
                            </div>

                            {currentComponent &&
                              currentComponent.name === "text" && (
                                <div className="flex flex-col">
                                  <div className="">
                                    <label htmlFor="select image">Text:</label>
                                    <input
                                      type="text"
                                      className="w-full p-2 border border-gray-300 rounded-md"
                                      onChange={textHandler}
                                      placeholder="Enter text here"
                                    />
                                  </div>

                                  <div className="">
                                    <label htmlFor="select image">
                                      Font Size:
                                    </label>
                                    <input
                                      type="number"
                                      value={currentComponent.fontSize}
                                      className="w-full p-2 border border-gray-300 rounded-md"
                                      min={10}
                                      onChange={fontSizeHandler}
                                    />
                                  </div>

                                  <div className="">
                                    <label htmlFor="select image">
                                      Font Weight:
                                    </label>
                                    <select
                                      onChange={fontweightHandler}
                                      className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                      <option value="normal">Normal</option>
                                      <option value="bold">Bold</option>
                                      <option value="bolder">Bolder</option>
                                      <option value="lighter">Lighter</option>
                                    </select>
                                  </div>
                                </div>
                              )}
                          </>
                        );

                      case "project":
                        return <Project />;
                      case "initImage":
                        return (
                          <div className="h-[85vh] overflow-auto ">
                            <Image add_image={add_image} />
                          </div>
                        );
                      case "background":
                        return (
                          <div className="h-[85vh] overflow-auto ">
                            <div className="grid grid-cols-2 gap-2 h-full">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(
                                (item, index) => (
                                  <div
                                    key={index}
                                    className=" w-full  rounded-sm cursor-pointer"
                                    onClick={() => setImage("tshirt.jpeg")}
                                  >
                                    <img
                                      src="tshirt.jpeg"
                                      alt=""
                                      className="h-[150px]"
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        );
                      default:
                        return null;
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
          {/* description end */}

          {/* right side bar */}
          <div className="w-full h-full flex justify-center">
            <div
              className={`flex justify-center relative items-center h-full ${
                currentComponent
                  ? "w-full"
                  : "w-[cal(100%-250px)] overflow-hidden"
              }`}
            >
              <div className="m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden">
                <div
                  id="main_designe"
                  className="w-auto relative h-auto overflow-hidden"
                >
                  {component.map((item, index) => (
                    <CustomDesigne
                      key={index}
                      info={item}
                      currentComponent={currentComponent}
                      removeComponent={() => deleteElement(item.id)}
                      color={color} // Passing color state down to CustomDesigne
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Conditional rendering for color picker and remove background button */}
            {currentComponent && (
              <div className="h-[1000px] w-[250px] text-gray bg-graydark flex flex-col gap-2 p-2">
                <div className="flex flex-col">
                  <label htmlFor="select colour">Select color</label>
                  <input
                    type="color"
                    value={color}
                    onChange={handleColorChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                {/* add image to back ground */}
                {currentComponent.name === "main_frame" && (
                  <div className="flex flex-col">
                    <label htmlFor="select image">Select Image</label>
                    <input
                      type="file"
                      onChange={(e) =>
                        setImage(URL.createObjectURL(e.target.files[0]))
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                )}
                {/* remove background of main frame */}
                {currentComponent.name === "main_frame" && image && (
                  <button
                    className="bg-primary text-white py-3 mt-5"
                    onClick={removeBackground}
                  >
                    Remove Background
                  </button>
                )}

                {/* change opacity */}
                {currentComponent.name !== "main_frame" && (
                  <div className="flex flex-col gap-2">
                    <div className="">
                      <label htmlFor="select image">Opacity :</label>
                      <input
                        type="number"
                        step={0.1}
                        min={0.1}
                        max={1}
                        value={currentComponent.opacity}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={opacityHandler}
                      />
                    </div>

                    {/* z-index */}
                    <div>
                      <label htmlFor="select image">Z-index :</label>
                      <input
                        type="number"
                        value={currentComponent.z_index}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={setZIndex}
                      />
                    </div>

                    {/* width */}
                    <div>
                      <label htmlFor="select image">Width :</label>
                      <input
                        type="number"
                        value={currentComponent.width}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={widthHandler}
                      />
                    </div>
                    {/* height */}
                    {currentComponent.type !== "circle" && (
                      <div className="">
                        <label htmlFor="select image">
                          Height : {currentComponent.type}
                        </label>
                        <input
                          type="number"
                          value={currentComponent.height}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          onChange={heightHandler}
                        />
                      </div>
                    )}

                    {/* border radious */}
                    {currentComponent.type === "image" && (
                      <div>
                        <label htmlFor="select image">Border Radius :</label>
                        <input
                          type="number"
                          value={currentComponent.radius}
                          max={100}
                          min={0}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          onChange={borderHandler}
                        />
                      </div>
                    )}

                    {/* rotate */}
                    <div>
                      <label htmlFor="select image">Rotate :</label>
                      <input
                        type="number"
                        max={180}
                        min={-180}
                        value={currentComponent.rotate}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={rotateHandler}
                      />
                    </div>

                    {/* x asis */}
                    <div className="">
                      <label htmlFor="select image"> X asis :</label>
                      <input
                        type="number"
                        value={currentComponent.left}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={xAsisHandler}
                      />
                    </div>

                    {/* y asis */}
                    <div className="">
                      <label htmlFor="select image"> Y asis :</label>
                      <input
                        type="number"
                        value={currentComponent.top}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={yAsisHandler}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* main content end */}
    </div>
  );
}

function Header() {
  return (
    <div className="flex justify-between px-7">
      <div>
        <button className="p-2 px-4 m-2">Back</button>
      </div>
      <div>
        <button className="p-2 px-4 m-2 bg-primary text-white">Save</button>
      </div>
    </div>
  );
}
