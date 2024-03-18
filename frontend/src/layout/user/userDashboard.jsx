import React from "react";
// import { Outlet } from "react-router";
import NavBar from "../../component/include/header";
import Footer from "../../component/include/footer";
import SideBar from "../../component/user/dashboard/include/sidebar.jsx";

export default function UserDashboard({ children }) {
  return (
    <div>
      <NavBar />

      <main className="  flex justify-center mt-8   ">
        <div className="max-w-[1224px] w-full flex ">
          <div className=" w-1/5">
            <SideBar />
          </div>
          <div className=" w-4/5">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
