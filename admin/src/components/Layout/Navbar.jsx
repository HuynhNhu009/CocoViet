import { BellIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { productAPI } from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../redux/adminSlice";


const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();


  useEffect(()=>{
    const products = async () => {
      try {
        const response = await productAPI.getAllProducts();
        if (response.data) {
         dispatch(setProduct(response.data));
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    products();
  },[dispatch]);

  return (
    <div className="sticky top-0 z-50 bg-white flex justify-between items-center py-5 px-4 sm:px-[5vw] lg:px-[7vw] shadow-md">
      <div className="relative">
        <Link to={"/"}>
          <p className="relative uppercase text-black lg:text-4xl font-bold">
            CocoViet
          </p>
        </Link>
       
      </div>
      <div className="flex gap-5">
        <BellIcon className="size-6 lg:size-7" />
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link to="/profile">
            <p className="flex items-center cursor-pointer">
              Xin chào <span className="pl-1 inline-block w-[50px] sm:w-auto truncate">User</span>
            </p>
          </Link>
          {isHovered && (
            <div className="absolute right-0 pt-2 top-[10px] mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-10 transition-opacity duration-200 ease-in-out">
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;