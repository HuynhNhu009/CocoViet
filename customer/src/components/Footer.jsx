function Footer() {
  return (
    <div className="bg-black text-yellow-700 py-4 text-center w-full">
      <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-around text-lg px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40">
        <p className="text-white py-2 sm:px-2 cursor-pointer hover:text-green-600">
          Liên hệ tư vấn
        </p>
        <p className="text-white py-2 sm:px-2 cursor-pointer hover:text-green-600">
          Điều khoản dịch vụ
        </p>
        <p className="text-white py-2 sm:px-2 cursor-pointer hover:text-green-600">
          Chính sách bảo mật
        </p>
        <p className="text-white py-2 sm:px-2 cursor-pointer hover:text-green-600">
          Giới thiệu về chúng tôi
        </p>
      </div>

      <div className="mt-2">
        <p className="text-sm sm:text-lg text-white">
          © 2025 Cocoviet. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
