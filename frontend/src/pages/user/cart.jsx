import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      title: "T-Shirt",
      price: 15.99,
      quantity: 2,
      image: "tShirt.jpeg",
    },
    { id: 2, title: "Jeans", price: 29.99, quantity: 1, image: "tShirt.jpeg" },
    {
      id: 3,
      title: "Sneakers",
      price: 49.99,
      quantity: 1,
      image: "tShirt.jpeg",
    },
    { id: 4, title: "Shoes", price: 49.99, quantity: 1, image: "tShirt.jpeg" },
  ]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate total price
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cart]);

  const handleRemove = (id) => {
    // Remove item from cart
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const handleQuantity = (id, type) => {
    // Update quantity of item in cart
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              type === "increase"
                ? item.quantity + 1
                : Math.max(item.quantity - 1, 1),
          }
        : item
    );
    setCart(updatedCart);
  };

  return (
    <section className=" bg-white flex flex-col  justify-center mt-6">
      <div className="self-center w-full max-w-[1224px] items-stretch justify-between gap-5  max-md:max-w-full max-md:flex-wrap">
        <div>
          <h1 className=" text-2xl font-semibold">Cart</h1>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className=" col-span-3">
            <div className="grid grid-row-12 gap-4 ">
              {cart.map((item) => (
                <div className="order  bg-slate-300 rounded-lg p-2">
                  <div className="grid grid-cols-5 gap-4">
                    <div className="item-pic col-span-1 ">
                      <img
                        src={item.image}
                        alt=""
                        className=" w-full aspect-square object-cover border-non rounded-lg overflow-hidden dark:border-gray-800"
                      />
                    </div>
                    <div className="col-span-4">
                      <div className=" h-full  flex flex-col justify-center ">
                        <div className="flex justify-between text-lg font-semibold">
                          <div className="flex justify-center flex-col">
                            {item.title}
                          </div>
                          <div className="flex justify-center flex-col">
                            <div className="text-sm">Price: ${item.price}</div>
                          </div>
                          <div className="flex flex-row gap-2">
                            <div className="text-sm flex justify-center flex-col">
                              Quantity:{" "}
                            </div>
                            <button
                              onClick={() =>
                                handleQuantity(item.id, "increase")
                              }
                              className=" flex justify-center  bg-primary  text-white "
                            >
                              <FontAwesomeIcon icon={faPlus} className="p-2" />
                            </button>
                            <p className="flex justify-center flex-col px-2 bg-white ">
                              {item.quantity}
                            </p>
                            <button
                              onClick={() =>
                                handleQuantity(item.id, "decrease")
                              }
                              className=" flex justify-center  bg-primary  text-white "
                            >
                              <FontAwesomeIcon icon={faMinus} className="p-2" />
                            </button>
                          </div>
                          <div className="flex justify-center flex-col">
                            <div className="text-sm">
                              Total: Rs. {(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                          <div className="flex justify-center flex-col ">
                            <button onClick={() => handleRemove(item.id)} 
                            className="px-2 bg-primary text-white rounded-md">
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
          <div className=" col-span-1">
            <div className=" h-auto bg-slate-300 rounded-md p-2">
              <div className="h-auto  flex justify-center text-2xl font-semibold border-b-2 pb-2 border-indigo-300 ">
                <h1>Order Total</h1>
              </div>
              <div className=" flex gap-2 flex-col pt-3 text-lg">
                <div className="flex justify-between">
                  <div>Subtotal</div>
                  <div>Rs. {total.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div>Shipping</div>
                  <div>Free</div>
                </div>
                <div className="flex justify-between">
                  <div>Tax</div>
                  <div>Rs. {(total * 0.1).toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div>Total</div>
                  <div>Rs. {(total * 1.1).toFixed(2)}</div>
                </div>
                <div className="flex justify-center">
                  <button className="bg-primary text-white p-2 w-full rounded-md">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
