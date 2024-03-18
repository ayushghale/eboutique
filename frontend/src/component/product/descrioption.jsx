import React, { useState } from "react";

export default function ProductDescription() {
  const [value, setValue] = useState(1);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Check if the input is a valid number
    if (!isNaN(inputValue)) {
      setValue(inputValue);
    }
  };
  return (
    <section className=" flex justify-center mt-8  ">
      <div className="max-w-[1224px]">
        <div className="flex max-w-[1224px] items-stretch justify-between gap-5 px-5 max-md:flex-wrap ">
          <div className="flex w-full items-stretch gap-5 self-start max-md:max-w-full max-md:flex-wrap flex-col md:flex-row">
            <div className=" flex flex-row gap-1  md:flex-col">
              <div className="h-[150px] w-[120px] bg-slate-400 flex text-center justify-center border  border-black">
                image 1
              </div>
              <div className="h-[150px] w-[120px] bg-slate-400 flex text-center justify-center">
                image 2
              </div>
              <div className="h-[150px] w-[120px] bg-slate-400 flex text-center justify-center">
                image 3
              </div>
              <div className="h-[150px] w-[120px] bg-slate-400 flex text-center justify-center">
                image 4
              </div>
              <div className="h-[150px] w-[120px] bg-slate-400 flex text-center justify-center">
                image 5
              </div>
            </div>
            <div className="flex w-[500px] grow basis-[0%] flex-col items-stretch max-md:max-w-[986px]">
              <div className="flex-col h-full co overflow-hidden relative flex  w-full pl-16 pr-4 pt-4 pb-12 items-end max-md:max-w-full max-md:pl-5">
                <img
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a50c93c7d56385e29ee4c682b3fe0b2abb693d0d84f909622e95518bfd7b8f10?apiKey=1b6f5f647c1944a984f62ecd26cb33fc&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a50c93c7d56385e29ee4c682b3fe0b2abb693d0d84f909622e95518bfd7b8f10?apiKey=1b6f5f647c1944a984f62ecd26cb33fc&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a50c93c7d56385e29ee4c682b3fe0b2abb693d0d84f909622e95518bfd7b8f10?apiKey=1b6f5f647c1944a984f62ecd26cb33fc&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a50c93c7d56385e29ee4c682b3fe0b2abb693d0d84f909622e95518bfd7b8f10?apiKey=1b6f5f647c1944a984f62ecd26cb33fc&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a50c93c7d56385e29ee4c682b3fe0b2abb693d0d84f909622e95518bfd7b8f10?apiKey=1b6f5f647c1944a984f62ecd26cb33fc&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a50c93c7d56385e29ee4c682b3fe0b2abb693d0d84f909622e95518bfd7b8f10?apiKey=1b6f5f647c1944a984f62ecd26cb33fc&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a50c93c7d56385e29ee4c682b3fe0b2abb693d0d84f909622e95518bfd7b8f10?apiKey=1b6f5f647c1944a984f62ecd26cb33fc&width=2000 2000w"
                  className="absolute w-full h-full object-cover object-center"
                  alt="Your Alt Text"
                />
              </div>
            </div>
          </div>
          <div className="flex  flex-col mt-2 w-full">
            <div className="justify-center text-neutral-800 text-2xl leading-8 tracking-wide self-stretch">
              Standard Cloth Stretch Boxing
              <br />
              Short
            </div>
            <div className="justify-center text-neutral-500 text-xs leading-4 tracking-wide underline self-stretch mt-4">
              See all Standard Cloth
            </div>
            <div className="flex w-[65px] max-w-full items-stretch gap-0 mt-3 self-start">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e97ce387086a872065868773c3af89b4b1a8a24b1f23c4b808d31e35241dba0a?apiKey=1b6f5f647c1944a984f62ecd26cb33fc&"
                className="aspect-[1.08] object-contain object-center w-full overflow-hidden shrink-0 flex-1"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/289b30da621dc25964198aa359440f8f92c6ef333c28a5ec0fb99f96dae2142d?apiKey=1b6f5f647c1944a984f62ecd26cb33fc&"
                className="aspect-[1.08] object-contain object-center w-full overflow-hidden shrink-0 flex-1"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c6a76782e6aab7ce40e30cd56c5bd528068e1e109023a89da058b4feffdb250?apiKey=1b6f5f647c1944a984f62ecd26cb33fc&"
                className="aspect-[1.08] object-contain object-center w-full overflow-hidden shrink-0 flex-1"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/56313b8108567525ede1eef73c0d42f6d0627656ebae4b77dc75a665e2db82f0?apiKey=1b6f5f647c1944a984f62ecd26cb33fc&"
                className="aspect-[1.08] object-contain object-center w-full overflow-hidden shrink-0 flex-1"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fbf04e0e1da1a99dda38b59fd4e0289e3eb855dcaa6d8ac2bb101c4a3f676a9?apiKey=1b6f5f647c1944a984f62ecd26cb33fc&"
                className="aspect-[1.08] object-contain object-center w-full overflow-hidden shrink-0 flex-1"
              />
            </div>
            <div className="border-b-[color:var(--www\_urbanoutfitters\_com\_shop\_standard-cloth-stretch-boxing-short\_1920x1080\_default-Alto,#DDD)] self-stretch flex flex-col items-stretch mt-4 pt-1.5 pb-4 border-b-[0.667px] border-solid">
              <div className="justify-center text-neutral-800 text-2xl leading-8 tracking-wide">
                $49.00
              </div>
            </div>
            <div className="flex items-stretch gap-1.5 mt-5 self-start">
              <div className="justify-center text-neutral-800 text-xs font-bold leading-4 tracking-wide grow whitespace-nowrap">
                Color:
              </div>
              <div className="justify-center text-neutral-500 text-xs tracking-wide grow whitespace-nowrap">
                Cream
              </div>
            </div>
            <div className="flex w-[54px] max-w-full items-center gap-2 mt-2.5 self-start">
              <input type="color" className=" p-0 m-0" />
            </div>
            <div className="justify-center text-neutral-800 text-xs font-bold leading-4 tracking-wide self-stretch mt-5">
              Size*
            </div>
            <div className="self-stretch flex items-stretch justify-between gap-1.5 mt-2.5 pr-20 max-md:pr-5">
              <button className=" border p-2 text-xs text-[#929292] aspect-square h-[38px]  border-solid hover:text-black hover:border-black">
                XS
              </button>
              <button className=" border p-2 text-xs text-[#929292] aspect-square h-[38px]  border-solid hover:text-black hover:border-black">
                S
              </button>
              <button className=" border p-2 text-xs text-[#929292] aspect-square h-[38px]  border-solid hover:text-black hover:border-black">
                M
              </button>
              <button className=" border p-2 text-xs text-[#929292] aspect-square h-[38px]  border-solid hover:text-black hover:border-black">
                L
              </button>
              <button className=" border p-2 text-xs text-[#929292] aspect-square h-[38px]  border-solid hover:text-black hover:border-black">
                XL
              </button>
              <button className=" border p-2 text-xs text-[#929292] aspect-square h-[38px]  border-solid hover:text-black hover:border-black">
                XXL
              </button>
            </div>
            
            <div className="justify-center text-neutral-800 text-xs font-bold leading-4 tracking-wide self-stretch mt-6">
              Qty*
            </div>
            <input
              type="text"
              className=" justify-center text-neutral-800 text-base leading-5 tracking-wide whitespace-nowrap border  bg-white w-[100px] max-w-full mt-2 pl-4 pr-16 py-4 rounded-md border-solid self-start items-start max-md:pr-5"
              value={value}
              onChange={handleInputChange}
            />
            <button className="justify-center text-white text-center text-lg font-bold leading-6 tracking-wide whitespace-nowrap items-center border  bg-neutral-800 self-stretch mt-10 px-16 py-4 border-solid max-md:px-5">
              <a href="/user/cart" className="text-white">

              Add to Bag
              </a>
            </button>
            <button className="justify-center text-neutral-500 text-xs tracking-wide underline self-stretch mt-6">
              Add to Wish List
            </button>

            <div className="justify-center text-neutral-500 text-xs leading-4 tracking-wide self-center mt-3">
              Please select a color and size for Store Pickup options
            </div>
            <div className="justify-center items-stretch self-stretch flex flex-col mt-9 border-t-[0.667px] border-solid">
              <div className="flex flex-col items-stretch py-6 border-b-[0.667px] border-solid">
                <div className="flex w-full items-stretch justify-between gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex grow basis-[0%] flex-col items-stretch self-start">
                      <div className="justify-center text-neutral-800 text-sm leading-5 tracking-wide whitespace-nowrap">
                        Details
                      </div>
                      <div className="justify-center text-neutral-500 text-xs leading-4 tracking-wide whitespace-nowrap mt-7">
                        Product Sku:
                      </div>
                    </div>
                    <div className="justify-center text-neutral-500 text-xs leading-4 tracking-wide mt-10 self-end">
                      87555355;
                    </div>
                    <div className="justify-center text-neutral-500 text-xs leading-4 tracking-wide mt-10 self-end">
                      Color Code:
                    </div>
                    <div className="justify-center text-neutral-500 text-xs leading-4 tracking-wide grow whitespace-nowrap mt-10 self-end">
                      012
                    </div>
                  </div>
                  <button className="bg-neutral-800 flex w-[11px] shrink-0 h-px flex-col mt-1.5 self-start" />
                </div>
                <div className="justify-center text-neutral-500 text-xs leading-4 tracking-wide mt-4">
                  Stretch boxing shorts by UO’s essential Standard Cloth label.
                  <br />
                  Features a stretch nylon fabrication. Topped with a woven
                  <br />
                  logo label at the front. Easy wear with a stretch elastic
                  <br />
                  waistband. Urban Outfitters exclusive.
                </div>
                <div className="justify-center text-neutral-500 text-xs font-bold leading-4 tracking-wide mt-5">
                  Features
                  <br />
                  <span className=" text-neutral-500">
                    - Stretch boxing shorts from Standard Cloth
                  </span>
                  <br />
                  <span className=" text-neutral-500">
                    - Stretch nylon with an allover pattern
                  </span>
                  <br />
                  <span className=" text-neutral-500">- Elastic waistband</span>
                  <br />
                  <span className=" text-neutral-500">- UO exclusive</span>
                </div>
                <div className="justify-center text-neutral-500 text-xs font-bold leading-4 tracking-wide mt-5">
                  Content + Care
                  <br />
                  <span className=" text-neutral-500">
                    - 90% Nylon, 10% elastane
                  </span>
                  <br />
                  <span className=" text-neutral-500">- Machine wash</span>
                  <br />
                  <span className=" text-neutral-500">- Imported</span>
                </div>
                <div className="justify-center text-neutral-500 text-xs font-bold leading-4 tracking-wide mt-4">
                  Size + Fit
                  <br />
                  <span className=" text-neutral-500">
                    - Model is wearing size Medium
                  </span>
                  <br />
                  <span className=" text-neutral-500">
                    - Measurements taken from size Medium
                  </span>
                  <br />
                  <span className=" text-neutral-500">- Rise: 12.5&quot;</span>
                  <br />
                  <span className=" text-neutral-500">- Inseam: 2.5&quot;</span>
                  <br />
                  <span className=" text-neutral-500">
                    - Leg opening: 12.5&quot;
                  </span>
                </div>
                <div className="justify-center text-neutral-500 text-xs font-bold leading-4 tracking-wide mt-6">
                  Standard Cloth
                </div>
                <div className="justify-center text-neutral-500 text-xs leading-4 tracking-wide mt-5">
                  Standard Cloth is committed to using quality materials,
                  <br />
                  offering great fits and leaving no detail unconsidered. These
                  <br />
                  are your new favorites.
                </div>
                <div className="flex items-center justify-between gap-5 mt-8">
                  <div className="justify-center text-neutral-500 text-xs leading-3 my-auto">
                    Was this product information helpful?
                  </div>
                  <div className="self-stretch flex items-stretch justify-between gap-2">
                    <div className="justify-center text-neutral-500 text-center text-xs leading-3 whitespace-nowrap items-stretch rounded border bg-white aspect-[2.782608695652174] px-5 py-2 border-solid">
                      Yes
                    </div>
                    <div className="justify-center text-neutral-500 text-center text-xs leading-3 whitespace-nowrap items-stretch rounded borderbg-white aspect-[2.5217391304347827] px-5 py-2 border-solid">
                      No
                    </div>
                  </div>
                </div>
              </div>
              <div className="justify-between items-stretch flex gap-5 py-6 border-b-[0.667px] border-solid">
                <div className="justify-center text-neutral-800 text-sm leading-5 tracking-wide">
                  Shipping + Returns
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e18bee7be7ba83c71ac078cd84b66b7a30a684f00343b01e3b0157496941119?apiKey=1b6f5f647c1944a984f62ecd26cb33fc&"
                  className="aspect-square object-contain object-center w-[11px] overflow-hidden shrink-0 max-w-full self-start"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
