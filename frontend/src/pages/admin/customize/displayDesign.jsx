import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import api from "../../../utils/api.js";
import { DeleteConfirmation } from "../../../component/utils/message.jsx";
import { useParams,useNavigate } from "react-router-dom";

export default function DisplayDesign() {
  const navigator = useNavigate();
  const [design, setDesign] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // State variable to store the ID of the design to be deleted

  const designFetch = async () => {
    try {
      const response = await api.get("admin/design/all");
      if (response.success) {
        setDesign(response.data);
      } else {
        console.error("Failed to fetch design:", response.message);
      }
    } catch (error) {
      console.error("Error fetching design:", error.message);
    }
  };

  useEffect(() => {
    designFetch();
  }, []);

  const deleteDesign = (id) => {
    setDeleteId(id); // Set the ID of the design to be deleted
  };

  const confirmDelete = async (id) => {
    if (!id) {
      console.error("Design ID not provided for deletion");
      return;
    }

    try {
      // Perform deletion logic
      // Example:
      // const response = await api.delete(`admin/design/delete/${id}`);
      // Handle response
      console.log("Design deleted successfully");
      designFetch();
    } catch (error) {
      console.error("Error deleting design:", error.message);
    }

    setDeleteId(null); // Reset the delete ID after deletion
  };

  const editDesign = (id) => {
    // Navigate to the edit route with the provided ID
    console.log("Navigate to edit route for design:", id);
    // Example:
    navigator(`/admin/design/edit/${id}`);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="flex items-center justify-between mb-5.5">
          <h3 className="text-title-sm font-bold text-black dark:text-white">
            Display Design
          </h3>
          <div className="flex items-center gap-3">
            <a
              href="/admin/Category/add"
              className="btn bg-primary p-3 rounded-md hover:bg-primary-dark text-white"
            >
              Add Design
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
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white ">
                price
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
            {design.map((item) => (
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
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.price}
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
                  >
                    {item.status}
                  </button>
                </td>

                {/* action */}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5 gap-2 ">
                    <button
                      className="hover:text-primary"
                      onClick={() => editDesign(item.id)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>

                    <button
                      className="hover:text-primary"
                      onClick={() => deleteDesign(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         {/* Delete confirmation dialog */}
      {deleteId && (
        <DeleteConfirmation
          id={deleteId}
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
      </div>
    </div>
  );
}
