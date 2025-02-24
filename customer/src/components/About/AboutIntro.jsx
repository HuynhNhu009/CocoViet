import { assets } from "../../assets/assets";

const AboutIntro = () =>(
    <div
        className="w-full bg-cover bg-fixed bg-center lg:h-[650px] h-[300px] flex items-center justify-center text-white text-center px-8"
        style={{ backgroundImage: `url(${assets.aboutBackground})` }}>
        <div className="max-w-7xl flex-col flex lg:mt-[-50px]">
            <h2 className="lg:text-5xl md:text-3xl text-2xl text-white font-bold text-left ">Giới thiệu</h2>
            <div className="lg:flex-row flex-col flex">
                <p className="mt-4 lg:text-4xl md:text-2xl text-xl text-white font-bold max-w-xl text-left leading-normal ">
                    Được ra mắt lần đầu vào năm 2025, bắt đầu từ một ý tưởng được ấp ủ suốt nhiều năm liền...
                </p>
                <p className="mt-2 lg:text-3xl md:text-xl text-white max-w-xl text-right leading-normal ">
                    ...CocoViet ra đời với sứ mệnh kết nối những người nông dân trồng dừa Việt Nam với các doanh nghiệp và khách hàng trên khắp mọi miền tổ quốc
                </p>
            </div>
        </div>
    </div>
)
export default AboutIntro;