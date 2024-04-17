import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
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
              {[1, 2, 3, 4].map((index) => (
                <div class="grid  gap-4 p-4 bg-[#f0f0f0] rounded-md">
                  <div class="order">
                    
                    <div class="grid grid-cols-12 gap-4 mt-5">
                      <div class="item-pic col-span-2">
                        <img
                          src="tShirt.jpeg"
                          alt=""
                          className=" max-w-19 aspect-square object-cover border-non rounded-lg overflow-hidden dark:border-gray-800"
                        />
                      </div>
                      <div class="col-span-8">
                        <div className=" h-full  flex flex-col justify-center ">
                          <div class="">Plain White T-shirt</div>
                        </div>
                      </div>
                      
                      
                      <a href="/user/Review/add" className="col-span-2">
                        <span class="h-full  flex flex-col justify-center ">
                          Add review
                        </span>
                      </a>
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
