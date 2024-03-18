import React from "react";
// import { Outlet } from "react-router";
import NavBar from "../component/include/header"
import Footer from "../component/include/footer"

function AppLayout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer/>
    </div>
  );
}

export default AppLayout;
