//import React from 'react';
import { assets } from "../../assets/assets";

const AboutInfor = () => {
    return (
        <div
            className="w-full bg-cover bg-fixed bg-center text-white py-16 px-8 flex flex-col items-center  lg:h-[750px]"
            style={{ backgroundImage: `url(${assets.coconutFieldAb})` }}>
            
                <h2 className="lg:w-[80%] lg:text-5xl text-2xl text-white text-left font-bold ">Kết nối những giá trị thuần túy...</h2>
                <p className="mt-6 max-w-5xl lg:text-3xl text-lg leading-normal text-white text-left">
                Chúng tôi không chỉ đơn thuần là một sàn thương mại, mà còn là cầu nối giữa người nông dân, xưởng thủ công, chủ cửa hàng, và người tiêu dùng yêu thích các sản phẩm từ dừa Việt Nam.
                </p>
                <p className="mt-6 max-w-5xl lg:text-3xl text-lg leading-normal text-white text-left">
                Với mức chiết khấu hợp lý, góp phần giúp người tiêu dùng dễ dàng tiếp cập với các sản phẩm chất lượng cao, qua ít khâu trung gian nhất có thể, để đảm bảo giá thành sản phẩm.
                </p>
                <p className="mt-6 max-w-5xl lg:text-3xl text-lg leading-normal text-white text-left">
                Từ đó nâng cao giá trị sản phẩm từ dừa, khẳng định chất lượng và thương hiệu trên thị trường trong nước và quốc tế.
                </p>
                <p className="mt-6 max-w-5xl lg:text-3xl text-lg leading-normal text-white text-left">
                Bên cạnh đó, khuyến khích mô hình sản xuất thân thiện với môi trường, mang lại lợi ích lâu dài cho cộng đồng.
                </p>
        </div>
    );
};

export default AboutInfor;
