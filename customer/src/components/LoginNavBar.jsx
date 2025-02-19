import { useState, useEffect } from "react";

function LoginNavBar(props) {
  const [state, setState] = useState({
    name: "Đăng ký",
    link: "/register",
  });

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (props.type === "Đăng ký") {
      setState({ name: "ĐĂNG NHẬP", link: "/login" });
    } else {
      setState({ name: "ĐĂNG KÝ", link: "/register" });
    }
    // eslint-disable-next-line react/prop-types
  }, [props.type]);

  return (
    <>
      <header className="flex justify-between items-center px-10 py-4 bg-white w-full shadow-md h-[80px]">
        <div className="text-green-600 text-4xl font-bold tracking-wide">
          LOGO
        </div>
        <nav>
          <a
            href={state.link}
            className="text-green-600 font-semibold border-b-2 border-green-600"
          >
            {state.name}
          </a>
        </nav>
      </header>
    </>
  );
}

export default LoginNavBar;
