import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-5 px-4 sm:px-[5vw] lg:px-[7vw]  shadow-md">
      <div className="relative">
        <p
          className={`relative text-green-700 text-3xl lg:text-5xl sigmar-font`}
        >
          CocoViet
        </p>
        <p
          className={`absolute -top-1 -right-10 lg:-right-15 text-black text-sm lg:text-xl oswald-font`}
        >
          Retailer
        </p>
      </div>
      <div className="flex gap-5">
        <BellIcon className="size-6 lg:size-7 " />

        <Link to={"/profile"}>
          <UserCircleIcon className="size-6 lg:size-7" />
        </Link>

        <Link to={"/register"}>Register</Link>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
