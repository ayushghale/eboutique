import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from "../../../../utils/api";

export default function Address() {
  const [addressData, setAddressData] = useState([]);

  const id = sessionStorage.getItem("userData");

  useEffect(() => {
    // fetch address data
    const fetchAddress = async () => {
      try {
        const response = await api.get(`user/loaction/${id}`);
        if (response.success) {
          setAddressData(response.data.reverse()); // Reverse the data before setting
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddress();
  }, []);

  const navigator = useNavigate();

  // function to add new address
  const AddAddress = () => {
    navigator("/user/address/add");
  };

  const editAddress = (id) => {
    navigator("/user/address/edit/" + id);
  };

  return (
    <>
      <section className="flex flex-col">
        <div className="flex justify-between">
          <header className="text-2xl font-bold flot">
            Manage my Address
          </header>
          <div className="flex flex-col justify-center">
            <button className="hover:text-primary" onClick={AddAddress}>
              <FontAwesomeIcon icon={faPlus} className="pr-1" /> Add New
              Address
            </button>
          </div>
        </div>

        <main className="mt-3">
          <section
            className="w-full h-[500px] overflow-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#888 transparent",
              MsOverflowStyle: "none",
              scrollbarTrackColor: "#f1f1f1",
              scrollbarFaceColor: "#888",
            }}
          >
            {/* address info */}
            <div className="bg-whiten p-2">
              <div class="grid grid-cols-2 gap-4">
                {/* user address data */}

                {addressData.map((address) => (
                  <div
                    className="border border-warning p-2 flex gap-1 flex-col"
                    key={address.id}
                  >
                    <div className="capitalize flex justify-between">
                      <p>{address.name}</p>
                      <button
                        type="button"
                        className="pl-3 text-primary"
                        onClick={() => editAddress(address.id)}
                      >
                        EDIT
                      </button>
                    </div>
                    <div>{address.phoneNumber}</div>
                    <div>{address.email}</div>
                    <div>{address.address}</div>
                    <div></div>
                    <div className="flex gap-3">
                      <small className="bg-primary py-1 px-2 text-white rounded-md">
                        {address.type}
                      </small>

                      {address.isDefault && (
                        <small className="bg-primary py-1 px-2 text-white rounded-md">
                          DEFAULT DELIVERY ADDRESS
                        </small>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  );
}
