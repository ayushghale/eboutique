import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import api from "../../utils/api";
import { useParams } from "react-router-dom";

export default function ProductDescription() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const [image, setImage] = useState("");

  const [showDetails, setShowDetails] = useState(false);

  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`product/getProductById/${id}`);
        if (response.success) {
          setProduct(response.data);
          setImage(response.data.Images[0].url);
          console.log("Product fetched successfully:", response.data);
        } else {
          console.error("Failed to fetch category:", response.message);
        }
      } catch (error) {
        console.error("Error fetching category:", error.message);
      }
    };
    fetchProduct();
  }, []); // Empty dependency array to run the effect only once

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    // Check if the input is a valid number
    if (!isNaN(inputValue)) {
      setQuantity(inputValue);
    }
  };

  const addToCart = async () => {
    const formData = new FormData();
    formData.append("productId", id);
    formData.append("quantity", quantity);

    try {
      const response = await api.post("user/cart/add", {
        productId: id,
        quantity: quantity,
      });
      if (response.success) {
        console.log("Product added to cart successfully:", response.data);
      } else {
        console.error("Failed to add product to cart:", response.message);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  const addToFavorite = async (id) => {
    try {
      const response = await api.post(`/user/favorite/add/${id}`, {
        productId: id,
      });
      if (response.success) {
        console.log("Product added to favorite successfully:", response.data);
      } else {
        console.error("Failed to add product to favorite:", response.message);
      }
    } catch (error) {
      console.error("Error adding product to favorite:", error.message);
    }
  };

  return (
    <section className=" flex justify-center mt-8  ">
      <div className="w-[1300px]">
        <div className=" grid grid-cols-12 gap-3 px-5">
          <div className=" col-span-8 grid grid-cols-12 gap-5 ">
            <div className=" col-span-2 flex gap-3 flex-col h-[80vh] overflow-auto">
              {product.Images &&
                product.Images.map((item) => (
                  <div
                    onClick={() => setImage(item.url)}
                    key={item.id}
                    className="h-[20vh]  flex text-center justify-center"
                  >
                    <img
                      src={item.url}
                      className=" w-full object-contain object-center"
                      alt="Your Alt Text"
                    />
                  </div>
                ))}
            </div>
            <div className=" col-span-10">
              <img
                src={image}
                className=" w-full h-[80vh] object-contain object-center"
                alt="Your Alt Text"
              />
            </div>
          </div>
          <div className=" col-span-4 flex  flex-col">
            <div className="justify-center text-neutral-800 text-2xl leading-8 tracking-wide self-stretch">
              {product.name}
            </div>
            <div className="justify-center text-neutral-500 text-xs leading-4 tracking-wide underline self-stretch mt-4">
              See all Standard Cloth
            </div>
            <div className="flex w-[65px] max-w-full items-stretch gap-0 mt-3 self-start"></div>
            <div className="border-b-[color:var(--www\_urbanoutfitters\_com\_shop\_standard-cloth-stretch-boxing-short\_1920x1080\_default-Alto,#DDD)] self-stretch flex flex-col items-stretch mt-4 pt-1.5 pb-4 border-b-[0.667px] border-solid">
              <div className="justify-center text-neutral-800 text-2xl leading-8 tracking-wide">
                Rs. {product.price}
              </div>
            </div>
            {/* <div className="flex items-stretch gap-1.5 mt-5 self-start">
              <div className="justify-center text-neutral-800 text-xs font-bold leading-4 tracking-wide grow whitespace-nowrap">
                Color:
              </div>
              <div className="justify-center text-neutral-500 text-xs tracking-wide grow whitespace-nowrap">
                Cream
              </div>
            </div>
            <div className="flex w-[54px] max-w-full items-center gap-2 mt-2.5 self-start">
              <input type="color" className=" p-0 m-0" />
            </div> */}
            <div className="justify-center text-neutral-800 text-xs font-bold leading-4 tracking-wide self-stretch mt-5">
              Size*
            </div>
            <div className="self-stretch flex items-stretch gap-1.5 mt-2.5 pr-20 max-md:pr-5">
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
              value={quantity}
              onChange={handleInputChange}
            />
            <div className=""></div>
            <button
              onClick={addToCart}
              className="justify-center text-white text-center text-lg font-bold leading-6 tracking-wide whitespace-nowrap items-center border  bg-neutral-800 self-stretch mt-10 px-16 py-4 border-solid max-md:px-5"
            >
              <span href="/user/cart" className="text-white">
                Add to Bag
              </span>
            </button>
            <button
              onClick={() => addToFavorite(product.id)}
              className="justify-center text-neutral-500 text-xs tracking-wide underline self-stretch mt-6 hover:text-primary"
            >
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
                    </div>
                  </div>
                  <button
                    onClick={toggleDetails}
                    className="flex justify-normal"
                  >
                    <FontAwesomeIcon icon={showDetails ? faPlus : faMinus} />
                  </button>
                </div>
                {showDetails && (
                  <div className="">
                    <div className=" flex flex-row gap-2">
                      <div className=" text-neutral-500 text-xs l mt-7">
                        Product Sku:
                      </div>
                      <div className=" text-neutral-500 text-xs l mt-7">
                        87555355;
                      </div>
                      <div className=" text-neutral-500 text-xs l mt-7">
                        Color Code:
                      </div>
                      <div className=" text-neutral-500 text-xs l mt-7">
                        012
                      </div>
                    </div>
                    <div className="justify-center text-neutral-500 text-xs leading-4 tracking-wide mt-4">
                      Stretch boxing shorts by UO’s essential Standard Cloth
                      label.
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
                      <span className=" text-neutral-500">
                        - Elastic waistband
                      </span>
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
                      <span className=" text-neutral-500">
                        - Rise: 12.5&quot;
                      </span>
                      <br />
                      <span className=" text-neutral-500">
                        - Inseam: 2.5&quot;
                      </span>
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
                      offering great fits and leaving no detail unconsidered.
                      These
                      <br />
                      are your new favorites.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function userNotLogin() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white p-5 rounded-md w-[250px]">
        <div className=" w-[200px] aspect-square">
          <img src="/svg/Loader.gif" alt="GIF" />
        </div>
        <div className="text-center">Please wait while data is being added</div>
      </div>
    </div>
  );
}
