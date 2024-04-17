import React,{useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Card from "../product/card.jsx";
import api from "../../utils/api.js";

// CartContext.js


// BestSelling.js
export default function BestSelling() {
  const [product, setProduct] = useState([]);

  const productFetch = async () => {
    try {
      const response = await api.get("product/getAllProducts");
      if (response.success) {
        setProduct(response.data); // Update state with the data array from the response

        console.log("Product fetched successfully:", response.data);
      } else {
        console.error("Failed to fetch category:", response.message);
      }
    } catch (error) {
      console.error("Error fetching category:", error.message);
    }
  };

  useEffect(() => {
    productFetch();
  }, []);

  return (
    <>
      <section className="bg-white flex flex-col justify-center">
        <div className="self-center w-full max-w-[1224px] items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <div className="flex justify-between py-9">
            <h1 className="text-2xl font-semibold">BestSelling</h1>
            <div className="flex flex-row justify-center gap-2 hover:text-primary">
              <button className="text-2xl font-semibold capitalize">
                More
              </button>
              <div className="flex justify-center flex-col">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-xl font-semibold"
                />
              </div>
            </div>
          </div>
          <section>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card productData={product} />
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
