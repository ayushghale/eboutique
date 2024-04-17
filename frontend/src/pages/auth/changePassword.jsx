import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [error, setError] = useState("");
  const { token } = useParams();

  const FormValidation = () => {
    clearError();
    if (!newPassword && !confirmPassword) {
      setNewPasswordError("New Password is required");
      setConfirmPasswordError("Confirm Password is required");
      setError("New Password and Confirm Password is required");
      return false;
    }

    if (!newPassword) {
      setNewPasswordError("New Password is required");
      setError("New Password is required");
      return false;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      setError("Confirm Password is required");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setNewPasswordError("Password does not match");
      setConfirmPasswordError("Password does not match");
      setError("Password does not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    FormValidation();


    const formData = new FormData();
    formData.append("password", newPassword);

    try {
      const response = await api.verifyToken("reset-password",token, formData);
      if (response) {

        navigate("/login");
      } else {
        setError("Email is not registered");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const clearError = () => {
    setError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
  }

  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-5 rounded-lg shadow-lg w-[400px] h-auto">
          <h1 className="text-2xl font-bold text-center py-3">
            Change Password
          </h1>
          <p className="text-center pb-3">Enter your new password below</p>

          <div className="grid grid-cols-4 gap-4 w-full pb-4">
            {error && (
              <span className="col-span-4 text-red-600 text-center">{error}</span>
            )}

            <div className="flex gap-2 flex-col col-span-4">
              <div className="grid grid-cols-4 gap-2 w-full">
                <label htmlFor="New Password" className="col-span-4">
                  New Password
                </label>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  placeholder="Enter Your new password"
                  className={`border border-gray-300 rounded-md p-2 col-span-4 w-full focus:outline-none ${
                    newPasswordError ? "border-red-500" : ""
                  }`}
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2 w-full">
                <label htmlFor="Confirm Password" className="col-span-4">
                  Confirm Password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm Your new password"
                  className={`border border-gray-300 rounded-md p-2 col-span-4 w-full focus:outline-none ${
                    confirmPasswordError ? "border-red-500" : ""
                  }`}
                />
              </div>
             
              <button
                className="w-full bg-slate-700 hover:bg-black text-white py-3 rounded-md mt-3"
                onClick={handleSubmit}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
