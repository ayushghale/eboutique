import React,{useState} from "react";
import NavBar from "../component/include/header";
import Footer from "../component/include/footer";
import api from "../utils/api";

function AppLayout({ children }) {

  const [password, setPassword] = useState("");

  let UserLogedIn = false;

  const accessToken = sessionStorage.getItem("accessToken");

  

  if (accessToken) {
    UserLogedIn = false;
  }

  const ReLogin =async () => {
    console.log(password)

    const formData = new FormData();
    formData.append("password", password);

    try {
      const response = await api.get(`user/relogin`);
      if (response.data) {

      } else {
        console.error("Failed to remove product from cart:", response.message);
      }
    } catch (error) {
      console.error("Error removing product from cart:", error.message);
    }

  }


  return (
    <div>
      <NavBar />
      {UserLogedIn ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white p-5 rounded-md w-[280px] ">
            <h2 className="text-center font-semibold text-lg">Re-login</h2>
            <p className="text-center">Enter password to reLogin</p>
            <div className=" my-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-gray-300 p-2 w-full rounded-sm focus:outline-none  border-gray"
                placeholder="Enter  your password"
              />
            </div>

            <button
            onClick={ReLogin} className=" w-full bg-primary text-white hover:bg-primary-dark p-2 rounded-sm">
              <span href=""> Login</span>
            </button>
          </div>
        </div>
      ) : null}
      {children}
      <Footer />
    </div>
  );
}

export default AppLayout;
