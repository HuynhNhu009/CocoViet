import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const retailer = useSelector((state) => state.RetailerStore.retailer);
  console.log("Retailer in Navbar:", retailer);

  return (
    <div className="flex justify-between items-center py-5 px-4 sm:px-[5vw] lg:px-[7vw] shadow-md">
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
          <Link to="/profile">
            <p className="flex items-center">
              Xin chào{" "}
              <span className="pl-1 inline-block w-[50px] sm:w-auto truncate">
                {retailer.retailerName}
              </span>
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
