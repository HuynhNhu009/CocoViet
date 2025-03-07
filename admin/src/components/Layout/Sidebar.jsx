import {
  CircleStackIcon,
  CubeIcon,
  UsersIcon ,
  BuildingStorefrontIcon,
  DocumentTextIcon 
} from "@heroicons/react/24/outline";
import React from "react";

const Sidebar = () => {
  const navItems = [

    {
      label: "Sản phẩm",
      icon: <CubeIcon className="size-5" />,
    },
    {
      label: "Bài viết",
      icon: <DocumentTextIcon  className="size-5" />,
    },
    {
      label: "Khách hàng",
      icon: <UsersIcon  className="size-5" />,
    },
    {
      label: "Cửa hàng",
      icon: <BuildingStorefrontIcon  className="size-5" />,
    },
    {
      label: "Lợi nhuận",
      icon: <CircleStackIcon className="size-5" />,
    },
  ];

  return (
    <>
      {/* Sidebar cho mobile */}
      <div className="fixed z-20 inset-y-0 left-0 w-64 bg-white p-5 shadow-lg lg:hidden">
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
      </div>

      {/* Sidebar cho desktop */}
      <div className="sticky top-30 max-h-100 hidden lg:block lg:w-64 flex-shrink-0 bg-white p-5 rounded-lg shadow-md">
        <nav className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 py-2 px-4 bg-gray-100 rounded-md">
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