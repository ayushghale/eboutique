import React from "react";
import { Rating } from "@mui/material";

export default function OrderHistory() {
  const [value, setValue] = React.useState(1);
  return (
    <>
      <section className=" flex flex-col ">
        <header className=" text-xl  font-bold flot">Add review</header>
        <main className="mt-3">
          <section className=" w-full ">
            <div className=" flex flex-col gap-5 p-2  ">
              <div class="grid  gap-4 p-4 bg-offWhite rounded-md">
                <div class="order">
                  <div class="grid grid-cols-12 gap-4 mt-5">
                    <div class="item-pic col-span-2">
                      <img
                        src="/user/tShirt.jpeg"
                        alt=""
                        className=" w-full aspect-square object-cover border-non rounded-lg overflow-hidden dark:border-gray-800"
                      />
                    </div>
                    <div class="col-span-8">
                      <div className=" h-full  flex flex-col justify-center ">
                        <div class="">Plain White T-shirt</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* rating */}
              <div class="grid  gap-4 p-4 bg-[#f0f0f0] rounded-md">
                <div class="order">
                  <div class="grid grid-cols-12 gap-4 ">
                    <div className="">
                      <div className=" text-xl font-semibold pb-2">Rating</div>
                      <div>
                        <Rating
                          name="simple-controlled"
                          value={value}
                          size="large"
                          onChange={(event, newValue) => {
                            setValue(newValue);

                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* review */}
              <div class="grid  gap-4 p-4 bg-[#f0f0f0] rounded-md">
                <div class="order">
                  <div class="grid grid-cols-1 gap-4 ">
                    <div className="">
                      <div className=" text-xl font-semibold pb-2">Review</div>
                      <div className="w-full ">
                        <textarea
                          id="message"
                          rows="4"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg  "
                          placeholder="Write your thoughts here..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* submit */}
              <div class="grid  gap-4 p-4 bg-[#f0f0f0] rounded-md">
                <div class="order">
                  <div class="grid grid-cols-1 gap-4 ">
                    <div className="">
                      <button className=" text-xl font-semibold p-2 w-full rounded-md bg-[#ea5a0cdf] text-white hover:bg-[#ea580c] duration-200">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  );
}
