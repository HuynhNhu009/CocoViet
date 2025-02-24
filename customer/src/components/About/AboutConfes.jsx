//import React from 'react';

import { assets } from "../../assets/assets";

const AboutConfes = () => {
    return (
        <section className="bg-white lg:py-20 py-10 px-8 h-[30] pb-[10%] flex items-center justify-center">
        <div className="w-[80%]">
          <h2 className="lg:text-5xl text-xl font-bold  text-left ml-[-20px] lg:pt-[20px]">Tâm sự từ người bán</h2>
        {/* Anh Nhựt */}
        <div className="mt-8 flex flex-col-reverse lg:flex-row items-center">
          
            <div className="lg:ml-8 mt-6 md:mt-0 flex-1 bg-yellow-200  lg:mr-[-30px] z-10">
              <p className="text-gray-800   p-6 rounded-lg text-lg leading-relaxed ">
                “Trước giờ tui chỉ biết trồng dừa bán cho thương lái hoặc bán lẻ ở quê thôi, giá bấp bênh lắm. Giờ có CocoViet, sản phẩm dừa nhà tui không chỉ bán được giá tốt hơn mà sản phẩm của quê tui được đến nhiều hơn, tui mừng lắm!”
              </p>
              <p className="mt-4 text-gray-600  text-lg text-right mr-[10px]">Anh Nhựt – Bến Tre</p>
            </div>
            <img src={assets.retailer1} alt="Hình anh Nhựt" 
              className="w-full lg:w-1/3 h-72 object-cover rounded-lg shadow-lg" />
        </div>
          {/* Chị Bảy */}
          <div className="mt-8 flex flex-col lg:flex-row items-center">

            <img src={assets.retailer2} alt="Hình chị Bảy" 
              className="w-full lg:w-1/3 h-72 object-cover rounded-lg shadow-lg lg:ml-[30px]" />
          
            <div className="md-8 mt-6 md:mt-0  bg-yellow-200 lg:ml-[-20px]   z-10">
              <p className="text-gray-800   p-6 rounded-lg text-lg leading-relaxed ">
                “Nhà tui mấy đời làm mứt dừa, mà chỉ bán được có mấy dịp tết thôi. Từ có Cocoviet, mặt hàng mức dừa của nhà tui hầu như bán được quanh năm, tiểu thương như tụi tui không cần lo tới chuyện ế ẩm nữa.”
              </p>
              <p className="mt-4 text-gray-600  text-lg text-right mr-[10px]">Chị Bảy – Tiền Giang</p>
            </div>
            
          </div>
        </div>
      </section>
    );
};

export default AboutConfes;