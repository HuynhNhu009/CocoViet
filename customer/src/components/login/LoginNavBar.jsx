import { Link, useLocation } from "react-router-dom";

function LoginNavBar() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <header className="flex justify-between items-center py-4 bg-white w-full shadow-md h-[80px] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      
      <Link
        to={"/"}
        className="text-green-600 text-4xl font-bold tracking-wide"
      >
        LOGO
      </Link>

      <nav>
        <Link
          to={isLogin ? "/register" : "/login"}
          className="text-green-600 font-semibold border-b-2 border-green-600"
        >
          {isLogin ? "ĐĂNG KÝ" : "ĐĂNG NHẬP"}
        </Link>
      </nav>
    </header>
  );
}

export default LoginNavBar;
