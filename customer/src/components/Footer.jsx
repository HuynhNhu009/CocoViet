function Footer() {
  return (
    <footer className="bg-black text-yellow-700 pt-4 pb-2 text-center w-full">
      <div className="flex flex-col sm:flex-row flex-wrap justify-around mb-6 text-lg px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40">
        <p className="text-white p-4 sm:px-2 cursor-pointer hover:text-green-600">
          Liên hệ tư vấn
        </p>
        <p className="text-white p-4 sm:px-2 cursor-pointer hover:text-green-600">
          Điều khoản dịch vụ
        </p>
        <p className="text-white p-4 sm:px-2 cursor-pointer hover:text-green-600">
          Chính sách bảo mật
        </p>
        <p className="text-white p-4 sm:px-2 cursor-pointer hover:text-green-600">
          Giới thiệu về chúng tôi
        </p>
      </div>

      <div className="flex flex-col items-center">
        {/* <div className="flex justify-center space-x-6"></div> */}
        <p className="text-lg  text-white">
          © 2025 Cocoviet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
