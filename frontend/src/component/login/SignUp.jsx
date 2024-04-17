import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function SignUpForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors("");

    // Check if all fields are filled
    if (!name || !email || !password) {
      setErrors("Please fill in all the fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors("Please enter a valid email address");
      return;
    }

    // Validate password strength (e.g., minimum length)
    if (password.length < 0) {
      setErrors("Password must be at least 6 characters long");
      return;
    }

    // Create a new FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("password", password);

    try {
      // Send a POST request to the API using the FormData object
      const response = await api.register("register", formData);
      // Check if the request was successful (status code 2xx)
      if (response) {
        // If successful, redirect the user to the dashboard page
        console.log("response", response);
        console.log(response.data.emailVerification);
        navigate(`/OtpVerification/${response.data.emailVerification}`);
      } else {
        console.log("response", response.data.message);
      }
    } catch (error) {
      // If an error occurred, log it to the console
      console.log("error wile registering");
      setErrors(error.response.data.message);
    }
  };

  return (
    <div className="form-container sign-up-container text-center">
      <form onSubmit={handleSubmit}>
        <h1 className="py-5">Create Account</h1>
        {errors && <p className="text-red-600">{errors}</p>}
        <div className="w-full">
          <h2 className="text-sm text-gray-500 inset-y-0 left-0 text-left">
            Name
          </h2>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md focus:outline-none h-[45px]"
            placeholder="Name"
          />
          <h2 className="text-sm text-gray-500 inset-y-0 left-0 text-left">
            Address
          </h2>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="rounded-md focus:outline-none h-[45px]"
            placeholder="Address"
          />
          <h2 className="text-sm text-gray-500 inset-y-0 left-0 text-left">
            Phone Number
          </h2>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="rounded-md focus:outline-none h-[45px]"
            placeholder="Phone Number"
          />
          <h2 className="text-sm text-gray-500 inset-y-0 left-0 text-left">
            Email
          </h2>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md focus:outline-none h-[45px]"
            placeholder="Email"
          />
          <h2 className="text-sm text-gray-500 inset-y-0 left-0 text-left">
            Password
          </h2>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md focus:outline-none h-[45px]"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="mt-4">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
