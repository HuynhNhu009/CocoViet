import React from "react";
import { assets } from "../../assets/assets";
import Title from "../ui/Title";
import { Button } from "../ui/Button";

const HomeAbout = () => {
  return (
    <div
      className="relative h-150 sm:h-[830px] flex justify-center items-center bg-fixed"
      style={{ backgroundImage: `url(${assets.coconutField})` }}
    >
      {/* <img
        src={assets.coconutField}
        alt="coconutField"
        className="absolute  w-full h-full -z-10 object-cover bg-fixed"
      /> */}
      <div className="relative flex flex-col items-center gap-4">
        <Title text1={"Về chúng tôi"} color1={"text-white"} />
        <p className="w-[50vw]  xl:w-[30vw] h-[4px] lg:h-[10px] bg-white"></p>
        <p className="max-w-2xl pb-10 text-white text-lg lg:text-2xl text-center px-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed voluptate
          quos, ipsam incidunt temporibus inventore laudantium provident, iusto
          perspiciatis eius ex, nisi obcaecati enim laborum tenetur voluptatibus
          aut? Animi, voluptatum.
        </p>

        <Button
          children={"Tìm hiểu thêm"}
          className="uppercase bg-green-600 font-semibold hover:bg-green-700 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default HomeAbout;
