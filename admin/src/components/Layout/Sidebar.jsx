import {
  BuildingStorefrontIcon,
  CircleStackIcon,
  CubeIcon,
  DocumentTextIcon,
  UsersIcon
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryActive, setCustomer, setProduct, setRetailer } from "../../redux/adminSlice";
import { productAPI } from "../../services/productService";
import { customerApi } from "../../services/customerService";
import { retailerAPI } from "../../services/retailerService";


const Sidebar = () => {

  const navigate = useNavigate();
  const [sideBarActive, setsideBarActive] = useState();
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
  },[dispatch, sideBarActive]);

  useEffect(()=>{
    const customers = async () => {
      try {
        const response = await customerApi.getAllCustomers();
        if (response.data) {          
         dispatch(setCustomer(response.data));
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    customers();
  },[dispatch, sideBarActive]);

  useEffect(()=>{
    const retailers = async () => {
      try {
        const response = await retailerAPI.getAllRetailer();
        if (response.data) {                    
         dispatch(setRetailer(response.data));
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    retailers();
  },[dispatch, sideBarActive]);

  const navItems = [
    {
      label: "Trang chủ",
      icon: <CubeIcon className="size-5" />,
      path:"/"
    },
    {
      label: "Sản phẩm",
      icon: <CubeIcon className="size-5" />,
      path:"/products"
    },
    {
      label: "Bài viết",
      icon: <DocumentTextIcon  className="size-5" />,
    },
    {
      label: "Khách hàng",
      icon: <UsersIcon  className="size-5" />,
      path:"/customers"
    },
    {
      label: "Cửa hàng",
      icon: <BuildingStorefrontIcon  className="size-5" />,
      path:"/retailers"

    },
    {
      label: "Lợi nhuận",
      icon: <CircleStackIcon className="size-5" />,
    },
  ];

  const handleNavigate = (path) => {    
    if(path === "/products"){
      dispatch(setCategoryActive("allProduct"));
    }
    navigate(path);
  }

  return (
    <>
      {/* Sidebar cho mobile */}
      {/* <div className="fixed z-20 inset-y-0 left-0 w-64 bg-white p-5 shadow-lg lg:hidden">
        <div className="flex justify-between items-center pt-20 mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Menu</h3>
        </div>
        <nav className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 py-2 px-4 bg-gray-100 rounded-md">
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div> */}

      {/* Sidebar cho desktop */}
      <div className="sticky top-30 max-h-100 hidden lg:block lg:w-64 flex-shrink-0 bg-white p-5 rounded-lg shadow-md">
        <nav className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <div key={index} 
            onClick={() => {
              handleNavigate(item.path),
              setsideBarActive(item.label)
            }}
            className={`flex items-center gap-2 py-2 px-4 bg-gray-100 
            rounded-md cursor-pointer ${sideBarActive === item.label ? "bg-gray-300" : ""}`}>
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;