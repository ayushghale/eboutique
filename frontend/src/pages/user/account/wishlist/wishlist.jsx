import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCartShopping,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import api from "../../../../utils/api";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const id = sessionStorage.getItem("userData");

  const fetchFavourite = async () => {
    try {
      const response = await api.get(`/user/favorite/${id}`);
      if (response.success) {
        setWishlist(response.data.reverse());
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishlist = async (id) => {
    try {
      const response = await api.get(`/user/favorite/delete/${id}`);
      if (response) {
        console.log(response);
        fetchFavourite();
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFavourite();
  }, [id]);

  return (
    <>
      <section className="flex flex-col">
        <header className="text-xl font-bold flot">My Wishlist</header>
        <main className="mt-3">
          <section className="w-full">
            <div className="flex flex-col gap-5 p-2">
              {wishlist.length === 0 ? (
                <div className="text-center text-lg text-gray-500 w-full  flex justify-center ">
                  <div className="border  p-3 border-gray">
                    <p>Your wishlist is empty</p>
                  </div>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item.Product.id} // Added key prop for each item
                    className="grid gap-4 p-4 bg-[#f0f0f0] rounded-md"
                  >
                    <div>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-1">
                          <img
                            src={item.Product.Images[0].url}
                            alt=""
                            className="w-full aspect-square object-cover border-non rounded-lg overflow-hidden dark:border-gray-800"
                          />
                        </div>
                        <div className="col-span-4">
                          <div>{item.Product.name}</div>
                        </div>
                        <div className="col-span-3">
                          <span>
                            <span className="text desc info multiply">
                              Price:
                            </span>
                            <span className="text">
                              &nbsp; Rs.{item.Product.price}
                            </span>
                          </span>
                        </div>
                        <div className="col-span-3">
                          <button className="bg-primary px-5 flex flex-row py-2 rounded-md text-white gap-2">
                            <FontAwesomeIcon icon={faPlus} />
                            <FontAwesomeIcon icon={faCartShopping} />
                          </button>
                        </div>
                        <div className="col-span-1 w-full">
                          <button
                            onClick={() => removeWishlist(item.id)}
                            className="bg-primary px-5 flex flex-row-reverse py-2 rounded-md text-white gap-2"
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </section>
    </>
  );
}
