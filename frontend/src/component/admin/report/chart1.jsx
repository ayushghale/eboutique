import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import adminApi from "../../../services/admin/adminApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart1() {
  const [selectedData, setSelectedData] = useState("Week");
  const [salesLineGraphData, setSalesLineGraphData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [lineChartDataSet, setLineChartDataSet] = useState([]);

  useEffect(() => {
    // Call changeData with the default value of "Week" when component mounts
    changeData("Week");
  }, []);

  const fetchData = async (endpoint) => {
    try {
      const response = await adminApi.get(endpoint);
      if (response.success) {
        return response.data;
      } else {
        console.error("Failed to fetch data:", response.message);
        return [];
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return [];
    }
  };

  const changeData = async (e) => {
    setSelectedData(e);
    clearData();

    let endpoint = "";
    switch (e) {
      case "Week":
        endpoint = "admin/report/getDailySales";
        break;
      case "Month":
        endpoint = "admin/report/getMonthlySales";
        break;
      case "Year":
        endpoint = "admin/report/getYearlySales";
        break;
      default:
        break;
    }

    if (endpoint) {
      const salesData = await fetchData(endpoint);
      const data = [
        {
          label: `${e} sales report`,
          data: salesData.map((item) => item.total),
          borderColor: "rgba(60, 60, 60, 7)",
          backgroundColor: "rgba(60, 60, 60, 7)",
        },
      ];

      setLabels(salesData.map((item) => item.date));
      setLineChartDataSet(data);
    }
  };

  const clearData = () => {
    setSalesLineGraphData([]);
    setLabels([]);
    setLineChartDataSet([]);
  };

  const lineChartData = {
    labels: labels,
    datasets: lineChartDataSet,
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 15000,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <>
      <div className=" rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
          <div className="flex w-full flex-wrap gap-3 sm:gap-5">
            <div className="flex min-w-47.5">
              <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
              </span>
              <div className="w-full  dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
                <p className="font-semibold ">Sales Report</p>
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-45 justify-end">
            <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
              <button
                onClick={(e) => changeData("Week")}
                className={`rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                  selectedData === "Week" ? "bg-white shadow-card" : ""
                }`}
              >
                Week 
              </button>
              <button
                onClick={(e) => changeData("Month")}
                className={`rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                  selectedData === "Month" ? "bg-white shadow-card" : ""
                }`}
              >
                Month
              </button>
              <button
                onClick={(e) => changeData("Year")}
                className={`rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                  selectedData === "Year" ? "bg-white shadow-card" : ""
                }`}
              >
                Year
              </button>
            </div>
          </div>
        </div>
        <div className="chart-container">
          {/* Adjust height as needed */}
          <div id="chartOne" className="">
            <div className="flex justify-center">
              <div className="w-full">
                <Line
                  data={lineChartData}
                  options={options}
                  style={{
                    height: "400px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
