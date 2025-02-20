import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowLeftIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const text_Color =
    location.pathname === "/" ? "text-white" : "text-green-600";
  const text_hover =
    location.pathname === "/" ? "hover:text-green-500" : "hover:text-black";

  return (
    <div className="relative flex justify-between items-center py-5 font-medium px-4 sm:px-[5vw] lg:px-[7vw]">
      {/* Logo */}
      <Link to={"/"}>
        <p className={`${text_Color} text-3xl lg:text-5xl sigmar-font`}>
          CocoViet
        </p>
      </Link>
      {isAuthPage && (
        <Link
          to={location.pathname === "/login" ? "/register" : "/login"}
          className="text-green-600 font-medium "
        >
          <p
            className={`uppercase text-green-600 text-xl font-bold text-center`}
          >
            {location.pathname === "/login" ? "Đăng ký" : "Đăng nhập"}
          </p>
        </Link>
      )}

      {!isAuthPage && (
        <>
          {/* Menu */}
          <ul className="hidden md:flex md:ml-6 lg:ml-10 xl:20 md:gap-5 xl:gap-7 text-md lg:text-xl text-gray-700 mr-auto my-2">
            <NavLink to={"/"} className="flex flex-col items-center gap-1">
              <p className={`uppercase ${text_Color} ${text_hover}`}>
                Trang chủ
              </p>
            </NavLink>
            <NavLink
              to={"/products"}
              className="flex flex-col items-center gap-1"
            >
              <p className={`uppercase ${text_Color} ${text_hover}`}>
                Sản phẩm
              </p>
            </NavLink>
            <NavLink to={"/about"} className="flex flex-col items-center gap-1">
              <p className={`uppercase ${text_Color} ${text_hover}`}>
                Giới thiệu
              </p>
            </NavLink>
            <NavLink to={"/blogs"} className="flex flex-col items-center gap-1">
              <p className={`uppercase ${text_Color} ${text_hover}`}>
                Bài viết
              </p>
            </NavLink>
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <MagnifyingGlassIcon
              className={`size-7 ${text_Color} ${text_hover}`}
            />

            <div className="group relative">
              <Link to="/login">
                <UserCircleIcon
                  className={`size-7 ${text_Color} ${text_hover}`}
                />
              </Link>
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-green-600">
                    My Profile
                  </p>
                  <p className="cursor-pointer hover:text-green-600">Order</p>
                  <p className="cursor-pointer hover:text-green-600">Logout</p>
                </div>
              </div>
            </div>

            <Link to="/cart" className="relative">
              <ShoppingBagIcon
                className={`size-7 ${text_Color} ${text_hover}`}
              />
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]">
                9{/* {getCartCount()} */}
              </p>
            </Link>

            {/* Sidebar menu button */}
            <Bars3Icon
              className={`w-7 h-7 cursor-pointer md:hidden ${text_Color} ${text_hover}`}
              onClick={() => setVisible(true)}
            />
          </div>

          {/* Sidebar menu */}
          <div
            className={`absolute top-0 right-0 bottom-0 transition-all ${
              visible ? "w-full" : "w-0"
            }`}
          >
            <div className="flex flex-col bg-white text-gray-600">
              <div
                onClick={() => setVisible(false)}
                className="flex items-center gap-4 p-3 cursor-pointer"
              >
                <ArrowLeftIcon className="w-5 h-5 cursor-pointer" />
              </div>
              <NavLink
                className="py-3 pl-6 border-t uppercase"
                onClick={() => setVisible(false)}
                to="/"
              >
                Trang chủ
              </NavLink>
              <NavLink
                className="py-3 pl-6 border-t uppercase"
                onClick={() => setVisible(false)}
                to="/products"
              >
                Sản phẩm
              </NavLink>
              <NavLink
                className="py-3 pl-6 border-t uppercase"
                onClick={() => setVisible(false)}
                to="/about"
              >
                Giới thiệu
              </NavLink>
              <NavLink
                className="py-3 pl-6 border-y uppercase"
                onClick={() => setVisible(false)}
                to="/blogs"
              >
                Bài viết
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
