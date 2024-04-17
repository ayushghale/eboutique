import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import adminApi from "../../../services/admin/adminApi";

export default function AddCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editCategoryId, setEditCategoryId] = useState(id);
  const [editImage, setEditImage] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setImage(file);
  };

  const checkEmpty = () => {
    if (name === "") {
      toast.error("Please fill name the fields");
      return false;
    }
    if (description === "") {
      toast.error("Please fill description the fields");
      return false;
    }
    if (!editImage && !image) {
      toast.error("Please select an image");
      return false;
    }

    if (!editCategoryId) {
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
    // openModal();
    if (!checkEmpty()) {
      toast.error("Please fill all the fields");
      return;
    }

    // Prepare the data to be sent to the API using FormData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description); // Append the category value
    formData.append("image", image);

    // return;

    try {
      setIsOpen(true);
      // Send a POST request to the API using the FormData object
      const response = await api.post("category/add", formData);
      setIsOpen(false);
      // Check if the request was successful (status code 2xx)
      if (response) {
        toast("category added successfully");
        clearForm();
        // Add any additional logic or redirect as needed
      } else {
        toast.error("Failed to add category:", response);
      }
    } catch (error) {
      toast.error("Error sending request:", error.message);
    }
  };

  // fech category by id
  const fetchCategoryById = async () => {
    try {
      const response = await adminApi.get(`admin/category/${editCategoryId}`);

      if (response.success === true) {
        setName(response.data.name);
        setDescription(response.data.description);
        setEditImage(response.data.image);
      } else {
        toast.error("Failed to fetch category:", response.message);
      }
    } catch (error) {
      toast.error("Error sending request:", error.message);
    }
  };

  const updateCategory = async () => {
    if (!checkEmpty()) {
      toast.error("Please fill all the fields");
      return;
    }

    // Prepare the data to be sent to the API using FormData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description); // Append the category value
    formData.append("image", image);

    try {
      setIsOpen(true);

      // Send a POST request to the API using the FormData object
      const response = await adminApi.post(
        `admin/category/update/${editCategoryId}`,
        formData
      );
      // Check if the request was successful (status code 2xx)
      if (response.success === true) {
        toast("category updated successfully");
        setIsOpen(false);

        clearForm();
        navigate("/admin/Category/display");
      }
    } catch (error) {
      setIsOpen(false);

      toast.error("Error sending request:", error.message);
    }
    setIsOpen(false);
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setImage("");
  };
  const removeEditImage = () => {
    setEditImage("");
  };

  useEffect(() => {
    if (editCategoryId) {
      fetchCategoryById();
    }
  }, [editCategoryId]);

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
                {editCategoryId ? "Edit " : "Add "} Category
              </h2>

              <nav>
                <ol className="flex items-center gap-2">
                  <li>
                    <a className="font-medium" href="/dashboard">
                      Dashboard /
                    </a>
                  </li>
                  <li className="font-medium text-primary">Category</li>/
                  <li className="font-medium text-primary">
                    {editCategoryId ? "Edit " : "Add "}
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
                      {editCategoryId ? "Edit " : "Add "} Category
                    </h3>
                  </div>
                  {/* category details */}
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
                              Category Name
                            </label>
                            <div className="relative">
                              <input
                                className="w-full rounded border border-stroke bg-white  py-3 px-4.5 font-medium text-black focus:border-strokedark focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-white"
                                type="text"
                                placeholder="Category Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Description */}
                        <div className="mb-5.5">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            for="description"
                          >
                            Description
                          </label>
                          <div className="relative">
                            <textarea
                              className="w-full rounded border border-stroke bg-white  py-3 px-4.5 font-medium text-black focus:border-strokedark focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-white"
                              name="bio"
                              id="bio"
                              rows="6"
                              placeholder="write something about category"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
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
                                alt="category"
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
                                alt="border"
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
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                      fill="#3C50E0"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                      fill="#3C50E0"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                      fill="#3C50E0"
                                    />
                                  </svg>
                                </span>
                                <p className="text-sm font-medium">
                                  <span className="">Click to upload </span>
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
                        onClick={editCategoryId ? updateCategory : handleSubmit}
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
