import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../utils/api";
export default function Address() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [type, setType] = React.useState("");
  const [defaultAddress, setDefaultAddress] = React.useState("");

  const [error, setError] = React.useState("");

  const fomrCheck = () => {
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

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    console.log(name, phone, address, city, country, type, defaultAddress);
    if (!fomrCheck()) {
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
      const response = await api.post(`user/loaction/add`, formData);
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

  const navigator = useNavigate();
  const addressPage = (id) => {
    navigator("/user/address");
  };
  return (
    <>
      <section className=" flex flex-col ">
        <div className=" flex justify-between">
          <header className=" text-2xl  font-bold flot">Add Address</header>
        </div>

        <main className="mt-3">
          <section className=" w-full pt-3  ">
            {/* address info */}
            <div className="  bg-whiten py-5 px-4  ">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-3 text-center">
                  <strong className="font-bold">Error ! </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div action="" className=" grid grid-cols-2  gap-6">
                {/* name */}
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
                {/* email */}
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
                {/* phone number  */}
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
                {/* Address */}
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
                {/* City */}
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
                {/* Country */}
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
                {/* Type */}
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
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>
              <div className=" grid grid-cols-2 mt-6">
                <div className=" ">
                  <button
                    onClick={handleSubmit}
                    className="bg-primary hover:bg-primary-dark text-white p-2 rounded-md"
                  >
                    Add Address
                  </button>
                </div>
                <div className=" flex flex-row-reverse">
                  <button
                    onClick={addressPage}
                    className="bg-black hover:bg-primary text-white p-2 px-3 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  );
}
