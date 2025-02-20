import React from "react";

const Title = ({ text1, text2, color1, color2 }) => {
  return (
    <div className="inline-flex flex-col gap-2 items-center">
      <p
        className={`${color1} uppercase text-5xl sm:text-6xl  lg:text-8xl oswald-font font-medium`}
      >
        {text1}
      </p>
    </div>
  );
};

export default Title;
