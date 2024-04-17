import React, { useState, useEffect, Fragment } from "react";
import api from "../../../utils/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";

export default function DisplayCategory() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isOpenOrderDetails, setOpenOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orderFetch = async () => {
    try {
      const response = await api.get("admin/order/getAllOrders");
      if (response.success) {
        setOrderDetails(response.data); // Update state with the data array from the response
      } else {
        console.error("Failed to fetch category:", response.message);
      }
    } catch (error) {
      console.error("Error fetching category:", error.message);
    }
  };
  const openModal = () => {
    setOpenOrderDetails(true);
  };

  const closeModal = () => {
    setOpenOrderDetails(false);
  };

  const viewOrderDetails = (id) => {
    setSelectedOrder(orderDetails.find((order) => order.id === id));
    setOpenOrderDetails(true); // Update isOpenOrderDetails state to true
  };

  useEffect(() => {
    orderFetch();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto  mb-5 ">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-title-sm font-bold text-black dark:text-white">
            Search Order
          </h3>
        </div>

        <div className="">
          <div className="">
            <input
              type="text"
              className=" border p-2 border-gray rounded-md w-full bg-gray-2 "
            />
          </div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="flex items-center justify-between mb-5.5">
          <h3 className="text-title-sm font-bold text-black dark:text-white">
            Display Order
          </h3>
        </div>

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white ">
                Order ID
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white ">
                User Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Product name
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Total Price
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
            {orderDetails.map((item) => (
              <tr>
                {/* image */}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                  <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium ">
                    {item.id}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.User.name}
                  </h5>
                </td>

                {/* product names */}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex flex-row gap-2 w-25 overflow-x-auto">
                    {item.OrderDetails.map((product) => product.Product.name)}
                  </div>
                </td>
                {/* total price */}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                  <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium ">
                    {item.totalPrice}
                  </p>
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
                <td className="border-b border-[#eee] px-4 py-5   dark:border-strokedark">
                  <div className="flex items-center space-x-3.5 gap-2 ">
                    <button
                      onClick={() => viewOrderDetails(item.id)}
                      className="hover:text-primary"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* model  */}
        <ViewOrderDetails
          isOpen={isOpenOrderDetails}
          onClose={closeModal}
          orderDetails={selectedOrder}
        />
      </div>
    </div>
  );
}

function ViewOrderDetails({ isOpen, onClose, orderDetails }) {
  const [subTotal, setSubTotal] = useState(0);
  const [taxAmt, setTaxAmt] = useState(0);
  const delivery = 120;

  const calculateTotal = (orderDetails) => {
    const totalPrice = orderDetails.reduce((acc, item) => {
      return acc + item.Product.price * item.quantity;
    }, 0);
    setSubTotal(totalPrice);
    setTaxAmt(totalPrice * 0.13);
  };

  useEffect(() => {
    if (orderDetails && orderDetails.OrderDetails) {
      calculateTotal(orderDetails.OrderDetails);
    }
  }, [orderDetails]);

  // Check if orderDetails is null or undefined
  if (!orderDetails) {
    return null; // Render nothing if orderDetails is null or undefined
  }

  console.log(orderDetails);
  const handleClickInsideModal = (event) => {
    // Prevent propagation of click events
    event.stopPropagation();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-999  overflow-y-auto"
        onClose={onClose}
      >
        {/* Dialog overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        {/* Dialog content */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className="fixed inset-0 flex flex-col items-center justify-center  dark:bg-black/70 "
            onClick={onClose} // Close modal if clicked outside the content
          >
            <Dialog.Title className="sr-only">Order Details</Dialog.Title>
            <div
              className="bg-white rounded-xl overflow-hidden max-w-[80vh] w-full max-h-[80vh] overflow-y-auto dark:text-white dark:bg-boxdark"
              onClick={handleClickInsideModal} // Prevent click propagation within the content
            >
              <div className="p-4 flex flex-row justify-between  ">
                <h3 className="text-lg font-semibold ">Order Details</h3>
                <button
                  onClick={onClose}
                  className="bg-primary text-white px-2 py-1 rounded-md"
                >
                  Close
                </button>
              </div>
              {/* order  */}
              <div className="px-4">
                <h3 className=" font-bold bg-gray-2 p-2 dark:bg-meta-4 ">
                  {" "}
                  Order Details
                </h3>
                <div className=" flex flex-row justify-between px-2  mt-3">
                  <div className="">#{orderDetails.id}</div>
                  <div className="">{orderDetails.createdAt}</div>
                </div>
              </div>
              {/* delivery and billing  */}
              <div className="p-4  ">
                <h3 className=" font-bold bg-gray-2 p-2 dark:bg-meta-4">
                  {" "}
                  Delivery and Billing
                </h3>
                <div className=" grid grid-cols-2 gap-5 mt-3">
                  <div className=" border  border-gray p-2 rounded-md">
                    <h2 className=" font-bold"> Delivery Address:</h2>
                    <div className="">
                      <p className="">{orderDetails.Location.name}</p>
                      <p className="">{orderDetails.Location.email}</p>
                      <p className="">{orderDetails.Location.phoneNumber}</p>
                      <p className="">{orderDetails.Location.address}</p>
                    </div>
                  </div>
                  <div className=" border  border-gray p-2 rounded-md">
                    <h2 className=" font-bold">Billing Address:</h2>
                    <div className="">
                      <p className="">{orderDetails.User.name}</p>
                      <p className="">{orderDetails.User.email}</p>
                      <p className="">{orderDetails.User.phoneNumber}</p>
                      <p className="">{orderDetails.User.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product details */}
              <div className="px-4 ">
                <h3 className=" font-bold bg-gray-2 p-2 dark:bg-meta-4 ">
                  {" "}
                  Product details
                </h3>
                <div className="">
                  <table className="w-full table-auto overflow-auto ">
                    <thead className=" dark:border-b ">
                      <tr className=" text-left ">
                        <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white ">
                          Sn.No
                        </th>
                        <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                          Product name
                        </th>
                        <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                          Quantity
                        </th>
                        <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                          Total Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className=" ">
                      {/* Map over the order details */}
                      {orderDetails.OrderDetails.map((orderDetail, index) => (
                        <tr key={index} className="border-t  border-[#7676769e] ">
                          {/* Render each order detail */}
                          <td className=" px-4 py-5 dark:border-strokedark">
                            <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium ">
                              {index + 1}
                            </p>
                          </td>
                          {/* product name */}
                          <td className="px-4 py-5 dark:border-strokedark">
                            <div className="flex flex-row gap-2 w-25 overflow-x-auto">
                              {orderDetail.Product.name}
                            </div>
                          </td>
                          {/* quantity */}
                          <td className="px-4 py-5 dark:border-strokedark">
                            <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium ">
                              {orderDetail.quantity}
                            </p>
                          </td>
                          {/* total price */}
                          <td className=" px-4 py-5 dark:border-strokedark ">
                            <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium">
                              {orderDetail.Product.price * orderDetail.quantity}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tbody className="border-t-2  border-[#7676769e]">
                      {/* Sub Total */}
                      <tr className="border-t border-[#eee]">
                        <td></td>
                        <td></td>
                        <td className=" px-4 py-2 dark:border-strokedark ">
                          <p className="inline-flex bg-opacity-10 text-sm font-medium ">
                            Sub Total
                          </p>
                        </td>
                        <td className=" px-4 py-2 dark:border-strokedark ">
                          <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium ">
                            {/* {orderDetails.Product.price * orderDetails.quantity} */}
                            {subTotal}
                          </p>
                          <p></p>
                        </td>
                      </tr>
                      {/* Tax */}
                      <tr className="">
                        <td></td>
                        <td></td>
                        <td className=" border-t-2  border-[#ffffff] px-4 py-2 dark:border-strokedark ">
                          <p className="inline-flex bg-opacity-10 text-sm font-medium ">
                            Tax (13%)
                          </p>
                        </td>
                        <td className="  border-t-2  border-[#ffffff] px-4 py-2 dark:border-strokedark ">
                          <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium ">
                            {taxAmt}
                          </p>
                          <p></p>
                        </td>
                      </tr>
                      {/* Delivery Charge */}
                      <tr className="">
                        <td></td>
                        <td></td>
                        <td className=" border-t-2  border-[#ffffff] px-4 py-2 dark:border-strokedark ">
                          <p className="inline-flex bg-opacity-10 text-sm font-medium ">
                            Delivery Charge
                          </p>
                        </td>
                        <td className="  border-t-2  border-[#ffffff] px-4 py-2 dark:border-strokedark ">
                          <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium ">
                            120
                          </p>
                          <p></p>
                        </td>
                      </tr>
                      {/* Total Price */}
                      <tr className=" border-b-2  border-[#7676769e] ">
                        <td></td>
                        <td></td>
                        <td className="  border-t-2  border-[#ffffff] px-4 py-2 dark:border-strokedark ">
                          <p className="inline-flex bg-opacity-10 text-sm font-medium ">
                            TotalPrice
                          </p>
                          <br />
                          <span className=" text-gray text-sm">
                            {" "}
                            (Including tax and Delivery charge)
                          </span>
                        </td>
                        <td className="  border-t-2  border-[#ffffff] px-4 py-2 dark:border-strokedark ">
                          <p className="inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium ">
                            {orderDetails.totalPrice}
                          </p>
                          <p></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* order status  */}
              <div className="p-4 ">
                <h3 className=" font-bold bg-gray-2 p-2 dark:bg-meta-4">
                  {" "}
                  Order Status
                </h3>
                <div className=" flex flex-row justify-between px-2  mt-3">
                  <div>Status</div>
                  <div
                    className={`inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      orderDetails.status === "active"
                        ? "text-success"
                        : "text-red-500 dark:text-red-500"
                    } border border-opacity-10 rounded-full dark:border-strokedark dark:text-white dark:bg-meta-4 dark:hover:bg-opacity-10 dark:hover:text-primary hover:bg-opacity-10 hover:text-primary`}
                  >
                    {orderDetails.status}
                  </div>
                </div>

                <div className=" flex flex-row justify-between px-2  mt-3">
                  <div className="">Payment Method</div>
                  <div className=" capitalize  font-semibold">
                    {orderDetails.Payment.paymentMethod}
                  </div>
                </div>
              </div>

              {/* payment details  */}
              <div className="p-4   ">
                <h3 className=" font-bold bg-gray-2 p-2 dark:bg-meta-4">
                  {" "}
                  Payment Details
                </h3>
                <div className=" flex flex-row justify-between px-2  mt-3">
                  <div className="">Payment ID</div>
                  <div className="">{orderDetails.Payment.id}</div>
                </div>
                <div className=" flex flex-row justify-between px-2  mt-3">
                  <div className="">Payment Status</div>
                  <div
                    className={`inline-flex bg-opacity-10 px-3 py-1 text-sm font-medium capitalize ${
                      orderDetails.Payment.paymentStatus === "completed"
                        ? "text-success"
                        : "text-red-500 dark:text-red-500"
                    } border border-opacity-10 rounded-full dark:border-strokedark dark:text-white dark:bg-meta-4 dark:hover:bg-opacity-10 dark:hover:text-primary hover:bg-opacity-10 hover:text-primary`}
                  >
                    {orderDetails.Payment.paymentStatus}
                  </div>
                </div>
              </div>
              {/* change order status */}
              <div className="p-4 ">
                <h3 className=" font-bold bg-gray-2 p-2 dark:bg-meta-4">
                  Change Order Status
                </h3>
                <div className=" flex flex-row justify-between px-2  mt-3 ">
                  <select
                    name=""
                    id=""
                    className="w-full border p-2 border-gray dark:bg-meta-4"
                  >
                    <option value=""> Pending</option>
                    <option value=""> Complited</option>
                    <option value=""> Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
