import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import adminApi from "../../../services/admin/adminApi";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart3() {
  const [paymentData, setPaymentData] = useState([]); // Add this line
  const [labels, setLabels] = useState([]);
  const [linerChartDataSet, setLinerChartDataSet] = useState([]);

  useEffect(() => {
    const fetchDailySales = async () => {
      try {
        const response = await adminApi.get("admin/report/getPaymentReport");
        if (response.success === true) {
          // Use the updated state directly
          const data = [
            {
              label: "Paymet sales report",
              data: response.data.map((item) => item.total),
              borderColor: "rgba(60, 0, 60, 7)",
              backgroundColor: ["rgba(60, 60, 60, 7)", "rgba(60, 179, 113, 7)"],
            },
          ];
          setLabels(response.data.map((item) => item.paymentMethod));
          setLinerChartDataSet(data);
          // No need to set paymentData here
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
  
    fetchDailySales();
  }, []);

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
        top: 10,
        bottom: 10,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    borderWidth: 0,
  };

  return (
    <>
      <div className="col-span-4 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
        <div className="mb-3 justify-between gap-4 sm:flex">
          <div>
            <h4 className="text-xl font-bold text-black dark:text-white">
              Payment Analytics
            </h4>
          </div>
        </div>

        <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
          {labels.map((label, index) => (
            <div key={index} className="w-full px-8 sm:w-1/2">
              <div className="flex w-full items-center">
                <span
                  className={`mr-2 block h-3 w-full max-w-3 rounded-full ${
                    index === 0 ? "bg-primary" : "bg-[#6577F3]"
                  }`}
                ></span>
                <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                  <span>{label}</span>
                  <span>{linerChartData.datasets[0].data[index]}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div id="chartTwo" className="h-[400px] mt-4">
            <Pie data={linerChartData} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}
