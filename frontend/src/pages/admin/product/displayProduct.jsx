import React, { useState, useEffect } from "react";
import api from "../../../utils/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DisplayProduct() {
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

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="flex items-center justify-between mb-5.5">
          <h3 className="text-title-sm font-bold text-black dark:text-white">
            Display Product
          </h3>
          <div className="flex items-center gap-3">
            <button className="btn bg-primary p-3 rounded-md hover:bg-primary-dark text-white">
              Add Product
            </button>
          </div>
        </div>

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white ">
                S.No
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white ">
                Category
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white ">
                Name
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white ">
                Price
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Image
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {product.map((product) => (
              <tr>
                {/* image */}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                  <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                    {product.id}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {product.Category.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {product.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {product.price}
                  </h5>
                </td>

                {/* image */}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex flex-row gap-2 w-25 overflow-x-auto" 
                  style={{
                    scrollbarColor: '#d4d4d4 #f3f4f6',
                  }}>
                    {product.Images.map((image) => (
                      <img
                        src={image.url}
                        alt=""
                        className="w-20"
                        key={image.id}
                      />
                    ))}
                  </div>
                </td>
                {/* status  */}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <button
                    className={`inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      product.status === "active"
                        ? "text-success"
                        : "text-red-500 dark:text-red-500"
                    } border border-opacity-10 rounded-full dark:border-strokedark dark:text-white dark:bg-meta-4 dark:hover:bg-opacity-10 dark:hover:text-primary hover:bg-opacity-10 hover:text-primary`}
                  >
                    {product.status}
                  </button>
                </td>

                {/* action */}
                <td className="border-b border-[#eee] px-4 py-5   dark:border-strokedark">
                  <div className="flex items-center space-x-3.5 gap-2 ">
                    <button className="hover:text-primary">
                    <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="hover:text-primary">
                    <FontAwesomeIcon icon={faPenToSquare} />
                    </button>

                    <button className="hover:text-primary">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
