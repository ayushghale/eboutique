import React, { useState, useEffect } from "react";
import adminApi from "../../../services/admin/adminApi";

export default function BestWorseProduct() {
  const [selctedData, setSelectedData] = useState("Best");
  const [productSoldData, setProductSoldData] = useState([]);

  useEffect(() => {
    // Call changeData with the default value of "Day" when component mounts
    changeData("Best");
  }, []);

  const changeData = (e) => {
    if (e === "Best") {
      setSelectedData("Best");
      const fetchDailySales = async () => {
        try {
          const response = await adminApi.get("admin/report/getHighestProducts");
          if (response.success) {
            setProductSoldData(response.data);
          } else {
            console.error("Failed to fetch category:", response.message);
          }
        } catch (error) {
          console.error("Error fetching category:", error.message);
        }
      };
      fetchDailySales();
    } else if (e === "Worse") {
      setSelectedData("Worse");
      const fetchDailySales = async () => {
        try {
          const response = await adminApi.get("admin/report/getLowestProducts");
          if (response.success) {
            setProductSoldData(response.data);
          } else {
            console.error("Failed to fetch category:", response.message);
          }
        } catch (error) {
          console.error("Error fetching category:", error.message);
        }
      };
      fetchDailySales();
    }
  };

  return (
    <div className=" rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <div className="w-full  dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              <p className="font-semibold ">Product report</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              onClick={(e) => changeData("Best")}
              className={`rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                selctedData === "Best" ? "bg-white shadow-card" : ""
              }`}
            >
              Best
            </button>
            <button
              onClick={(e) => changeData("Worse")}
              className={`rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                selctedData === "Worse" ? "bg-white shadow-card" : ""
              }`}
            >
              Worse
            </button>
          </div>
        </div>
      </div>
      <div className="chart-container mt-5">
        {/* Adjust height as needed */}
        <div id="chartOne" className="">
          <div className="flex justify-center">
            <div className="w-full">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                      S.No
                    </th>
                    <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                      Name
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Quantity Sold
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productSoldData.map((item, index) => (
                    <tr key={index}>
                      {" "}
                      {/* Add a unique key */}
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium">
                          {index + 1} {/* Serial number */}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <h5 className="font-medium text-black dark:text-white">
                          {item.productName}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium">
                          {item.totalQuantity}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium">
                          Rs. {item.productPrice * item.totalQuantity}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
