import React from "react";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets"; // Đảm bảo đã import Navbar

const Home = () => {
  return (
    <>
      <div className="relative w-full h-screen">
        {/* Navbar - Đặt trên cùng */}
        <Navbar className=" absolute top-0 left-0 w-full z-20" />
        {/* Background Image */}
        <div className="absolute inset-0 -z-20">
          <img
            src={assets.bgHome2} // Thay bằng đường dẫn hình ảnh thực tế của bạn
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        ></div>

        {/* Content */}
        <div className="relative z-10 text-white flex flex-col items-start p-8 md:p-16">
          {/* Logo */}
          <h1 className="text-4xl font-bold">LOGO</h1>

          {/* Main Text */}
          <div className="mt-32 md:mt-40">
            <h2 className="text-6xl font-bold">LOVE</h2>
            <h2 className="text-6xl font-bold">COCONUT</h2>
            <p className="mt-4 text-lg max-w-md">
              Lorem ipsum is a dummy or placeholder text commonly used in
              graphic design, publishing, and web development to fill empty
              spaces in a layout that does not yet have content.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
