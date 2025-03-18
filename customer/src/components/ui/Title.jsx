import React from "react";

const Title = ({ text1, color1, className = "text-5xl sm:text-6xl  lg:text-8xl"  }) => {
  return (
    <div className="inline-flex flex-col gap-2 items-center">
      <p
        className={`${color1} uppercase ${className} oswald-font font-medium`}
      >
        {text1}
      </p>
    </div>
  );
};

export default Title;
