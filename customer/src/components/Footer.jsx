function Footer() {
  return (
    <footer className="bg-black text-yellow-700 py-6 text-center w-full">
      <div className="flex justify-center space-x-[40px] mb-5 text-xl ">
        <a href="#" className="text-white">
          Liên hệ tư vấn
        </a>
        <a href="#" className="text-white">
          Điều khoản dịch vụ
        </a>
        <a href="#" className="text-white">
          Chính sách bảo mật
        </a>
        <a href="#" className="text-white">
          Giới thiệu về chúng tôi
        </a>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center space-x-7">
          <a href="#" className="text-white">
            <img
              className="w-6 h-15"
              src="./public/images/facebook.png"
              alt="facebook"
            ></img>
          </a>
          <a href="#" className="text-white">
            <img
              className="w-6 h-15"
              src="./public/images/instagram.png"
              alt="instagram"
            ></img>
          </a>
          <a href="#" className="text-white">
            <img className="w-6 h-15" src="./public/images/x.png" alt="x"></img>
          </a>
          <a href="#" className="text-white">
            <img
              className="w-8 h-15 mt-[2px] "
              src="./public/images/youtube.png"
              alt="youtube"
            ></img>
          </a>
        </div>
        <p className="text-xl mt-[10px] text-white">
          © 2025 Cocoviet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
export default Footer;
