import React, { useState, useEffect } from "react";
import adminApi from "../../../services/admin/adminApi.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { DeleteConfirmation } from "../../../component/utils/message.jsx";
import { useNavigate } from "react-router-dom";

export default function DisplayBorder() {
  const navigator = useNavigate();
  const [border, setBorder] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // State variable to store the ID of the border to be deleted

  const borderFetch = async () => {
    try {
      const response = await adminApi.get("admin/border/all");
      if (response.success) {
        setBorder(response.data);
      } else {
        console.error("Failed to fetch border:", response.message);
      }
    } catch (error) {
      console.error("Error fetching border:", error.message);
    }
  };

  const updateStatus = async (id) => {
    try {
      const response = await adminApi.get(`admin/border/updateStatus/${id}`);
      if (response) {
        borderFetch();
        toast.success("Border status updated successfully");
      } else {
        toast.error("Failed to update border status");
      }
    } catch (error) {
      console.error("Error updating border status:", error.message);
    }
  };

  const deleteBorder = (id) => {
    setDeleteId(id); // Set the ID of the border to be deleted
  };

  const confirmDelete = async (id) => {
    if (!id) {
      toast.error("Border needs to be selected for deletion");
      return;
    }
    try {
      const response = await adminApi.delete(`admin/border/delete/${id}`);
      if (response) {
        toast.success("Border deleted successfully");
        borderFetch();
      } else {
        toast.error("Failed to delete border");
      }
    } catch (error) {
      console.error("Error deleting border:", error.message);
    }

    setDeleteId(null); // Reset the delete ID after deletion
  };

  const editBorder = (id) => {
    navigator(`/admin/border/edit/${id}`);
  };

  useEffect(() => {
    borderFetch();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="flex items-center justify-between mb-5.5">
          <h3 className="text-title-sm font-bold text-black dark:text-white">
            Display Border
          </h3>
          <div className="flex items-center gap-3">
            <a
              href="/admin/border/add"
              className="btn bg-primary p-3 rounded-md hover:bg-primary-dark text-white"
            >
              Add Border
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
            {border.map((item) => (
              <tr key={item.id}>
                {/* image */}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                  <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium">
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
                    <img src={item.image} alt="" className="w-20" />
                  </div>
                </td>
                {/* status  */}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <button
                    onClick={() => updateStatus(item.id)}
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
                <td className="border-b border-[#eee] px-4 py-5   dark:border-strokedark">
                  <div className="flex items-center space-x-3.5 gap-2 ">
                    <button className="hover:text-primary"
                      onClick={() => editBorder(item.id)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>

                    <button
                      className="hover:text-primary"
                      onClick={() => deleteBorder(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteId && (
        <DeleteConfirmation
          id={deleteId}
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
