import React from "react";
import SideBar from "../../component/admin/include/sideBar.jsx";
import Header from "../../component/admin/include/header.jsx";


export default function AdminLayout({ children }) {
  return (
      <div className="flex h-screen overflow-hidden bg-white dark:bg-black ">
        <SideBar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          {children}
        </div>
      </div>
  );
}
