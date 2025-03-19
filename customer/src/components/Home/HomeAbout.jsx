import React from "react";
import { assets } from "../../assets/assets";
import Title from "../ui/Title";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

const HomeAbout = () => {
  const navigator = useNavigate();
  return (
    <div
      className="relative h-150 sm:h-[830px] flex justify-center items-center bg-fixed"
      style={{ backgroundImage: `url(${assets.coconutField})` }}
    >
      <div className="relative flex flex-col items-center gap-4">
        <Title text1={"Về chúng tôi"} color1={"text-white"} />
        <p className="w-[50vw]  xl:w-[30vw] h-[4px] lg:h-[10px] bg-white"></p>
        <p className="max-w-2xl pb-10 text-white text-lg lg:text-2xl text-center px-5">
        Chúng tôi không chỉ đơn thuần là một sàn thương mại, mà còn là cầu nối giữa người nông dân, xưởng thủ công, chủ cửa hàng, và người tiêu dùng yêu thích các sản phẩm từ dừa Việt Nam.
        </p>

        <Button
          children={"Tìm hiểu thêm"}
          onClick={() => navigator("/about") }
          className="uppercase bg-green-600 font-semibold hover:bg-green-700 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default HomeAbout;
