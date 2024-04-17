import React, { useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function EmailVerification() {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { token } = useParams();

  const location = useLocation();
  const email = location.state?.email;

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleKeyPress = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /^[0-9]$/;

    if (!regex.test(keyValue)) {
      e.preventDefault();
    }
  };

  const resendOTP = () => {
    console.log("Resend OTP", email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const code = inputRefs.map((ref) => ref.current.value).join("");

    if (code.length !== 4) {
      setError("Please enter a 4-digit token");
      return;
    }

    const formData = new FormData();
    formData.append("otpCode", code);

    try {
      const response = await api.verifyToken("verify-otp", token, formData);
      if (response.success === true) {

        if (response.data.type === "forgetpassword") {
          navigate(`/ChangePassword/${response.data.newURl}`, {
            state: { email: email },
          });
        }else{
          navigate(`/login`);
        }
      } else {
        setError("Email is not registered");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-5 rounded-lg shadow-lg w-[400px]">
          <h1 className="text-2xl font-bold text-center py-3">
            Email Verification
          </h1>
          <p className="text-center pb-3">
            Check your email for the verification token. <br /> Enter the
            4-digit token below.
          </p>
          {error && <p className="text-red-600 text-center">{error}</p>}

          <div className="grid gap-4 w-full">
            <div className="grid grid-cols-4 gap-2 w-full py-3">
              {inputRefs.map((ref, index) => (
                <input
                  key={index}
                  ref={ref}
                  className="text-center col-span-1 border border-gray py-4"
                  maxLength="1"
                  onChange={(e) => handleChange(index, e)}
                  onKeyPress={handleKeyPress}
                  type="tel"
                  placeholder="x"
                />
              ))}
            </div>
            <button
              className="w-full bg-slate-700 hover:bg-black text-white py-3 rounded-md"
              onClick={handleSubmit}
            >
              Verify Email
            </button>
          </div>
          <p className="text-center pt-3">
            <span className="font-semibold">Didn't receive the token?</span>{" "}
            <button
              onClick={resendOTP}
              className="hover:text-primary font-semibold"
            >
              Resend token
            </button>
          </p>
          <p className="text-center pt-3">
            <button
              onClick={resendOTP}
              className="hover:text-primary font-semibold"
            >
              Change email address
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
