import React, { useState } from "react";
import { retailerApi } from "../services/RetailerService"; // Thay bằng đường dẫn thực tế
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets";

const Register = () => {
  const [formData, setFormData] = useState({
    retailerName: "",
    retailerPassword: "",
    confirmPassword: "",
    retailerEmail: "",
    phoneNumbers: "",
    retailerAddress: "",
    retailerAvatar: "abc",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form"); // "form", "preparing", "success"
  const retailers = useSelector((state) => state.RetailerStore.allRetailer);

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

    if (!formData.retailerName.trim()) {
      newErrors.retailerName = "Họ và tên không được để trống!";
    }
    const existName = retailers.some(
      (item) =>
        item.retailerName.toLowerCase().trim() ===
        formData.retailerName.toLowerCase().trim()
    );

    if (existName) {
      newErrors.retailerName = "Tên đã tồn tại, vui lòng nhập tên khác!";
    }

    if (!formData.retailerPassword) {
      newErrors.retailerPassword = "Mật khẩu không được để trống!";
    } else if (formData.retailerPassword.length < 8) {
      newErrors.retailerPassword = "Mật khẩu phải có ít nhất 8 ký tự!";
    } else if (formData.retailerPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp!";
    }
    if (!formData.retailerEmail) {
      newErrors.retailerEmail = "Email không được để trống!";
    } else if (!/\S+@\S+\.\S+/.test(formData.retailerEmail)) {
      newErrors.retailerEmail = "Email không hợp lệ!";
    }
    if (!formData.phoneNumbers) {
      newErrors.phoneNumbers = "Số điện thoại không được để trống!";
    } else if (!/^\d{10,11}$/.test(formData.phoneNumbers)) {
      newErrors.phoneNumbers = "Số điện thoại phải có 10-11 chữ số!";
    }
    if (!formData.retailerAddress.trim()) {
      newErrors.retailerAddress = "Địa chỉ không được để trống!";
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
      const responseData = await retailerApi.register(formData);
      console.log("API response:", responseData);
      setStep("success");
      setFormData({
        retailerName: "",
        retailerPassword: "",
        confirmPassword: "",
        retailerEmail: "",
        phoneNumbers: "",
        retailerAddress: "",
        retailerAvatar: "abc",
      });
      setErrors({});
    } catch (err) {
      const errorMessage = err?.msg || "Có lỗi xảy ra. Vui lòng thử lại!";

      if (errorMessage === "Retailer already exists") {
        setErrors({ retailerEmail: "Email đã được đăng ký!" });
      } else {
        setErrors({ general: errorMessage });
      }
      setStep("form");
    }
  };

  const renderForm = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md  ">
      <div className="text-center oswald-font mb-8">
        <h2 className="text-3xl uppercase font-bold text-gray-800 ">Đăng ký</h2>
        <p className="text-md font-medium text-green-500">Người bán hàng</p>
      </div>
      {errors.general && (
        <p className="text-red-500 text-sm text-center mb-4">
          {errors.general}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="retailerName"
            className="block text-sm font-medium text-gray-700"
          >
            Tên của hàng
          </label>
          <input
            type="text"
            id="retailerName"
            name="retailerName"
            value={formData.retailerName}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Nhập họ và tên"
            required
          />
          {errors.retailerName && (
            <p className="text-red-500 text-xs mt-1">{errors.retailerName}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="retailerEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="retailerEmail"
            name="retailerEmail"
            value={formData.retailerEmail}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Nhập email"
            required
          />
          {errors.retailerEmail && (
            <p className="text-red-500 text-xs mt-1">{errors.retailerEmail}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phoneNumbers"
            className="block text-sm font-medium text-gray-700"
          >
            Số điện thoại
          </label>
          <input
            type="tel"
            id="phoneNumbers"
            name="phoneNumbers"
            value={formData.phoneNumbers}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Nhập số điện thoại"
            required
          />
          {errors.phoneNumbers && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumbers}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="retailerAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Địa chỉ
          </label>
          <textarea
            id="retailerAddress"
            name="retailerAddress"
            value={formData.retailerAddress}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Nhập địa chỉ"
            rows="3"
            required
          />
          {errors.retailerAddress && (
            <p className="text-red-500 text-xs mt-1">
              {errors.retailerAddress}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="retailerPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            id="retailerPassword"
            name="retailerPassword"
            value={formData.retailerPassword}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Nhập mật khẩu"
            required
          />
          {errors.retailerPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.retailerPassword}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Nhập lại mật khẩu
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Nhập lại mật khẩu"
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Đăng ký
        </button>
      </form>

      <p className="mt-2 text-center text-sm text-gray-600">
        Đã có tài khoản?{" "}
        <a href="/login" className="text-green-600 hover:underline">
          Đăng nhập
        </a>
      </p>
    </div>
  );

  const renderPreparing = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 oswald-font">
        Đang chuẩn bị cửa hàng
      </h2>
      <p className="text-gray-600 mb-4">Vui lòng chờ trong giây lát...</p>
      <div className="flex justify-center">
        <div className="w-12 h-12 border-4 border-t-4 border-green-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4 oswald-font">
        Đăng ký thành công!
      </h2>
      <p className="text-gray-600 mb-4">
        Cửa hàng của bạn đã sẵn sàng. Chúc bạn kinh doanh phát đạt!
      </p>
      <a
        href="/login"
        className="inline-block bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Đăng nhập ngay
      </a>
    </div>
  );

  return (
    <div
      className="h-[100vh] flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url('${assets.ImageLogin}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {step === "form" && renderForm()}
      {step === "preparing" && renderPreparing()}
      {step === "success" && renderSuccess()}
    </div>
  );
};

export default Register;
