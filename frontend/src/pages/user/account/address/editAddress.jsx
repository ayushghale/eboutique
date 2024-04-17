import React, { useState, useEffect } from "react"; // fixed typo here

import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../utils/api";

export default function EditAddress() {
  const { id } = useParams();
  const navigator = useNavigate();

  const [addressData, setAddressData] = useState();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [type, setType] = React.useState("");
  const [defaultAddress, setDefaultAddress] = React.useState("");

  const [error, setError] = React.useState("");

  const formCheck = () => {
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      address === "" ||
      city === "" ||
      country === "" ||
      type === ""
    ) {
      setError("Please fill all the fields");
      return false;
    } else if (phone.length < 10) {
      setError("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const formValues = (addressData) => {
    setName(addressData.name);
    setEmail(addressData.email);
    setPhone(addressData.phoneNumber);
    setAddress(addressData.address);
    setCity(addressData.city);
    setCountry(addressData.country);
    setType(addressData.type);
    setDefaultAddress(addressData.isDefault);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formCheck()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNumber", phone);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("type", type);
    formData.append("isDefault", defaultAddress);
    try {
      const response = await api.post(`user/loaction/update/${id}`, formData);
      if (response.success) {
        console.log(response);
        clearForm();
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCity("");
    setCountry("");
    setType("");
    setDefaultAddress("");
  };

  useEffect(() => {
    // fixed typo here
    // fetch address data

    console.log(id);
    const fetchAddress = async () => {
      try {
        const response = await api.get(`/user/loaction/edit/${id}`); // fixed typo here
        if (response.success) {
          setAddressData(response.data);
          formValues(response.data);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddress();
  }, [id]); // added id as dependency to re-fetch data when id changes

  const addressPage = () => {
    // removed id parameter here since it's not used
    navigator("/user/address");
  };

  return (
    <>
      <section className=" flex flex-col ">
        <div className=" flex justify-between">
          <header className=" text-2xl  font-bold flot">
            Edit Address : {id}
          </header>
        </div>

        <main className="mt-3">
          <section className=" w-full pt-3  ">
            {/* address info */}
            <div className="  bg-whiten py-5 px-4  ">
              <div className="">
                <div action="" className=" grid grid-cols-2  gap-6">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Full Name"
                      className="p-2 focus:border focus:border-gray rounded-md"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="p-2 focus:border focus:border-gray rounded-md"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Phone Number"
                      className="p-2 focus:border focus:border-gray rounded-md"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Address"
                      className="p-2 focus:border focus:border-gray rounded-md"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                      className="p-2 focus:border focus:border-gray rounded-md"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      placeholder="Country"
                      className="p-2 focus:border focus:border-gray rounded-md"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="type">Type</label>
                    <div />
                    <select
                      name="type"
                      id="type"
                      className="p-2 focus:border focus:border-gray rounded-md"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="home">Home</option>
                      <option value="office">Office</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="default">Default</label>
                    <div />
                    <select
                      name="default"
                      id="default"
                      className="p-2 focus:border focus:border-gray rounded-md"
                      value={defaultAddress}
                      onChange={(e) => setDefaultAddress(e.target.value)}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div className="">
                    <button
                      onClick={handleSubmit}
                      className="bg-primary hover:bg-primary-dark text-white p-2 rounded-md"
                    >
                      edit Address
                    </button>
                  </div>
                  <div className=" flex flex-row-reverse">
                    <button
                      className="bg-black hover:bg-primary text-white p-2 px-3 rounded-md"
                      onClick={addressPage}
                    >
                      Cancel
                    </button>
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
