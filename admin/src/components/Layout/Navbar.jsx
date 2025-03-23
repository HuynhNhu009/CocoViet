import { BellIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white flex justify-between items-center py-5 px-4 sm:px-[5vw] lg:px-[7vw] shadow-md">
      <div className="relative">
        <Link to={"/products"}>
          <p className="relative uppercase text-black lg:text-4xl font-bold">
            CocoViet
          </p>
        </Link>
       
      </div>
      <div className="flex gap-5">
        <p className="relative uppercase text-black lg:text-2xl ">
            TRANG QUẢN TRỊ
          </p>
      </div>
    </div>
  );
};

export default Navbar;