import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";
import PaymentMessage from "./paymentMessage";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const userId = sessionStorage.getItem("userData");
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState("");

  const shipping = 120;
  const tax = 0.13;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get(`user/cart/${userId}`);
        if (response.data) {
          // Check if response.data is an array
          setCart(response.data);
          calculateTotal(response.data);
        } else {
          console.error("Failed to fetch cart:", response.message);
        }
      } catch (error) {
        console.error("Error fetching cart:", error.message);
      }
    };

    fetchCart();
  }, [userId]); // Fetch cart data when userId changes

  const calculateTotal = (cartData) => {
    const totalPrice = cartData.reduce((acc, item) => {
      return acc + item.Product.price * item.quantity;
    }, 0);
    setSubTotal(totalPrice);
    setTotal(totalPrice + totalPrice * tax + shipping);
  };

  const handleQuantity = async (id, type) => {
    let updatedQuantity;

    if (type === "decrease" && quantity <= 1) {
      alert("Quantity cannot be less than 1");
      return; // Exit the function early
    }

    try {
      const response = await api.get(
        `user/cart/${type === "increase" ? "increase" : "decrease"}/${id}`
      );

      if (response.data) {
        setCart(response.data);
        calculateTotal(response.data);

        // Update the quantity state after updating the cart data
        updatedQuantity =
          response.data.find((item) => item.id === id)?.quantity || 0;
        setQuantity(updatedQuantity);
      } else {
        console.error("Failed to update cart:", response.message);
      }
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await api.get(`user/cart/delete/product/${id}`);
      if (response.data) {
        setCart(response.data);
        calculateTotal(response.data);
      } else {
        console.error("Failed to remove product from cart:", response.message);
      }
    } catch (error) {
      console.error("Error removing product from cart:", error.message);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePaymentSuccess = (paymentData) => {
    setPaymentData(paymentData);
    console.log("Payment data", paymentData.status);
  };

  const ProductDescription = (id) => {
    navigate(`/product/description/${id}`);
  };

  if (paymentData) {
    return <PaymentMessage data={paymentData} />;
  } else {
    return (
      <section className=" bg-white flex flex-col  justify-center ">
        <div className="self-center w-full max-w-[1224px] items-stretch justify-between gap-5  max-md:max-w-full max-md:flex-wrap">
          <div className=" flex justify-center">
            <h1 className=" text-4xl font-bold py-9">Cart</h1>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className=" col-span-3">
              <div className="grid grid-row-12 gap-4 ">
                {cart &&
                  cart.map((item) => (
                    <div className="order border border-gray rounded-lg p-2">
                      <div className="grid grid-cols-5 gap-4">
                        <div className="item-pic col-span-1 ">
                          <img
                            src={item.Product.Images[0].url}
                            alt=""
                            className=" w-full aspect-square object-cover border-non rounded-lg overflow-hidden dark:border-gray-800"
                          />
                        </div>
                        <div className="col-span-4">
                          <div className=" h-full  flex flex-col justify-center ">
                            <div className="flex justify-between text-lg font-semibold">
                              <div className="flex justify-center flex-col">
                                <button
                                  onClick={() =>
                                    ProductDescription(item.Product.id)
                                  }
                                >
                                  {item.Product.name}
                                </button>
                              </div>
                              <div className="flex justify-center flex-col">
                                <div className="text-sm">
                                  Price: Rs .{item.Product.price}
                                </div>
                              </div>
                              <div className="flex flex-row gap-2">
                                <div className="text-sm flex justify-center flex-col">
                                  Quantity:{" "}
                                </div>
                                <button
                                  onClick={() => {
                                    handleQuantity(item.id, "increase");
                                    setQuantity(item.quantity);
                                  }}
                                  className="flex justify-center bg-primary text-white"
                                >
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    className="p-2"
                                  />
                                </button>
                                <p className="flex justify-center flex-col px-2 bg-white">
                                  {item.quantity}
                                </p>
                                <button
                                  onClick={() => {
                                    handleQuantity(item.id, "decrease");
                                    setQuantity(item.quantity);
                                  }}
                                  className="flex justify-center bg-primary text-white"
                                >
                                  <FontAwesomeIcon
                                    icon={faMinus}
                                    className="p-2"
                                  />
                                </button>
                              </div>
                              <div className="flex justify-center flex-col">
                                <div className="text-sm">
                                  Total: Rs.{" "}
                                  {(item.Product.price * item.quantity).toFixed(
                                    2
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-center flex-col ">
                                <button
                                  onClick={() => removeProduct(item.id)}
                                  className="px-2 bg-primary text-white rounded-md"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className=" col-span-1 ">
              <div className=" h-auto border border-gray rounded-md p-2">
                <div className="h-auto  flex justify-center text-2xl font-semibold border-b-2 pb-2 border-indigo-300 ">
                  <h1>Order Total</h1>
                </div>
                <div className=" flex gap-2 flex-col pt-3 text-lg">
                  <div className="flex justify-between">
                    <div>Subtotal</div>
                    <div>Rs. {subTotal.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Shipping</div>
                    <div>Rs. {shipping}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Tax</div>
                    <div>Rs. {(subTotal * 0.13).toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Total</div>
                    <div>Rs. {total.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="bg-primary text-white p-2 w-full rounded-md"
                      onClick={openModal}
                    >
                      Checkout
                    </button>
                    <MyModal
                      isOpen={isOpen}
                      closeModal={closeModal}
                      toFixed={total}
                      cartData={cart}
                      handlePaymentSuccess={handlePaymentSuccess}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function MyModal({
  isOpen,
  closeModal,
  toFixed,
  handlePaymentSuccess,
  cartData,
}) {
  const id = sessionStorage.getItem("userData");

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [error, setError] = useState(null);
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null); // Define selectedAddress state
  const [address, setAddress] = useState();

  const [userData, setUserData] = useState(null);

  const handleSelectAddress = (address) => {
    setAddress(address); // Update the address state
  };

  const openAddressModal = () => {
    setIsOpenAddress(true);
  };

  const closeAddressModal = () => {
    setIsOpenAddress(false);
  };

  const handlePaymentSelection = (paymentMethod) => {
    setError(null);
    setSelectedPayment(paymentMethod);
  };

  const getPaymentClass = (paymentMethod) => {
    if (selectedPayment === paymentMethod) {
      switch (paymentMethod) {
        case "cash":
          return "bg-black text-white";
        case "khalti":
          return "bg-[#21112d] text-white";
        case "eSewa":
          return "bg-green-500 text-white";
        default:
          return "";
      }
    }
    return "";
  };

  const PayNow = async (e) => {
    if (!address || !address.id) {
      setError("Please select an address");
      return;
    }

    let newAddressID = address.id;

    if (selectedAddress) {
      newAddressID = selectedAddress.id;
    }

    const data = {
      userId: id,
      addressId: newAddressID,
      paymentMethod: selectedPayment,
      totalAmount: toFixed,
      cart: cartData,
    };

    const formData = new FormData();
    formData.append("userId", id);
    formData.append("location", newAddressID);
    formData.append("paymentType", selectedPayment);
    formData.append("totalAmount", toFixed);

    console.log("Data", data);

    if (
      selectedPayment === "cash" ||
      selectedPayment === "eSewa" ||
      selectedPayment === "khalti"
    ) {
      console.log("adding order data to database");
      try {
        const response = await api.post(`user/order/add/${id}`, formData);
        if (response.success) {
          console.log(response);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    if (selectedPayment === "cash") {
      console.log("Cash payment", selectedPayment);
      // handlePaymentSuccess({
      //   status: "success",
      //   orderId: "1",
      //   address: selectedAddress,
      //   data: {
      //     transactionId: "ACME1234567890",
      //     amount: "Rs .99.00",
      //     paymentMethod: selectedPayment,
      //   },
      // });
    } else if (selectedPayment === "khalti") {
      console.log("Khalti payment", selectedPayment);
    } else if (selectedPayment === "eSewa") {
      console.log("eSewa payment", selectedPayment);
      EsewaPayment(toFixed);
      // Call handlePaymentSuccess function with payment data
    }

    closeModal();

    console.log("Payment successful");
  };

  useEffect(() => {
    const fetchDefultLoaction = async () => {
      try {
        const response = await api.get(`user/loaction/default/${id}`);
        if (response.data) {
          setAddress(response.data);

          console.log("Address", response.data);
        } else {
          console.error("Failed to fetch cart:", response.message);
        }
      } catch (error) {
        console.error("Error fetching cart:", error.message);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await api.get(`user/getUserById/${id}`);
        if (response) {
          setUserData(response.data.user);
          console.log("User data", response.data.user.name);
          console.log("User data", userData);
        } else {
          console.error("faliure to fetch user:", response.message);
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };
    fetchUserData();
    fetchDefultLoaction();
  }, [id]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="mx-auto w-full max-w-7xl bg-slate-100 ">
                  <div className="mx-auto  max-w-2xl">
                    {/* Form */}
                    <div className="overflow-hidden rounded-xl bg-white p-4 shadow">
                      <div className="mb-4 rounded-lg py-2">
                        <div className=" flex flex-row justify-between">
                          <div className=" flex flex-row gap-2">
                            <div className="">
                              <FontAwesomeIcon icon={faCartShopping} />
                            </div>
                            <p className="text-sm font-medium">
                              You have <strong>{cartData.length}</strong> items
                              in cart. Sub total is{" "}
                              <strong>Rs. {toFixed}</strong>
                            </p>
                          </div>

                          <button
                            onClick={closeModal}
                            className="flex justify-end"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* delivey and billing detials */}
                      <div className=" grid grid-cols-2 gap-4">
                        <div className="flex flex-col border-2 border-gray rounded-md">
                          <div className="flex flex-row justify-between p-2">
                            <label className="text-md font-bold">
                              Delivery Details
                            </label>
                            <button
                              onClick={openAddressModal} // Attach openAddressModal function here
                              className="hover:text-primary rounded-md"
                            >
                              Change
                            </button>
                          </div>
                          <Address
                            openAddressModal={isOpenAddress}
                            closeAddressModal={closeAddressModal}
                            selectedAddress={selectedAddress} // Pass selectedAddress to Address component
                            setSelectedAddress={handleSelectAddress} // Pass setSelectedAddress function to Address component
                          />

                          <div className=" border-t-2 border-gray p-2">
                            <div className="flex flex-col">
                              {address && ( // Check if address exists
                                <div className="">
                                  <div className=" capitalize">
                                    {address.name} |{" "}
                                    <span className="  text-primary">
                                      {address.type}
                                    </span>{" "}
                                  </div>
                                  <div className="">{address.phoneNumber}</div>
                                  <div className="">
                                    {address.address}, {address.city}
                                    <div className="">{address.phone}</div>
                                    <div className="">{address.email}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col border-2 border-gray rounded-md">
                          <div className=" flex flex-row justify-between p-2">
                            <label className="text-md font-bold">
                              Billing detials
                            </label>
                          </div>
                          <div className=" border-t-2 border-gray p-2">
                            <div className="flex flex-col">
                              {userData && (
                                <div className="">
                                  <div className="">{userData.name}</div>
                                  <div className="">{userData.phoneNumber}</div>
                                  <div className="">
                                    {userData.address}, {userData.city}
                                    <div className="">{userData.phone}</div>
                                    <div className="">{userData.email}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="">
                        <div className="">
                          <div className="pt-6 ">
                            <div className="flex justify-between">
                              <div className=" text-2xl font-bold">
                                Payment method
                              </div>
                            </div>

                            <p className=" border-b-2 border-neutral-300 pb-2 text-lg capitalize">
                              select payment method
                            </p>
                            {error && (
                              <div className="text-red-500 flex items-center justify-center py-2 text-lg ">
                                {error}
                              </div>
                            )}
                          </div>
                          <div className=" flex gap-3 flex-col mt-2 ">
                            <div
                              className={`font-semibold text-xl p-2 rounded-md }`}
                              style={{
                                backgroundColor: getPaymentClass("cash")
                                  ? "#000"
                                  : "#fff",
                                color: getPaymentClass("cash")
                                  ? "#fff"
                                  : "#000",
                              }}
                            >
                              <label className=" flex justify-between flex-row-reverse">
                                <input
                                  id="cash"
                                  name="payment"
                                  type="radio"
                                  checked={selectedPayment === "cash"}
                                  onChange={() =>
                                    handlePaymentSelection("cash")
                                  }
                                />
                                <div>
                                  <span className="">Cash in delivey</span>
                                </div>
                              </label>
                            </div>
                            <div
                              className={`font-semibold text-xl px-2 rounded-md py-2 }`}
                              style={{
                                backgroundColor: getPaymentClass("eSewa")
                                  ? "#008000"
                                  : "#fff",
                                color: getPaymentClass("eSewa")
                                  ? "#fff"
                                  : "#000",
                              }}
                            >
                              <label className=" flex justify-between flex-row-reverse">
                                <input
                                  className=""
                                  id="eSewa"
                                  name="payment"
                                  type="radio"
                                  checked={selectedPayment === "eSewa"}
                                  onChange={() =>
                                    handlePaymentSelection("eSewa")
                                  }
                                />
                                <div>
                                  <span className="font-medium">E-Sewa</span>
                                </div>
                              </label>
                            </div>
                            <div
                              className={`font-semibold text-xl px-2 rounded-md py-2 }`}
                              style={{
                                backgroundColor: getPaymentClass("khalti")
                                  ? "#21112d"
                                  : "#fff",
                                color: getPaymentClass("khalti")
                                  ? "#fff"
                                  : "#000",
                              }}
                            >
                              <label className=" flex justify-between flex-row-reverse">
                                <input
                                  className=""
                                  id="khalti"
                                  name="payment"
                                  type="radio"
                                  checked={selectedPayment === "khalti"}
                                  onChange={() =>
                                    handlePaymentSelection("khalti")
                                  }
                                />
                                <div>
                                  <span className="font-medium">Khalti</span>
                                </div>
                              </label>
                            </div>
                          </div>

                          <div className="mt-2 ">
                            <button
                              className="bg-primary text-white p-2 w-full rounded-md"
                              onClick={PayNow}
                            >
                              Pay Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function Address({
  openAddressModal,
  closeAddressModal,
  selectedAddress,
  setSelectedAddress,
}) {
  const [addressData, setAddressData] = useState([]);
  const [show, setShow] = useState(false); // Initialize show state
  const id = sessionStorage.getItem("userData");

  useEffect(() => {
    // fetch address data
    const fetchAddress = async () => {
      try {
        const response = await api.get(`user/loaction/${id}`);
        if (response.success) {
          setAddressData(response.data.reverse());
          setShow(openAddressModal); // Update show state based on openAddressModal
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddress();
  }, [id, openAddressModal]);

  useEffect(() => {
    // Update show state when openAddressModal or closeAddressModal changes
    setShow(openAddressModal);
  }, [openAddressModal, closeAddressModal]);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address); // Update the selected address state

    closeAddressModal(); // Close the address modal
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeAddressModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl  transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                <div>
                  <div className="flex flex-col border-2 border-gray rounded-md">
                    <div className="flex flex-row justify-between p-2">
                      <label className="text-md font-bold">
                        Delivery Details
                      </label>
                      <button
                        onClick={closeAddressModal}
                        className="flex justify-end"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="border-t-2 border-gray p-2 h-[55vh] overflow-auto grid grid-cols-2 gap-2">
                      {/* Apply overflow-auto class here */}
                      {addressData.map((address) => (
                        <div
                          className={`border border-warning p-2 flex gap-1 flex-col ${
                            address === selectedAddress
                              ? "bg-primary text-white"
                              : ""
                          }`}
                          key={address.id}
                          onClick={() => handleSelectAddress(address)} // Update selected address state here
                        >
                          <div className="capitalize flex justify-between">
                            <p>{address.name}</p>
                          </div>
                          <div>{address.phoneNumber}</div>
                          <div>{address.email}</div>
                          <div>{address.address}</div>
                          <div></div>
                          <div className="flex gap-3">
                            <small
                              className={` py-1 px-2  rounded-md capitalize ${
                                address === selectedAddress
                                  ? "bg-white text-primary "
                                  : ""
                              }`}
                            >
                              {address.type}
                            </small>
                            {address.isDefault && (
                              <small
                                className={` py-1 px-2  rounded-md ${
                                  address === selectedAddress
                                    ? "bg-white text-primary "
                                    : ""
                                }`}
                              >
                                Defult Delivery Address
                              </small>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}



function EsewaPayment(toFixed) {
  var path = "https://uat.esewa.com.np/epay/main";

  var params = {
    amt: toFixed,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: toFixed,
    pid: randomString(20),
    scd: "EPAYTEST",
    su: "https://www.youtube.com/watch?v=dYOMAE_4iQ8&list=RDMMdYOMAE_4iQ8&start_radio=1",
    fu: "https://www.youtube.com/watch?v=f_e06C2XQ7w&list=RDMMdYOMAE_4iQ8&index=3",
  };

  function submitForm() {
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
  }

  submitForm();
}

// random string generator
function randomString(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
