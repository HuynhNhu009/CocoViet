import React from "react";
import Title from "../ui/Title";

const HomeBlog = () => {
  return (
    <div className="relative flex flex-col lg:flex-row items-center gap-6 pt-5 sm:pt-20 px-4 sm:px-[5vw] lg:px-[7vw] h-150 sm:h-[830px]">
      {/* Cột bên trái (Tiêu đề & Nội dung) */}
      <div className="w-full lg:w-1/3 text-center px-4 sm:text-left">
        <Title text1={"BLOG"} color1={"lg:mb-20 lg:pl-5 text-black"} />
        <p className="mt-4 lg:pr-10 sm:mb-10 lg:mb-30 text-gray-700 text-lg lg:text-2xl leading-relaxed text-center sm:text-left">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris.
        </p>
      </div>

      {/* Cột bên phải (Hình ảnh) */}
      <div className="w-full lg:w-2/3 h-80 sm:h-100 lg:h-150 flex gap-4">
        {/* Hình lớn bên trái */}
        <div className="bg-gray-300 w-1/2 h-full"></div>

        {/* Hai hình nhỏ bên phải */}
        <div className="flex flex-col gap-4 w-1/2">
          <div className="bg-gray-300 h-1/2 w-full"></div>
          <div className="bg-gray-300 h-1/2 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeBlog;
