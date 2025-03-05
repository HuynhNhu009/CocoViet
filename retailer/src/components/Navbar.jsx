import { BellIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { retailerApi } from "../services/RetailerService";
import { logout } from "../redux/retailerSlice";

const Navbar = () => {
  const retailer = useSelector((state) => state.RetailerStore.retailer);
  // console.log("Retailer in Navbar:", retailer);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleLogout = async () => {
    try {
      const response = await retailerApi.logout();
      // console.log(response); 
      if (response.status === "OK") {
        dispatch(logout()); // Cập nhật state Redux
        navigate("/login");
      }
    } catch (error) {
      console.error(
        "Đăng xuất thất bại:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div className="sticky top-0 z-50 bg-white flex justify-between items-center py-5 px-4 sm:px-[5vw] lg:px-[7vw] shadow-md">
      <div className="relative">
        <Link to={"/"}>
          <p className="relative text-green-700 text-3xl lg:text-5xl sigmar-font">
            CocoViet
          </p>
        </Link>
        <p className="absolute -top-1 -right-10 lg:-right-15 text-black text-sm lg:text-xl oswald-font">
          Retailer
        </p>
      </div>
      {retailer && (
        <div className="flex gap-5">
          <BellIcon className="size-6 lg:size-7" />
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link to="/profile">
              <p className="flex items-center cursor-pointer">
                Xin chào{" "}
                <span className="pl-1 inline-block w-[50px] sm:w-auto truncate">
                  {retailer.retailerName}
                </span>
              </p>
            </Link>
            {/* Dropdown Logout */}
            {isHovered && (
              <div className="absolute right-0 pt-2 top-[10px] mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-10 transition-opacity duration-200 ease-in-out">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    handleLogout()
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
