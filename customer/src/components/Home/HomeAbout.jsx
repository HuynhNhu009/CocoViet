// import React from "react";
// import { assets } from "../../assets/assets";
// import Title from "../ui/Title";

// const HomeAbout = () => {
//   return (
//     <div className="relative h-[830px]">
//       <img
//         src={assets.coconutField}
//         alt="coconutField"
//         className="absolute w-full h-full -z-10 object-cover bg-fixed"
//       />

//       <Title text1={"hello"} color1={"text-white"} />
//     </div>
//   );
// };

// export default HomeAbout;

import React from "react";
import { assets } from "../../assets/assets";
import Title from "../ui/Title";
import { Button } from "../ui/Button";

const HomeAbout = () => {
  return (
    <div className="relative h-150 sm:h-[830px] flex justify-center items-center">
      <img
        src={assets.coconutField}
        alt="coconutField"
        className="absolute w-full h-full -z-10 object-cover bg-fixed"
      />
      <div className="relative flex flex-col items-center gap-4">
        <Title text1={"Về chúng tôi"} color1={"text-white"} />

        <p className="max-w-2xl pb-10 text-white text-lg text-center px-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed voluptate
          quos, ipsam incidunt temporibus inventore laudantium provident, iusto
          perspiciatis eius ex, nisi obcaecati enim laborum tenetur voluptatibus
          aut? Animi, voluptatum.
        </p>

        <Button children={"Tìm hiểu thêm"} className="uppercase bg-green-600" />
      </div>
    </div>
  );
};

export default HomeAbout;
