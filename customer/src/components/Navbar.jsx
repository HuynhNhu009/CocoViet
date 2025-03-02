import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/customerSlice";
import {
  ArrowUpIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { customerApi } from "../services/customerService";
import { setActive, setIsNav } from "../redux/productSlice";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => !!state.CustomerStore.isLogin);
  const customerInfo = useSelector((state) => state.CustomerStore.customer);
  const cartCount = useSelector((state) => state.OrderStore.cartCount);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

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

  console.log("isLoggedIn", isLoggedIn);

  const handleLogout = async () => {
    try {
      const response = await customerApi.logout();
      // console.log(response); // { msg: "Logged out successfully", status: "OK" }
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
    <div className="relative flex justify-between items-center py-5 font-medium px-4 sm:px-[5vw] lg:px-[7vw]">
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
          <ul className="hidden md:flex my-auto md:gap-5 xl:gap-9 text-md lg:text-xl text-gray-700 mx-auto justify-center">
            <NavLink to={"/"} className="flex flex-col items-center gap-1">
              <p className={`uppercase ${text_Color} ${text_hover}`}>
                Trang chủ
              </p>
            </NavLink>
            <NavLink
              to={"/products"}
              className="flex flex-col items-center gap-1"
              onFocus={() => {
                dispatch(setActive(null));
                dispatch(setIsNav("true"));
              }}
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
          <div className="flex items-center gap-6">
            {/* Icon tìm kiếm */}
            {/* <MagnifyingGlassIcon
              className={`cursor-pointer size-7 ${text_Color} ${text_hover}`}
            /> */}

            {/* User Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <Link
                to={
                  !isLoggedIn ? "/login" : `/profile/${customerInfo.customerId}`
                }
              >
                <UserCircleIcon
                  className={`cursor-pointer size-7 transition-all ${
                    location.pathname === "/"
                      ? isOpen
                        ? "text-green-600"
                        : "text-white"
                      : !isOpen
                      ? "text-green-600"
                      : ""
                  }`}
                />
              </Link>

              {isOpen && isLoggedIn && (
                <div className="absolute dropdown-menu right-0 top-[16px] pt-4 z-30">
                  <div className="flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-gray-500 rounded shadow-lg">
                    <p
                      onClick={() => {
                        // console.log(customerInfo);
                        navigate(`/profile/${customerInfo.customerId}`);
                      }}
                      className="cursor-pointer hover:text-green-600"
                    >
                      My Profile
                    </p>
                    <p className="cursor-pointer hover:text-green-600">Order</p>
                    <p
                      onClick={() => handleLogout()}
                      className="cursor-pointer hover:text-green-600"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>

            {isLoggedIn && (
              <Link to="/order" className="relative">
                <ShoppingBagIcon
                  className={`size-7 ${text_Color} ${text_hover}`}
                />
                <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]">
                  {cartCount}
                </p>
              </Link>
            )}

            {/* Sidebar menu button */}
            <Bars3Icon
              className={`w-7 h-7 cursor-pointer md:hidden ${text_Color} ${text_hover}`}
              onClick={() => setVisible(true)}
            />
          </div>

          {/* Sidebar menu */}
          <div
            className={`z-10 absolute top-0 right-0 bottom-0 bg-white transition-all ${
              visible ? "w-full overflow-visible" : "w-0 overflow-hidden"
            }`}
          >
            <div className="flex flex-col bg-white text-gray-600">
              <div
                onClick={() => setVisible(false)}
                className="flex items-center gap-4 p-3 cursor-pointer"
              >
                <ArrowUpIcon className="w-5 h-5 cursor-pointer" />
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
