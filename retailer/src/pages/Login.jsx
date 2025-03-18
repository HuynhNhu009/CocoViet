import React, { useEffect, useState } from "react";
import { retailerApi } from "../services/RetailerService"; // Thay bằng đường dẫn thực tế
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form"); // "form", "preparing", "success"
  const navigate = useNavigate();

  useEffect(() => {
    setStep("form");
    setFormData({ email: "", password: "" });
    setErrors({});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email không được để trống!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ!";
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setStep("preparing");
      console.log(formData);
      const responseData = await retailerApi.login({
        email: formData.email,
        password: formData.password,
      });
      // console.log("API response:", responseData);
      setStep("success");
      setFormData({
        email: "",
        password: "",
      });
      setErrors({});
    } catch (err) {
      const errorMessage =
        err.response?.data?.msg || "Email hoặc mật khẩu không đúng!";
      setErrors({ general: errorMessage });
      setStep("form");
    }
  };

  const renderForm = () => (
    <div className=" h-vh bg-white opacity-90 p-6 rounded-lg shadow-sm shadow-gray-700 w-full max-w-md m-auto">
      <h2 className="text-2xl uppercase font-bold text-center text-gray-800 mb-6 oswald-font">
        Đăng nhập
      </h2>
      {errors.general && (
        <p className="text-red-500 text-sm text-center mb-4">
          {errors.general}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-green-500"
            placeholder="Nhập email"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-green-500"
            placeholder="Nhập mật khẩu"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Đăng nhập
        </button>
      </form>

      <p className="mt-2 text-center text-sm text-gray-600">
        Chưa có tài khoản?{" "}
        <a href="/register" className="text-green-600 hover:underline">
          Đăng ký ngay
        </a>
      </p>
    </div>
  );

  const renderPreparing = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 oswald-font">
        Đang xử lý
      </h2>
      <p className="text-gray-600 mb-4">Vui lòng chờ trong giây lát...</p>
      <div className="flex justify-center">
        <div className="w-12 h-12 border-4 border-t-4 border-green-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );

  const renderSuccess = () => {
    setTimeout(() => navigate("/dashboard"), 1500);
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600">
          Đăng nhập thành công!
        </h2>
        <p className="text-gray-600">Đang chuyển hướng...</p>
      </div>
    );
  };

  return (
    <div className="h-[100vh] flex items-center justify-center bg-gray-100"
    style={{
      backgroundImage: `url('${assets.ImageLogin}')`, // Thay bằng URL hình ảnh của bạn
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      {step === "form" && renderForm()}
      {step === "preparing" && renderPreparing()}
      {step === "success" && renderSuccess()}
    </div>
  );
};

export default Login;
