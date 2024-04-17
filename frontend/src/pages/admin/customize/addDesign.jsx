import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import adminApi from "../../../services/admin/adminApi.js";
import { useParams, useNavigate } from "react-router-dom";

export default function AddDesign() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [editDesignID, setEditDesignID] = useState(id);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [editImage, setEditImage] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  console.log(id);

  //
  // Reference to the file input element
  const inputRef = useRef(null);

  // handle image change
  const handleImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setImage(file);
  };

  // handle price change
  const handlePriceChange = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setPrice(numericValue);
  };

  // check if the fields are empty
  const checkEmpty = () => {
    if (name === "") {
      toast.error("Please fill name the fields");
      return false;
    }
    if (price === "") {
      toast.error("Please fill description the fields");
      return false;
    }

    if (!editImage && !image) {
      toast.error("Please select an image");
      return false;
    }

    if (!editDesignID) {
      if (!image) {
        toast.error("Please select an image");
        return false;
      }
    }

    return true;
  };

  // Event handler for the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!checkEmpty()) {
      toast.error("Please fill all the fields");
      return;
    }

    // Prepare the data to be sent to the API using FormData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    setIsOpen(true);
    try {
      // Send a POST request to the API using the FormData object
      const response = await adminApi.post("admin/design/add", formData);

      setIsOpen(false);
      // Check if the request was successful (status code 2xx)
      if (response.success === true) {
        toast("Design added successfully");
        clearForm();
        // Add any additional logic or redirect as needed
      } else {
        toast.error("Failed to add design:", response);
      }
    } catch (error) {
      toast.error("Error sending request:", error.message);
      setIsOpen(false);
    }
  };

  // edit design
  const getDesign = async () => {
    try {
      const response = await adminApi.get(`admin/design/${editDesignID}`);
      console.log(response);
      if (response) {
        setName(response.data.name);
        setPrice(response.data.price);
        setEditImage(response.data.image);
      } else {
        toast.error("Failed to fetch design");
      }
    } catch (error) {
      toast.error("Error fetching design:", error.message);
    }
  };

  const removeEditImage = () => {
    setEditImage("");
  };

  const updateDesign = async () => {
    if (!checkEmpty()) {
      toast.error("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    setIsOpen(true);
    try {
      const response = await adminApi.post(
        `admin/design/update/${editDesignID}`,
        formData
      );
      setIsOpen(false);
      if (response.success === true) {
        toast("Design updated successfully");
        clearForm();
        navigate("/admin/design/display");
      } else {
        toast.error("Failed to update Design:", response);
      }
    } catch (error) {
      toast.error("Error sending request:", error.message);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (editDesignID) {
      getDesign();
    }
  }, [editDesignID]);

  // Clear the form fields
  const clearForm = () => {
    setName("");
    setPrice("");
    setImage("");
  };

  return (
    <>
      {isOpen && lodingScreen()}

      <main>
        {/* <!-- Main Section Start --> */}

        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div className="mx-auto max-w-[80rem]">
            {/* <!-- Breadcrumb Start --> */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-title-md2 font-bold text-black dark:text-white">
                {editDesignID ? "Edit " : "Add "}Design
              </h2>

              <nav>
                <ol className="flex items-center gap-2">
                  <li>
                    <a className="font-medium" href="/dashboard">
                      Dashboard /
                    </a>
                  </li>
                  <li className="font-medium text-primary">Design</li>/
                  <li className="font-medium text-primary">
                    {editDesignID ? "Edit" : "Add"}
                  </li>
                </ol>
              </nav>
            </div>
            {/* <!-- Breadcrumb End --> */}

            {/* <!-- ====== Settings Section Start --> */}
            <div className="grid grid-cols-3  gap-8">
              <div className=" col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-7 py-4 bg-strokedark">
                    <h3 className="font-medium text-white">
                      {editDesignID ? "Edit " : "Add "}Design
                    </h3>
                  </div>
                  {/* design details */}
                  <div className=" flex flex-row p-7 gap-10">
                    <div className="w-4/5  ">
                      <form action="#">
                        {/* name price input */}
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              for="name"
                            >
                              Design Name
                            </label>
                            <div className="relative">
                              <input
                                className="w-full rounded border border-stroke bg-white  py-3 px-4.5 font-medium text-black focus:border-strokedark focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-white"
                                type="text"
                                placeholder="Design Name"
                                value={name}
                               
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              for="name"
                            >
                              Design price
                            </label>
                            <div className="relative">
                              <input
                                className="w-full rounded border border-stroke bg-white  py-3 px-4.5 font-medium text-black focus:border-strokedark focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-white"
                                type="text"
                                placeholder="Design price"
                                value={price}
                                onChange={handlePriceChange}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className=" w-1/5 max-h-[80vh]  flex items-end">
                      <div className=" w-full h-full">
                        {/* image  */}
                        {image && (
                          <div
                            id="FileUpload"
                            className="relative  block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray  dark:bg-meta-4 "
                          >
                            <div>
                              <button
                                onClick={() => setImage("")}
                                className=" absolute font-bold text-xl text-white bg-red-500 p-2 rounded right-0 mt-1 mr-1 z-99"
                              >
                                Remove
                              </button>
                              <img
                                src={URL.createObjectURL(image)}
                                alt="design"
                                className="  object-cover rounded z-1"
                              />
                            </div>
                          </div>
                        )}

                        {!image && editImage && (
                          <div
                            id="FileUpload"
                            className="relative  block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray  dark:bg-meta-4 "
                          >
                            <div>
                              <button
                                onClick={removeEditImage}
                                className=" absolute font-bold text-xl text-white bg-red-500 p-2 rounded right-0 mt-1 mr-1 z-99"
                              >
                                Remove
                              </button>
                              <img
                                src={editImage}
                                alt="design"
                                className="  object-cover rounded z-1"
                              />
                            </div>
                          </div>
                        )}

                        {!image && !editImage && (
                          <div className=" h-full bottom-0">
                            <div
                              id="FileUpload"
                              className="relative   block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                            >
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none bg-transparent"
                                onChange={handleImageChange}
                                ref={inputRef}
                              />
                              <div className="flex flex-col items-center justify-center space-y-3 text-black dark:text-white">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    {/* Your SVG path here */}
                                  </svg>
                                </span>
                                <p className="text-sm font-medium">
                                  Click to upload
                                </p>
                                <p className="mt-1.5 text-sm font-medium">
                                  PNG & JPG
                                </p>
                                <p className="text-sm font-medium">
                                  (max, 800 X 800px)
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        {/* save button */}
                      </div>
                    </div>
                  </div>
                  <div className=" p-7  ">
                    <div className="flex justify-between gap-4.5">
                      <button
                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90"
                        type="submit"
                        onClick={
                          editDesignID ? updateDesign : handleSubmit
                        }
                      >
                        Save
                      </button>
                      <button
                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="submit"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- ====== Settings Section End --> */}
          </div>
        </div>
      </main>
    </>
  );
}

function lodingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white p-5 rounded-md w-[250px]">
        <div className=" w-[200px] aspect-square">
          <img src="/svg/Loader.gif" alt="GIF" />
        </div>
        <div className="text-center">Please wait while data is being added</div>
      </div>
    </div>
  );
}