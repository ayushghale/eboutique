import React, { useState, useRef } from "react";
import {  toast } from "react-toastify";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [selectedValue, setSelectedValue] = useState("1");

  const inputRef = useRef(null);

 

  const handleImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
  };

  // Event handler for the price input
  const handlePriceChange = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setPrice(numericValue);
  };

  // Event handler for the select change
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Event handler for the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("button is clicked");

    // Prepare the data to be sent to the API using FormData
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("categoryId", selectedValue); // Append the category value
    formData.append("image", image);

    console.log(selectedValue);
    console.log(formData);
    // return;

    try {
      // Send a POST request to the API
      const response = await fetch(
        "http://localhost:8080/api/product/addProduct",
        {
          method: "POST",
          body: formData,
        }
      );

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log("Product added successfully");
        toast("Product added successfully");

        clearForm();
        // Add any additional logic or redirect as needed
      } else {
        console.error("Failed to add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending request:", error.message);
    }
  };
  const clearForm = () => {
    setProductName("");
    setPrice("");
    setDescription("");
    setImage("");
  };

  return (
    <main>
      

      {/* <!-- Main Section Start --> */}

      <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div class="mx-auto max-w-270">
          {/* <!-- Breadcrumb Start --> */}
          <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 class="text-title-md2 font-bold text-black dark:text-white">
              Add Product Page
            </h2>

            <nav>
              <ol class="flex items-center gap-2">
                <li>
                  <a class="font-medium" href="/dashboard">
                    Dashboard /
                  </a>
                </li>
                <li class="font-medium text-primary">Product</li>/
                <li class="font-medium text-primary">Add</li>
              </ol>
            </nav>
          </div>
          {/* <!-- Breadcrumb End --> */}

          {/* <!-- ====== Settings Section Start --> */}
          <div class="grid grid-cols-5 gap-8">
            <div class="col-span-5 xl:col-span-5">
              <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div class="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 class="font-medium text-black dark:text-white">
                    Category type
                  </h3>
                </div>
                {/* Category */}
                <div class="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <form action="#">
                    <div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      {/*  */}
                      <div class="w-full sm:w-1/2">
                        <label
                          class="mb-3 block text-sm font-medium text-black dark:text-white"
                          for="fullName"
                        >
                          Category
                        </label>
                        <div>
                          <div
                            x-data="{ isOptionSelected: false }"
                            class="relative z-20 bg-white dark:bg-form-input text-black dark:text-white"
                          >
                            <select
                              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                              onChange={handleSelectChange} // Attach the event handler
                              value={selectedValue} // Set the value attribute to control the select element
                            >
                              <option value="1" className="text-body dark:text-white">
                                Option 1
                              </option>
                              <option value="2" className="text-body">
                                Option 2
                              </option>
                              <option value="3" className="text-body">
                                Option 3
                              </option>
                            </select>
                            <span class="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g opacity="0.8">
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                    fill="#637381"
                                  ></path>
                                </g>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div class="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 class="font-medium text-black dark:text-white">
                    Add Product
                  </h3>
                </div>
                {/* product details */}
                <div class="p-7 ">
                  <form action="#" onSubmit={handleSubmit}>
                    {/* name price input */}
                    <div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div class="w-full sm:w-1/2">
                        <label
                          class="mb-3 block text-sm font-medium text-black dark:text-white"
                          for="productName"
                        >
                          Product Name
                        </label>
                        <div class="relative">
                          <input
                            class="w-full rounded border border-stroke  py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="w-full sm:w-1/2">
                        <label
                          class="mb-3 block text-sm font-medium text-black dark:text-white"
                          for="price"
                        >
                          Price
                        </label>
                        <input
                          class="w-full rounded border border-stroke px-4.5 py-3 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="price"
                          id="price"
                          placeholder="Product Price"
                          value={price}
                          onInput={handlePriceChange}
                          // autoComplete='off'
                        />
                      </div>
                    </div>
                    {/* Description */}
                    <div class="mb-5.5">
                      <label
                        class="mb-3 block text-sm font-medium text-black dark:text-white"
                        for="description"
                      >
                        Description
                      </label>
                      <div class="relative">
                        <textarea
                          class="w-full rounded border border-stroke  py-3 pl-4.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          name="bio"
                          id="bio"
                          rows="6"
                          placeholder="Write your bio here"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Pellentesque posuere fermentum urna, eu
                          condimentum mauris tempus ut. Donec fermentum blandit
                          aliquet.
                        </textarea>
                      </div>
                    </div>
                    {/* image  */}
                    <div
                      id="FileUpload"
                      class="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                    >
                      {image && (
                        <div>
                          <button
                            onClick={() => setImage("")}
                            className=" absolute font-bold text-2xl text-white bg-red-500 p-2 rounded right-0 mt-3 mr-7 z-99"
                          >
                            Remove
                          </button>
                          <img
                            src={URL.createObjectURL(image)}
                            alt="product"
                            class="w-full h-[500px] object-cover rounded pb-5 z-1"
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none bg-transparent"
                        onChange={handleImageChange}
                        ref={inputRef}
                      />
                      <div class="flex flex-col items-center justify-center space-y-3 text-black dark:text-white">
                        <span class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                              fill="#3C50E0"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                              fill="#3C50E0"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                              fill="#3C50E0"
                            />
                          </svg>
                        </span>
                        <p class="text-sm font-medium">
                          <span class="">Click to upload </span>
                           or drag and drop
                        </p>
                        <p class="mt-1.5 text-sm font-medium">
                         PNG & JPG 
                        </p>
                        <p class="text-sm font-medium">(max, 800 X 800px)</p>
                      </div>
                    </div>
                    {/* save button */}
                    <div class="flex justify-end gap-4.5">
                      <button
                        class="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="submit"
                      >
                        Cancel
                      </button>
                      <button
                        class="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- ====== Settings Section End --> */}
        </div>
      </div>
    </main>
  );
}
