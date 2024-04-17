import React, { useState,useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  // PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  // PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart2() {
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
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: "rgba(60, 60, 60, 7)",
          backgroundColor: "rgba(60, 60, 60, 7)",
        },
      ];
      setLabels(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);

      setLinerChartDataSet(data);
    } else if (e === "Week") {
      setSelectedData("Week");
      setLabels(["Week 1", "Week 2", "Week 3", "Week 4"]);
      const data = [
        {
          label: "First Week",
          data: [65, 59, 80, 81],
          borderColor: "rgba(60, 60, 60, 7)",
          backgroundColor: "rgba(60, 60, 60, 7)",
        },
      ];
      setLinerChartDataSet(data);
    } else if (e === "Month") {
      setSelectedData("Month");
      setLabels([
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]);

      const data = [
        {
          label: "First Month",
          data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
          borderColor: "rgba(60, 60, 60, 7)",
          backgroundColor: "rgba(60, 60, 60, 7)",
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
    scales: {
      y: {
        beginAtZero: true,
        grace: "5%",
        ticks: {
          stepSize: 5,
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
        top: 20, // Adjust this value as needed to make room for the increased height
        bottom: 20, // Adjust this value as needed to make room for the increased height
      },
    },
    responsive: true,
    maintainAspectRatio: false, // This allows the chart to resize according to its container
  };

  return (
    <>
      <div class="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
        <div class="mb-4 justify-between gap-4 sm:flex">
          <div>
            <h4 class="text-xl font-bold text-black dark:text-white">
              Income this week
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

        <div>
          <div id="chartTwo" className="h-[400px]">
            <Bar data={linerChartData} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}
