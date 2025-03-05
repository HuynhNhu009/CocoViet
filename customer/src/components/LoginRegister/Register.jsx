import { useState } from "react";
import { customerApi } from "../../services/customerService";
import { useNavigate } from "react-router-dom";

function RegisForm() {
  const [formData, setFormData] = useState({
    customerEmail: "",
    customerAddress: "",
    customerName: "",
    customerPassword: "",
    phoneNumbers: "",
    customerAvatar:"",
    confirmPassword: "", // This was missing in the state usage
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!formData.customerName.trim())
      newErrors.fullname = "Họ và tên không được để trống.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.customerEmail))
      newErrors.email = "Email không hợp lệ.";

    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(formData.phoneNumbers))
      newErrors.phoneNum = "Số điện thoại không hợp lệ (9-11 chữ số).";

    if (formData.customerPassword.length < 8)
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";

    if (formData.customerPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp.";

    if (!formData.customerAddress.trim())
      newErrors.address = "Địa chỉ không được để trống.";

    if (!formData.terms)
      newErrors.terms = "Bạn phải đồng ý với điều khoản dịch vụ.";

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
      // Add error handling for user feedback
      setErrors((prev) => ({
        ...prev,
        submit: error.response?.data?.message || "Đăng ký thất bại",
      }));
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center mb-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md sm:max-w-lg lg:max-w-xl border border-gray-200">
        <h2 className="text-green-700 text-3xl font-bold text-center mb-6">
          ĐĂNG KÝ
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">Họ và tên:</label>
            <input
              name="customerName"
              type="text"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-1 bg-gray-100"
            />
            {errors.customerName && (
              <span className="text-red-500 text-sm">{errors.customerName}</span>
            )}
          </div>

          <div>
            <label className="block mt-3 mb-1">Email:</label>
            <input
              name="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-1 bg-gray-100"
            />
            {errors.customerEmail && (
              <span className="text-red-500 text-sm">{errors.customerEmail}</span>
            )}
          </div>

          <div>
            <label className="block mt-3 mb-1">Số điện thoại:</label>
            <input
              name="phoneNumbers"
              type="text"
              value={formData.phoneNumbers}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-1 bg-gray-100"
            />
            {errors.phoneNumbers && (
              <span className="text-red-500 text-sm">{errors.phoneNumbers}</span>
            )}
          </div>

          <div>
            <label className="block mt-3 mb-1">Mật khẩu:</label>
            <input
              name="customerPassword"
              type="password"
              value={formData.customerPassword}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-1 bg-gray-100"
            />
            {errors.customerPassword && (
              <span className="text-red-500 text-sm">{errors.customerPassword}</span>
            )}
          </div>

          <div>
            <label className="block mt-3 mb-1">Nhập lại mật khẩu:</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-1 bg-gray-100"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div>
            <label className="block mt-3 mb-1">Địa chỉ:</label>
            <input
              name="customerAddress"
              type="text"
              value={formData.customerAddress}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-1 bg-gray-100"
            />
            {errors.customerAddress && (
              <span className="text-red-500 text-sm">{errors.customerAddress}</span>
            )}
          </div>

          <div className="flex items-center mt-3 mb-4">
            <input
              name="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm">
              Tôi đồng ý với{" "}
              <a href="#" className="text-blue-600">
                Điều khoản dịch vụ
              </a>
              .
            </span>
          </div>
          {errors.terms && (
            <span className="text-red-500 text-sm">{errors.terms}</span>
          )}

          {errors.submit && (
            <div className="text-red-500 text-sm text-center mb-4">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            className="w-1/2 mx-auto block bg-green-700 text-white py-2 rounded-lg text-lg font-semibold mt-3 hover:bg-green-800 transition-colors"
          >
            ĐĂNG KÝ
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisForm;