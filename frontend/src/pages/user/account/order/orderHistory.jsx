import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import api from "../../../../utils/api";

export default function OrderHistory() {
  const id = sessionStorage.getItem("userData");

  const [OrderHistory, setOrderHistory] = useState([]);
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await api.get(`user/order/find/${id}`);
        if (response && response.data) {
          setOrderHistory(response.data);
        } else {
          console.error("Failed to fetch orders:", response.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrderData();
  }, [id]);

  return (
    <>
      <section className="flex flex-col">
        <header className="text-xl font-bold float">My Order</header>
        <main className="mt-3">
          <section>
            <div className="flex flex-col gap-5 p-2">
              <div className="grid gap-4 p-4 bg-[#f0f0f0] rounded-md">
                <div className="w-9">
                  <FormControl sx={{ minWidth: 160 }}>
                    <Select
                      value={age}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      className=""
                    >
                      <MenuItem value="">
                        <em>Filter by</em>
                      </MenuItem>
                      <MenuItem value={1}>Recent order</MenuItem>
                      <MenuItem value={2}>High to Low</MenuItem>
                      <MenuItem value={3}>Low to High</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full">
            <div className="flex flex-col gap-5 p-2">
              {OrderHistory.map((order) => (
                <div key={order.id} className="grid gap-4 p-4 bg-[#f0f0f0] rounded-md">
                  <div className="order">
                    <div className="border-b-2 border-[#ababab] pb-2">
                      <a href="##">
                        <div className="flex justify-between">
                          <div>
                            <div>Order Placed on: {new Date(order.createdAt).toLocaleDateString()}</div>
                            <div>
                              <span>Order&nbsp;</span>
                              <span>
                                <a href="##">#{order.id}</a>
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-center flex-col">Manage</div>
                        </div>
                      </a>
                    </div>
                    {order.OrderDetails.map((orderDetail) => (
                      <div key={orderDetail.id} className="grid grid-cols-12 gap-4 mt-5">
                        <div className="item-pic col-span-2">
                          <img
                            src={orderDetail.Product.Images[0].url}
                            alt=""
                            className="max-w-19 aspect-square object-cover border-non rounded-lg overflow-hidden dark:border-gray-800"
                          />
                        </div>
                        <div className="col-span-4">
                          <div>
                            <div>{orderDetail.Product.name}</div>
                            <p className="text desc"></p>
                            <p className="text desc bold"></p>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <span>
                            <span className="text desc info multiply">Qty:</span>
                            <span className="text">&nbsp;{orderDetail.quantity}</span>
                          </span>
                        </div>
                        <div className="col-span-3">
                          <p className="capsule">Order Confirmed</p>
                        </div>
                        <a href="##" className="col-span-2">
                          <span className="pull-right text link bold info-right">MORE DETAILS</span>
                        </a>
                        <div className="item-info"></div>
                        <div className="clear"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </section>
    </>
  );
}
