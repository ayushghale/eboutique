import React from "react";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Card({ productData }) {
  const navigator = useNavigate();

  const productDescription = (id) => {
    navigator("/product/description/" + id);
  };

  return (
    <>
      {productData &&
        productData.map((product) => (
          <div
            className="cartGroup w-full md:w-full rounded-xl bg-white pb-3 relative group"
            key={product.name}
            onClick={() => productDescription(product.id)}
            style={{
              boxShadow: "10px 10px 54px #bababa,-10px -10px 54px #ffffff",
            }}
          >
            <div className="h-full flex gap-3 flex-row group-hover:text-primary">
              <div className="flex flex-col w-full ">
                <div className="w-full p-3">
                  <img
                    src={product.Images[0].url}
                    alt={product.name}
                    className="w-full aspect-square object-cover border-non rounded-lg overflow-hidden dark:border-gray-800"
                  />
                </div>
                <div className="px-3">
                  <h3 className="text-sm font-bold text-gray cursor-pointer">
                    {product.category}
                  </h3>
                  <h2 className="font-semibold text-lg cursor-pointer capitalize">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Rating
                        name="size-small"
                        value={product.rating}
                        readOnly
                        size="small"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray cursor-pointer group-hover:text-primary">
                    Rs. {product.price}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
