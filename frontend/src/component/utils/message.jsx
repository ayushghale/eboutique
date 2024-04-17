import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const PaymentMessage = ({ data }) => {
  console.log("PaymentMessage data", data);

  const navigator = useNavigate();

  console.log("status", data.status);
  const returnHome = () => {
    navigator("/");
  };
  return (
    <>
      <div className=" mt-12  ">
        {data.status === "success" && (
          <div className="  flex justify-center items-center   ">
            <div
              className=" shadow-5 border border-slate-200 rounded relative w-[300px] p-4 bg-white dark:bg-slate-800 "
              role="alert"
            >
              <div className=" flex justify-center items-center ">
                <FontAwesomeIcon
                  icon={faCheck}
                  className=" text-[150px] text-green-500 "
                />
              </div>
              <div className=" flex flex-col items-center">
                <div className="text-center space-y-2">
                  <h1 className="font-bold text-3xl">Payment successful</h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    Your payment has been successfully processed.
                  </p>
                </div>
                <div className="grid w-full gap-1.5 text-sm mt-2">
                  <div className="grid grid-cols-2 items-center">
                    <div>Transaction ID</div>
                    <div className="font-medium">{data.data.transactionId}</div>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <div>Amount paid</div>
                    <div className="font-medium">{data.data.amount}</div>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <div>Payment method</div>
                    <div className="font-medium">{data.data.paymentMethod}</div>
                  </div>
                </div>
              </div>
              <div className="">
                <button
                  onClick={returnHome}
                  className="w-full bg-green-500 text-white py-2 rounded mt-4"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        )}
        {data.status === "fail" && (
          <div className="  flex justify-center items-center w-screen ">
            <div
              className=" shadow-5 border border-slate-200 rounded relative w-[300px] p-4  bg-white dark:bg-slate-800"
              role="alert"
            >
              <div className=" flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faXmark}
                  className=" text-[150px] text-red-500"
                />
              </div>
              <div className=" flex flex-col items-center">
                <div className="text-center space-y-2">
                  <h1 className="font-bold text-3xl">Payment failed</h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    Your payment has been failed.
                  </p>
                </div>
              </div>
              <div className="">
                <button
                  onClick={returnHome}
                  className="w-full bg-red-500 text-white py-2 rounded mt-4"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentMessage;

export function DeleteConfirmation({ id, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center   ">
      <div className="bg-white p-5 rounded-lg  dark:bg-boxdark">
        <div className=" flex justify-center items-center">
          <FontAwesomeIcon
            icon={faXmark}
            className=" text-[150px] text-red-500 aspect-square border rounded-full p-3 bg-opacity-10 dark:bg-opacity-10 dark:text-red-500 dark:border-strokedark dark:hover:bg-opacity-10 dark:hover:text-primary hover:bg-opacity-10 hover:text-primary"
          />
        </div>

        <h3 className="text-title-sm font-bold text-black dark:text-white">
          Are you sure you want to delete this border?
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          This action cannot be undone.
        </p>
        <div className=" grid grid-cols-2  gap-3 mt-5">
          <button
            className="btn bg-primary text-white p-2 rounded-md"
            onClick={() => onConfirm(id)}
          >
            Yes
          </button>
          <button
            className="btn bg-primary text-white  p-2 rounded-md"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
