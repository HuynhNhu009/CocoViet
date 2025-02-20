import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  ArrowLeftIcon,
  Bars3Icon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

// const { setShowSearch, getCartCount } = useContext(ShopContext);
const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const text_Color =
    location.pathname === "/" ? "text-white" : "text-green-600";

  return (
    <div className="relative flex justify-between items-center py-5 font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Link to={"/"} className="lg:mr-[5%]">
        <p className={`uppercase ${text_Color}`}>CocoViet</p>
        {/* <img src={assets.logo} className="w-30" alt="Logo" /> */}
      </Link>
      <ul className="hidden md:flex md:ml-6 lg:ml-22 gap-5 lg:gap-10 text-md lg:text-xl text-gray-700 mr-auto mt-5">
        <NavLink to={"/"} className="flex flex-col items-center gap-1 ">
          <p className={`uppercase ${text_Color}`}>Trang chủ</p>
        </NavLink>
        <NavLink to={"/products"} className="flex flex-col items-center gap-1 ">
          <p className={`uppercase ${text_Color}`}>Sản phẩm</p>
        </NavLink>
        <NavLink to={"/about"} className="flex flex-col items-center gap-1 ">
          <p className={`uppercase ${text_Color}`}>Giới thiệu</p>
        </NavLink>
        <NavLink to={"/blogs"} className="flex flex-col items-center gap-1 ">
          <p className={`uppercase ${text_Color}`}>Bài viết</p>
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <MagnifyingGlassIcon className={`size-7 ${text_Color}`} />

        <div className="group relative">
          <Link to="/login">
            <UserCircleIcon className={`size-7 ${text_Color}`} />
          </Link>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex  flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-gray-500 rounded">
              <p className=" cursor-pointer hover:text-black">My Profile</p>
              <p className=" cursor-pointer hover:text-black">Order</p>
              <p className=" cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <ShoppingBagIcon className={`size-7 ${text_Color}`} />

          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]">
            9{/* {getCartCount()} */}
          </p>
        </Link>
        <Bars3Icon
          className={`w-7 h-7 cursor-pointer  md:hidden ${text_Color}`}
          onClick={() => setVisible(true)}
        />
      </div>
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all  ${
          visible ? "w-full" : "w-0"
        } `}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <ArrowLeftIcon className="w-5 h-5 cursor-pointer" />
          </div>
          <NavLink
            className="py-2 pl-6 border-t uppercase"
            onClick={() => setVisible(false)}
            to="/"
          >
            Trang chủ
          </NavLink>
          <NavLink
            className="py-2 pl-6 border-t uppercase"
            onClick={() => setVisible(false)}
            to="/products"
          >
            Sản phẩm
          </NavLink>
          <NavLink
            className="py-2 pl-6 border-t uppercase"
            onClick={() => setVisible(false)}
            to="/about"
          >
            Giới thiệu
          </NavLink>
          <NavLink
            className="py-2 pl-6 border-y uppercase"
            onClick={() => setVisible(false)}
            to="/blogs"
          >
            Bài viết
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
