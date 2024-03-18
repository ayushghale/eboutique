import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
export default function OrderHistory() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <section className=" flex flex-col ">
        <header className=" text-xl  font-bold flot">My Order</header>
        <main className="mt-3">
          <section>
            <div className=" flex flex-col gap-5 p-2  ">
              <div class="grid  gap-4 p-4 bg-[#f0f0f0] rounded-md">
                <div className="w-9">
                  <FormControl sx={{  minWidth: 160 }}>
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
          <section className=" w-full ">
            <div className=" flex flex-col gap-5 p-2  ">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                <div class="grid  gap-4 p-4 bg-[#f0f0f0] rounded-md">
                  <div class="order">
                    <div class="border-b-2 border-[#ababab] pb-2">
                      <a href="##">
                        <div class=" flex justify-between">
                          <div>
                            <div class="">
                              Order Placed on: 14 Nov 2023 10:46
                            </div>
                            <div class="">
                              <span class="">Order&nbsp;</span>
                              <span class="">
                                <a class="" href="##">
                                  #206669291260638
                                </a>
                              </span>
                            </div>
                          </div>
                          <div className=" flex justify-center flex-col">
                            Manage
                          </div>
                        </div>
                      </a>
                    </div>
                    <div class="grid grid-cols-12 gap-4 mt-5">
                      <div class="item-pic col-span-2">
                        <img
                          src="tShirt.jpeg"
                          alt=""
                          className=" w-full aspect-square object-cover border-non rounded-lg overflow-hidden dark:border-gray-800"
                        />
                      </div>
                      <div class="col-span-4">
                        <div>
                          <div class="">Plain White T-shirt</div>
                          <p class="text desc"></p>
                          <p class="text desc bold"></p>
                        </div>
                      </div>
                      <div class="col-span-1">
                        <span>
                          <span class="text desc info multiply">Qty:</span>
                          <span class="text">&nbsp;1</span>
                        </span>
                      </div>
                      <div class="col-span-3">
                        <p class="capsule">Order Confirmed</p>
                      </div>
                      <a href="##" className="col-span-2">
                        <span class="pull-right text link bold info-right">
                          MORE DETAILS
                        </span>
                      </a>
                      <div class="item-info"></div>
                      <div class="clear"></div>
                    </div>
                    <div class="grid grid-cols-12 gap-4">
                      <div class="item-pic col-span-2">
                        <img
                          src="tShirt.jpeg"
                          alt=""
                          className=" w-full aspect-square object-cover border-non rounded-lg overflow-hidden dark:border-gray-800"
                        />
                      </div>
                      <div class="col-span-4">
                        <div>
                          <div class="">Plain White T-shirt</div>
                          <p class="text desc"></p>
                          <p class="text desc bold"></p>
                        </div>
                      </div>
                      <div class="col-span-1">
                        <span>
                          <span class="text desc info multiply">Qty:</span>
                          <span class="text">&nbsp;1</span>
                        </span>
                      </div>
                      <div class="col-span-3">
                        <p class="capsule">Orser conformed</p>
                      </div>
                      <a href="##" className="col-span-2">
                        <span class="pull-right text link bold info-right">
                          MORE DETAILS
                        </span>
                      </a>
                      <div class="item-info"></div>
                      <div class="clear"></div>
                    </div>
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
