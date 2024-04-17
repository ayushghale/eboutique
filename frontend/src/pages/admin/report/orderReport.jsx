import React, { useState, useEffect } from "react";
import adminApi from "../../../services/admin/adminApi";
import Cahrt1 from "../../../component/admin/report/chart1";
import Cahrt2 from "../../../component/admin/report/chart2";

export default function Dashboard() {
  const [selctedData, setSelectedData] = useState("Best");

  const [productSoldData, setProductSoldData] = useState([]);

  useEffect(() => {
    // Call changeData with the default value of "Day" when component mounts
    changeData("Best");
  }, []);

  const changeData = (e) => {
    if (e === "Best") {
      setSelectedData("Best");
      const data = [
        {
          id: 1,
          name: " t-shirt",
          quantity: 50,
          revenue: "Rs. 5000",
        },
        {
          id: 2,
          name: "shirt",
          quantity: 45,
          revenue: "Rs. 4500",
        },
        {
          id: 3,
          name: "jeans",
          quantity: 40,
          revenue: "Rs. 4000",
        },
        {
          id: 4,
          name: "shoes",
          quantity: 35,
          revenue: "Rs. 3500",
        },
        {
          id: 5,
          name: "watch",
          quantity: 30,
          revenue: "Rs. 3000",
        },
      ];
      setProductSoldData(data);
    } else if (e === "Worse") {
      setSelectedData("Worse");
      const data = [
        {
          id: 1,
          name: " t-shirt",
          quantity: 10,
          revenue: "Rs. 1000",
        },
        {
          id: 2,
          name: "shirt",
          quantity: 15,
          revenue: "Rs. 1500",
        },
        {
          id: 3,
          name: "jeans",
          quantity: 20,
          revenue: "Rs. 2000",
        },
        {
          id: 4,
          name: "shoes",
          quantity: 25,
          revenue: "Rs. 2500",
        },
        {
          id: 5,
          name: "watch",
          quantity: 30,
          revenue: "Rs. 3000",
        },
      ];

      setProductSoldData(data);
    }
  };

  return (
    <main>
      <div className="">
        <div className="flex items-center justify-between pt-10 px-10 bg-white dark:bg-boxdark dark:text-white">
          <h1 className="text-2xl font-semibold">Order Report</h1>
        </div>
      </div>
      <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 ">
        <div class="">
          <Cahrt1 />
        </div>

        <div className="grid grid-cols-12 gap-5 mt-5">
          <div className=" col-span-4">
            <Cahrt2 />
          </div>
          <div className="col-span-8">
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
                            <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white ">
                              S.No
                            </th>
                            <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white ">
                              Name
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                              Quantity Sold
                            </th>
                            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                              Revnue
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {productSoldData.map((item) => (
                            <tr>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                                <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium ">
                                  {item.id}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                                <h5 className="font-medium text-black dark:text-white">
                                  {item.name}
                                </h5>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                                <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium ">
                                  {item.quantity}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                                <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium ">
                                  Rs. {item.revenue}
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
          </div>
        </div>
      </div>
    </main>
  );
}
