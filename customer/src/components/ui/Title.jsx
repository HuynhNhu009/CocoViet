import React from "react";

const Title = ({ text1, text2, color1, color2 }) => {
  return (
    <div className="inline-flex flex-col gap-2 items-center mb-3">
      <p
        className={`${color1} uppercase text-4xl sm:text-6xl  lg:text-8xl oswald-font font-medium`}
      >
        {text1}
      </p>
      <p className="w-[50vw]  xl:w-[30vw] h-[4px] lg:h-[10px] bg-white"></p>
    </div>
  );
};

export default Title;
