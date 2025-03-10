import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex mt-3">
        <Sidebar />
        <div className=" mx-3 shadow-2xl rounded-md flex-1 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
