import React from "react";
import Navbar from "../../components/Navbar"; // Đảm bảo đã import Navbar
import { assets } from "../../assets/assets";

const Hero = () => {
  return (
    <div className="relative w-full h-[830px]">
      <Navbar className="absolute top-0 left-0 w-full z-20" />
      <div
        className="absolute inset-0 h-[830px] -z-20 bg-fixed"
        style={{ backgroundImage: `url(${assets.bgHome2})` }}
      >
        <div
          className="absolute inset-0 z-0 h-[830px]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        ></div>
      </div>
      <div className="relative z-0 text-white flex flex-col items-start pt-15 px-10 md:p-16 sm:px-[5vw] lg:px-[7vw]">
        <div className="mt-10 md:mt-20">
          <h2 className="text-6xl font-bold">LOVE COCONUT</h2>
          <h3 className="text-3xl font-bold">
            Tinh hoa từ thiên nhiên, hương vị từ trái dừa Việt Nam
          </h3>
          <p className="mt-4 text-2xl max-w-lg text-justify">
            Không chỉ là trái dừa tươi, chúng tôi còn mang đến đa dạng sản phẩm
            từ dừa như thực phẩm, đồ nội thất, mỹ phẩm thiên nhiên và nhiều hơn
            nữa. Kết nối trực tiếp với người trồng dừa để trải nghiệm chất lượng
            tuyệt vời từ nguồn nguyên liệu tinh khiết và bền vững.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
