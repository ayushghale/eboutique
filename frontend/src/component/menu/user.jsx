import { useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";




export default function User() {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    // const userData = "userData" in localStorage;
    const userData = sessionStorage.getItem("accessToken");
    if (userData) {
      setUserLoggedIn(true);
    }
  }, []);

  const logOut = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("token");
    setUserLoggedIn(false);
    navigate("/");
  };

  const dashboard = () => {
    navigate("/user/dashboard");
  }

  const solutions = [
    {
      name: "Profile",
      click: dashboard,
      icon: UserIcon,
    },
    {
      name: "Logout",
      click : logOut,
      icon: LogoutIcon,
    },
  ];


  return (
    <div className=" absolute max-w-sm z-50">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "text-white" : "text-white/90"}
                group inline-flex items-center rounded-md text-base font-medium hover:text-white`}
            >
              <FontAwesomeIcon
                icon={faUser}
                className={`${open ? "text-orange-300" : "text-white"}
                   transition duration-150 ease-in-out group-hover:text-orange-300/80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition  ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute mt-3 w-[200px] max-w-sm -translate-x-1/2 transform px-4 sm:px-0 ">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 ml-2 w-auto">
                  {userLoggedIn ? (
                    <div className="relative grid gap-3 bg-white p-2 lg:grid-row-2">
                      {solutions.map((item) => (
                        <button
                          key={item.name}
                          onClick={item.click}
                          className=" flex items-center text-black  rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                        >
                          <div className="flex  shrink-0 items-center justify-center text-black sm:h-5 sm:w-5 text-sm">
                            <item.icon aria-hidden="true" />
                          </div>
                          <div className="ml-4 bg">
                            <p className="text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="relative grid gap-3 bg-white p-2 lg:grid-row-2">
                        <a
                          key="Login"
                          href="/login"
                          
                          className=" flex items-center  rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                        >
                          <div className="flex  shrink-0 items-center justify-center text-black sm:h-5 sm:w-5 text-sm">
                            <LogoutIcon />
                          </div>
                          <div className="ml-4 bg">
                            <p className="text-sm font-medium text-gray-900">
                              Login
                            </p>
                          </div>
                        </a>
                    </div>
                  )}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
    </svg>
  );
}
