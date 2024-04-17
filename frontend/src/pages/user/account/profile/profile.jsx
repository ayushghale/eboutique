import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect,useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../utils/api";

export default function Profile() {
  const [user, setUser] = useState([]);

  const id  = parseInt(sessionStorage.getItem("userData"));

  const navigator = useNavigate();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`user/getUserById/${id}`);
        if (response.success) {
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


  const editProfile = () => {
    navigator("/user/profile/edit/"+id);
  };
  const editCredentials= () => {
    navigator("/user/profile/password/"+id);
  };
  return (
    <>
      <section className=" flex flex-col ">
        <header className=" text-xl  font-bold flot">My Profile</header>
        <main className="mt-3">
          <section className=" w-full h-[500px]">
            <div className="  bg-[#f5f5f5]  p-2  ">
              <div className=" flex  text-[18px] gap- ">
                <p className="   font-bold border-r-2 pr-3  border-[#c3c3c3] ">
                  Profile Details
                </p>
                <button onClick={editProfile}>
                  <p className="text-primary ml-3">Edit</p>
                </button>
              </div>
              <div class="grid grid-cols-3 gap-4 pb-4">
                <div className="col-span-2">
                  <div className="grid grid-cols-2 p-3 gap-2">
                    <div className="flex gap-1 flex-col ">
                      <p className="text-lg font-semibold">Name:</p>
                      <p className="text-md">{user.name}</p>
                    </div>
                    <div className="flex gap-1 flex-col ">
                      <p className="text-lg font-semibold">Email:</p>
                      <p className="text-md">{user.email}</p>
                    </div>
                    <div className="flex gap-1 flex-col ">
                      <p className="text-lg font-semibold">Phone:</p>
                      <p className="text-md">+977 {user.phoneNumber}</p>
                    </div>
                    <div className="flex gap-1 flex-col ">
                      <p className="text-lg font-semibold">Address:</p>
                      <p className="text-md">
                        {user.address}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 p-3 gap-6">
                    <button className=" bg-primary rounded-md" onClick={editProfile}>
                      <p className="my-2 font-bold text-white">Edit</p>
                    </button>
                    <button className="bg-primary rounded-md" onClick={editCredentials}>
                      <p className="my-2 font-bold text-white">
                        Change Password
                      </p>
                    </button>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="w-full h-full overflow-auto flex justify-center items-center bg-slate-100 ">
                    <div className=" bg-white p-5">

                      {
                        user.image ? (
                          <img
                            src={user.image}
                            alt="profile"
                            className="w-40 h-40 "
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faUser}
                            className=" text-9xl  bg-white"
                          />
                        )
                      }
                     
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
