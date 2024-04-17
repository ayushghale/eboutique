import React, { useState, useEffect } from "react";

import api from "../../../utils/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import adminApi from "../../../services/admin/adminApi.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function DisplayCategory() {
  const navigator = useNavigate();

  const [category, setCategory] = useState([]);

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
  const updateStatus = async (id) => {
    try {
      const response = await adminApi.get(`admin/category/updateStatus/${id}`);
      if (response) {
        toast.success("category status updated successfully");
        categoryFetch();
      } else {
        toast.error("Failed to update category status");
      }
    } catch (error) {
      console.error("Error updating category status:", error.message);
    }
  };

  const editCategory = (id) => {
    navigator(`/admin/Category/edit/${id}`);
  };

  useEffect(() => {
    categoryFetch();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="flex items-center justify-between mb-5.5">
          <h3 className="text-title-sm font-bold text-black dark:text-white">
            Display Category
          </h3>
          <div className="flex items-center gap-3">
            <a
              href="/admin/Category/add"
              className="btn bg-primary p-3 rounded-md hover:bg-primary-dark text-white"
            >
              Add Category
            </a>
          </div>
        </div>

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white ">
                S.No
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white ">
                Name
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
            {category.map((item) => (
              <tr>
                {/* image */}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                  <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                    {item.id}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.name}
                  </h5>
                </td>

                {/* image */}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div
                    className="flex flex-row gap-2 w-25 overflow-x-auto"
                    style={{
                      scrollbarColor: "#d4d4d4 #f3f4f6",
                    }}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-20"
                      key={item.id}
                    />
                  </div>
                </td>
                {/* status  */}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <button
                    className={`inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      item.status === "active"
                        ? "text-success"
                        : "text-red-500 dark:text-red-500"
                    } border border-opacity-10 rounded-full dark:border-strokedark dark:text-white dark:bg-meta-4 dark:hover:bg-opacity-10 dark:hover:text-primary hover:bg-opacity-10 hover:text-primary`}
                    onClick={() => updateStatus(item.id)}
                  >
                    {item.status}
                  </button>
                </td>

                {/* action */}
                <td className="border-b border-[#eee] px-4 py-5   dark:border-strokedark">
                  <div className="flex items-center space-x-3.5 gap-2 ">
                    <button
                      className="hover:text-primary"
                      onClick={() => editCategory(item.id)}
                    >
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
