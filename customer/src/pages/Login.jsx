import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { customerApi } from "../services/customerService";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Email không hợp lệ.";
    if (formData.password.length < 8)
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await dispatch(customerApi.loginUser(formData));
      if (response.status === "OK") {
        const redirectPath = localStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin");
          navigate(redirectPath);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-[3px] w-full h-full scale-110"
        style={{ backgroundImage: `url(${assets.loginRetailer})` }}
      />
      <Navbar className="bg-white fixed top-0 left-0 w-full z-20" />
      <div className="flex items-center justify-center h-[90vh] px-2 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-lg p-4 sm:p-8 w-full max-w-md lg:max-w-lg border border-gray-100 transition-all duration-300">
          <h2 className="text-green-600 text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 tracking-wide">
            ĐĂNG NHẬP
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block mb-1 sm:mb-2 font-semibold text-base sm:text-lg text-gray-600">
                Email:
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                placeholder="Nhập email của bạn"
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 sm:mb-2 font-semibold text-base sm:text-lg text-gray-600">
                Mật khẩu:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
            >
              ĐĂNG NHẬP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;