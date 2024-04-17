import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function EmailVerification() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  

  const OtpVerification = (token) => {
    navigate(`/OtpVerification/${token}`, {
      state: { email: email },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await api.verifyEmail("forgot-password", formData);
      if (response) {
        OtpVerification(response.data.jwtToken);
        return;
      } else {
        setError("Email is not registered");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div className=" w-screen h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-5 rounded-lg shadow-lg w-[400px] h-auto ">
          <h1 className="text-2xl font-bold text-center py-3">
            Forget Password
          </h1>
          <p className="text-center pb-3">
            Enter your email to receive a verification code
          </p>

          <div className="grid gap-4 w-full pb-4 ">
            <div className="grid grid-cols-4 gap-2 w-full py-3">
              {error && (
                <span className="col-span-4 text-red-600">{error}</span>
              )}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Your email "
                className=" border border-gray-300 rounded-md p-2 col-span-4 w-full focus:outline-none"
              />
            </div>
            <button
              className="w-full bg-slate-700 hover:bg-black text-white py-3 rounded-md"
              onClick={handleSubmit}
            >
              Verify Email
            </button>
          </div>
          <a
            href="/login"
            className=" flex justify-center items-center gap-3 hover:text-primary"
          >
            {" "}
            <FontAwesomeIcon icon={faArrowLeft} />
            Return Back
          </a>
        </div>
      </div>
    </div>
  );
}
