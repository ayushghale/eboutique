import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../utils/api";
export default function EditProfile() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  const { id } = useParams();

  const navigator = useNavigate();

  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setImage(file);
  };

  const formValues = (user) => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phoneNumber);
    setAddress(user.address);
  };

  const formCheck = () => {
    if (name === "" || email === "" || phone === "" || address === "") {
      setError("Please fill all the fields");
      return false;
    } else if (phone.length !== 10) {
      setError("Phone number should be 10 digits");
      return false;
    } else if (!email.includes("@")) {
      setError("Invalid email");
      return false;
    } else if (
      name === user.name &&
      email === user.email &&
      phone === user.phoneNumber &&
      address === user.address &&
      !image
    ) {
      setError(" No changes made");
      return false;
    }
    return true;
  };

  const editProfile = async (e) => {
    e.preventDefault();

    if (!formCheck()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNumber", phone);
    formData.append("address", address);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await api.post(`user/updateUser/${id}`, formData);
      if (response.success) {
        navigator("/user/profile");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`user/getUserById/${id}`);
        if (response.success) {
          formValues(response.data.user);
          setUser(response.data.user);
        } else {
          console.error("faliure to fetch user:", response.message);
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };
    fetchProduct();
  }, []);

  const cancell = () => {
    navigator("/user/profile");
  };

  return (
    <>
      <section className=" flex flex-col ">
        <div className=" flex justify-between">
          <header className=" text-2xl  font-bold text-primary">
            Edit Profile : {name}
          </header>
        </div>

        <main className="mt-3">
          <section className=" w-full pt-3  ">
            {/* address info */}
            <div className="  bg-whiten py-5 px-4  ">
              <div className="">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-3 text-center">
                    <strong className="font-bold">Error ! </strong>
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}
                <div className=" grid grid-cols-3  gap-6">
                  <div className=" col-span-2">
                    <div className="flex flex-col gap-3">
                      <label htmlFor="name">Name</label>
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
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        className="p-2 focus:border focus:border-gray rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label htmlFor="phone">Contact Number</label>
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
                  </div>
                  {/* image upload */}
                  <div className=" w-full h-full aspect-square">
                    {/* image  */}
                    {image && (
                      <div
                        id="FileUpload"
                        className="relative  block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray  dark:bg-meta-4 "
                      >
                        <div>
                          <button
                            onClick={() => setImage("")}
                            className=" absolute font-bold text-xl text-white bg-red-500 p-2 rounded right-0 mt-1 mr-1 z-99"
                          >
                            Remove
                          </button>
                          <img
                            src={URL.createObjectURL(image)}
                            alt="product"
                            className="object-cover rounded z-1 aspect-square"
                          />
                        </div>
                      </div>
                    )}

                    {!image && (
                      <div className=" h-full bottom-0">
                        <div
                          id="FileUpload"
                          className="relative   block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none bg-transparent"
                            onChange={handleImageChange}
                            ref={inputRef}
                          />
                          <div className="flex flex-col items-center justify-center space-y-3 text-black dark:text-white">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                  fill="#3C50E0"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                  fill="#3C50E0"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                  fill="#3C50E0"
                                />
                              </svg>
                            </span>
                            <p className="text-sm font-medium">
                              <span className="">Click to upload </span>
                            </p>
                            <p className="mt-1.5 text-sm font-medium">
                              PNG & JPG
                            </p>
                            <p className="text-sm font-medium">
                              (max, 800 X 800px)
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* save button */}
                  </div>

                  {/* buttons */}
                  <div className="  col-span-2 ">
                    <button
                      onClick={editProfile}
                      className="bg-primary hover:bg-primary-dark text-white p-2 px-3 rounded-md"
                    >
                      Edit
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
          </section>
        </main>
      </section>
    </>
  );
}
