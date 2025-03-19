import { useState } from "react";
import { customerApi } from "../services/customerService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";

function RegisForm() {
  const [formData, setFormData] = useState({
    customerEmail: "",
    customerAddress: "",
    customerName: "",
    customerPassword: "",
    phoneNumbers: "",
    customerAvatar: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!formData.customerName.trim())
      newErrors.customerName = "Họ và tên không được để trống.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.customerEmail))
      newErrors.customerEmail = "Email không hợp lệ.";
    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(formData.phoneNumbers))
      newErrors.phoneNumbers = "Số điện thoại không hợp lệ (9-11 chữ số).";
    if (formData.customerPassword.length < 8)
      newErrors.customerPassword = "Mật khẩu phải có ít nhất 8 ký tự.";
    if (formData.customerPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp.";
    if (!formData.customerAddress.trim())
      newErrors.customerAddress = "Địa chỉ không được để trống.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await customerApi.register(formData);
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error("Lỗi:", error);
      setErrors((prev) => ({
        ...prev,
        submit: error.response?.data?.message || "Đăng ký thất bại",
      }));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image với blur */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm transform scale-110"
          style={{ backgroundImage: `url(${assets.loginRetailer})`, 
        backgroundPosition: `fixed`}}
        />
        <div className="absolute inset-0 bg-gray-900/20" />
      </div>

      {/* Nội dung */}
      <div className="relative z-10">
        <Navbar className="fixed top-0 left-0 w-full z-20 bg-white" />
        <div className="flex items-center justify-center h-[90vh] px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-lg py-4 px-4 sm:px-6 w-full max-w-md lg:max-w-lg border border-gray-100 transition-all duration-300 max-h-[760px]">
            <h2 className="text-green-600 text-2xl font-bold text-center mb-6 tracking-wide">
              ĐĂNG KÝ
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block mb-1 font-semibold text-base text-gray-600">
                  Họ và tên:
                </label>
                <input
                  name="customerName"
                  type="text"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-green-500 transition-all duration-200 text-sm"
                  placeholder="Nhập họ và tên"
                />
                {errors.customerName && (
                  <p className="text-red-500 text-xs mt-0.5">
                    {errors.customerName}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-base text-gray-600">
                  Email:
                </label>
                <input
                  name="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-green-500 transition-all duration-200 text-sm"
                  placeholder="Nhập email"
                />
                {errors.customerEmail && (
                  <p className="text-red-500 text-xs mt-0.5">
                    {errors.customerEmail}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-base text-gray-600">
                  Số điện thoại:
                </label>
                <input
                  name="phoneNumbers"
                  type="text"
                  value={formData.phoneNumbers}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-green-500 transition-all duration-200 text-sm"
                  placeholder="Nhập số điện thoại"
                />
                {errors.phoneNumbers && (
                  <p className="text-red-500 text-xs mt-0.5">
                    {errors.phoneNumbers}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-base text-gray-600">
                  Mật khẩu:
                </label>
                <input
                  name="customerPassword"
                  type="password"
                  value={formData.customerPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-green-500 transition-all duration-200 text-sm"
                  placeholder="Nhập mật khẩu"
                />
                {errors.customerPassword && (
                  <p className="text-red-500 text-xs mt-0.5">
                    {errors.customerPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-base text-gray-600">
                  Nhập lại mật khẩu:
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-green-500 transition-all duration-200 text-sm"
                  placeholder="Nhập lại mật khẩu"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-0.5">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-base text-gray-600">
                  Địa chỉ:
                </label>
                <input
                  name="customerAddress"
                  type="text"
                  value={formData.customerAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-green-500 transition-all duration-200 text-sm"
                  placeholder="Nhập địa chỉ"
                />
                {errors.customerAddress && (
                  <p className="text-red-500 text-xs mt-0.5">
                    {errors.customerAddress}
                  </p>
                )}
              </div>

              {errors.submit && (
                <p className="text-red-500 text-xs text-center mt-2">
                  {errors.submit}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold mt-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 text-base"
              >
                ĐĂNG KÝ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisForm;