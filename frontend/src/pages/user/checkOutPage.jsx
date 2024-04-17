import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";
import CryptoJS from "crypto-js";
import PaymentMessage from "./paymentMessage";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Cart(data) {
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
                      cartdata = {cart}
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

function MyModal({ isOpen, closeModal, toFixed, handlePaymentSuccess, cartdata }) {
  const userId = sessionStorage.getItem("userData");

  const [address, setAddress] = useState();

  useEffect(() => {
    const fetchDefultLoaction = async () => {
      try {
        const response = await api.get(`user/loaction/default/${userId}`);
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
    fetchDefultLoaction();
  }, [userId]);

  return (
    <>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[800px] transform overflow-hidden rounded-xl bg-white pb-6  text-left align-middle shadow-xl transition-all">
                  {address && ( // Check if address exists
                    <div className="w-full grid grid-cols-12 p-3 gap-4 ">
                      <div className="col-span-8 grid-rows-2">
                        <div className=" border p-2">
                          <div className=" flex flex-row justify-between ">
                            <div className="font-extrabold text-lg">Delivery Details</div>
                            <button className=""> Change</button>
                          </div>
                          <div className="">{address.name}</div>
                          <div className=""> {address.phoneNumber}</div>
                          <div className="">
                            {address.country}, {address.city}
                            <div className="">{address.phone}</div>
                            <div className="">{address.email}</div>
                          </div>
                        </div>
                        <div className="">
                          product
                        </div>
                      </div>
                      <div className="col-span-4">asd</div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

// function MyModal({ isOpen, closeModal, toFixed, handlePaymentSuccess }) {
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [error, setError] = useState(null);

//   const handlePaymentSelection = (paymentMethod) => {
//     setError(null);
//     setSelectedPayment(paymentMethod);
//   };

//   const getPaymentClass = (paymentMethod) => {
//     if (selectedPayment === paymentMethod) {
//       switch (paymentMethod) {
//         case "cash":
//           return "bg-black text-white";
//         case "khalti":
//           return "bg-[#21112d] text-white";
//         case "eSewa":
//           return "bg-green-500 text-white";
//         default:
//           return "";
//       }
//     }
//     return "";
//   };

//   const PayNow = () => {
//     if (selectedPayment === "cash") {
//       console.log("Cash payment", selectedPayment);
//       handlePaymentSuccess({
//         status: "success",
//         orderId: "1",
//         data: {
//           transactionId: "ACME1234567890",
//           amount: "Rs .99.00",
//           paymentMethod: selectedPayment,
//         },
//       });
//     } else if (selectedPayment === "khalti") {
//       console.log("Khalti payment", selectedPayment);
//     } else if (selectedPayment === "eSewa") {
//       console.log("eSewa payment", selectedPayment);
//       EsewaPayment(toFixed);
//       // Call handlePaymentSuccess function with payment data
//     }

//     closeModal();

//     console.log("Payment successful");
//   };

//   return (
//     <>
//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black/25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white pb-6  text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title className="pt-6 px-6">
//                     <div className="flex justify-between">
//                       <div className=" text-2xl font-bold">Payment method</div>
//                       <button onClick={closeModal} className="flex justify-end">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-6 w-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                     <div className="py-2">
//                       Total Amount: Rs.{" "}
//                       <span className=" font-bold">{toFixed}</span>
//                     </div>
//                     <p className=" border-b-2 border-neutral-300 pb-2 text-lg capitalize">
//                       select payment method
//                     </p>
//                     {error && (
//                       <div className="text-red-500 flex items-center justify-center py-2 text-lg ">
//                         {error}
//                       </div>
//                     )}
//                   </Dialog.Title>
//                   <div className=" flex gap-3 flex-col mt-2 px-4">
//                     <div
//                       className={`font-semibold text-xl p-2 rounded-md }`}
//                       style={{
//                         backgroundColor: getPaymentClass("cash")
//                           ? "#000"
//                           : "#fff",
//                         color: getPaymentClass("cash") ? "#fff" : "#000",
//                       }}
//                     >
//                       <label className=" flex justify-between flex-row-reverse">
//                         <input
//                           id="cash"
//                           name="payment"
//                           type="radio"
//                           checked={selectedPayment === "cash"}
//                           onChange={() => handlePaymentSelection("cash")}
//                         />
//                         <div>
//                           <span className="">Cash in delivey</span>
//                         </div>
//                       </label>
//                     </div>
//                     <div
//                       className={`font-semibold text-xl px-2 rounded-md py-2 }`}
//                       style={{
//                         backgroundColor: getPaymentClass("eSewa")
//                           ? "#008000"
//                           : "#fff",
//                         color: getPaymentClass("eSewa") ? "#fff" : "#000",
//                       }}
//                     >
//                       <label className=" flex justify-between flex-row-reverse">
//                         <input
//                           className=""
//                           id="eSewa"
//                           name="payment"
//                           type="radio"
//                           checked={selectedPayment === "eSewa"}
//                           onChange={() => handlePaymentSelection("eSewa")}
//                         />
//                         <div>
//                           <span className="font-medium">E-Sewa</span>
//                         </div>
//                       </label>
//                     </div>
//                     <div
//                       className={`font-semibold text-xl px-2 rounded-md py-2 }`}
//                       style={{
//                         backgroundColor: getPaymentClass("khalti")
//                           ? "#21112d"
//                           : "#fff",
//                         color: getPaymentClass("khalti") ? "#fff" : "#000",
//                       }}
//                     >
//                       <label className=" flex justify-between flex-row-reverse">
//                         <input
//                           className=""
//                           id="khalti"
//                           name="payment"
//                           type="radio"
//                           checked={selectedPayment === "khalti"}
//                           onChange={() => handlePaymentSelection("khalti")}
//                         />
//                         <div>
//                           <span className="font-medium">Khalti</span>
//                         </div>
//                       </label>
//                     </div>
//                   </div>

//                   <div className="mt-2 px-4">
//                     <button
//                       className="bg-primary text-white p-2 w-full rounded-md"
//                       onClick={PayNow}
//                     >
//                       Pay Now
//                     </button>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }

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
