import React, { useState,useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement, // Import ArcElement for Pie charts
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  // PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart3() {
  const [chartdata, setChartData] = useState("Day");
  const [selctedData, setSelectedData] = useState("Day");

  const [labels, setLabels] = useState([]);
  const [linerChartDataSet, setLinerChartDataSet] = useState([]);

  useEffect(() => {
    // Call changeData with the default value of "Day" when component mounts
    changeData("Day");
  }, []); 

  const changeData = (e) => {
    if (e === "Day") {
      setSelectedData("Day");
      const data = [
        {
          label: "My First Dataset",
          data: [65, 59],
          backgroundColor: ["rgba(60, 60, 60, 7)", "rgba(60, 179, 113, 7)"],
        },
      ];
      setLabels(["Cash in Delivery", "E-sewa"]);

      setLinerChartDataSet(data);
    } else if (e === "Week") {
      setSelectedData("Week");
      setLabels(["Cash in Delivery", "E-sewa"]);
      const data = [
        {
          data: [30, 70],
          borderColor: "rgba(60, 60, 60, 7)",
          backgroundColor: ["rgba(60, 60, 60, 7)", "rgba(60, 179, 113, 7)"],
        },
      ];
      setLinerChartDataSet(data);
    } else if (e === "Month") {
      setSelectedData("Month");
      setLabels(["Cash in Delivery", "E-sewa"]);
      const data = [
        {
          data: [45, 55],
          borderColor: "rgba(60, 60, 60, 7)",
          backgroundColor: ["rgba(60, 60, 60, 7)", "rgba(60, 179, 113, 7)"],
        },
      ];
      setLinerChartDataSet(data);
    }
  };

  const linerChartData = {
    labels: labels,
    datasets: linerChartDataSet,
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
    layout: {
      padding: {
        top: 20, // Adjust this value as needed to make room for the increased height
        bottom: 20, // Adjust this value as needed to make room for the increased height
      },
    },
    responsive: true,
    maintainAspectRatio: false, // This allows the chart to resize according to its container
    borderWidth: 0,
  };
  return (
    <>
      <div class="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
        <div class="mb-3 justify-between gap-4 sm:flex">
          <div>
            <h4 class="text-xl font-bold text-black dark:text-white">
              Payment Analytics
            </h4>
          </div>
          <div>
            <div class="flex w-full max-w-45 justify-end">
              <div class="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
                <button
                  onClick={(e) => changeData("Day")}
                  className={`rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                    selctedData === "Day" ? "bg-white shadow-card" : ""
                  }`}
                >
                  Day
                </button>
                <button
                  onClick={(e) => changeData("Week")}
                  className={`rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                    selctedData === "Week" ? "bg-white shadow-card" : ""
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={(e) => changeData("Month")}
                  className={`rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                    selctedData === "Month" ? "bg-white shadow-card" : ""
                  }`}
                >
                  Month
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
          <div class="w-full px-8 sm:w-1/2">
            <div class="flex w-full items-center">
              <span class="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
              <p class="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> Cash in Delivery </span>
                <span> 65% </span>
              </p>
            </div>
          </div>
          <div class="w-full px-8 sm:w-1/2">
            <div class="flex w-full items-center">
              <span class="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
              <p class="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> E-sewa </span>
                <span> 35% </span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div id="chartTwo" className="h-[400px]">
            <Pie data={linerChartData} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}
