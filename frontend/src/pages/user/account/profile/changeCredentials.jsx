import React, { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import api from "../../../../utils/api";
export default function ChangeCredentials() {
  const navigator = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState();
  const { id } = useParams();

  const formCheck = () => {
    if (
      newPassword === "" ||
      conformPassword === "" ||
      currentPassword === ""
    ) {
      setError("All fields are required");
      return false;
    } else if (newPassword !== conformPassword) {
      setError("Password does not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formCheck()) {
      return;
    }

    const formData = new FormData();
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    formData.append("conformPassword", conformPassword);


    try {
      const response = await api.post(`user/changeCredentials/${id}`, formData);
      if (response.success) {
        navigator("/user/profile");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const cancell = () => {
    navigator("/user/profile");
  };

  return (
    <>
      <section className=" flex flex-col ">
        <div className=" flex justify-between">
          <header className=" text-2xl  font-bold text-primary">
            Change Password
          </header>
        </div>

        <main className="mt-3">
          <section className=" w-full pt-3  ">
            {/* address info */}
            <div className="  bg-whiten py-5 px-4  ">
              <div className="">
                <div className=" flex flex-col">
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-3 text-center">
                      <strong className="font-bold">Error ! </strong>
                      <span className="block sm:inline">{error}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-2  gap-6">
                    <div className="flex flex-col gap-3">
                      <label htmlFor="name">Current Password</label>
                      <input
                        type="text"
                        name="currentPassword"
                        id="currentPassword"
                        placeholder="Enter Current Password"
                        className="p-2 focus:border focus:border-gray rounded-md"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label htmlFor="email">New Password</label>
                      <input
                        type="text"
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter New Password"
                        className="p-2 focus:border focus:border-gray rounded-md"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label htmlFor="phone">Conform Password</label>
                      <input
                        type="text"
                        name="conformPassword"
                        id="conformPassword"
                        placeholder="Enter Password Again"
                        className="p-2 focus:border focus:border-gray rounded-md"
                        value={conformPassword}
                        onChange={(e) => setConformPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className=" flex justify-between pt-5">
                    <div className="">
                      <button
                        onClick={handleSubmit}
                        className="bg-primary hover:bg-primary-dark text-white p-2 px-3 rounded-md"
                      >
                        Save
                      </button>
                    </div>
                    <div className=" flex flex-row-reverse">
                      <button
                        type="submit"
                        className="bg-black hover:bg-primary text-white p-2 px-3 rounded-md"
                        onClick={cancell}
                      >
                        Cancel
                      </button>
                    </div>
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
