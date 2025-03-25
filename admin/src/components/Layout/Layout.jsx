import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Layout = () => {
  const isLogin = useSelector((state) => state.AdminStore.isLogin);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content area */}
      <div className="flex flex-col md:flex-row flex-1 mt-3">
        {/* Sidebar */}
        <Sidebar />

        {/* Outlet (main content) */}
        <div className="flex-1 md:ml-3 mt-4 md:mt-0 shadow-2xl rounded-md bg-gray-50 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;