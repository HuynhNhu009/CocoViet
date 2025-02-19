import { useState } from "react";

function RegisForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNum: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullname.trim())
      newErrors.fullname = "Họ và tên không được để trống.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      newErrors.email = "Email không hợp lệ.";

    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(formData.phoneNum))
      newErrors.phoneNum = "Số điện thoại không hợp lệ (9-11 chữ số).";

    if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính.";

    if (!formData.dob) newErrors.dob = "Vui lòng chọn ngày sinh.";

    if (formData.password.length < 8)
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp.";

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
      const response = await fetch("/abc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Có lỗi xảy ra khi gửi dữ liệu.");

      alert("Đăng ký thành công!");
      setFormData({
        fullname: "",
        email: "",
        phoneNum: "",
        gender: "",
        dob: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });
      setErrors({});
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Đăng ký thất bại, vui lòng thử lại.");
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center my-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md sm:max-w-lg lg:max-w-xl border border-gray-200">
        <h2 className="text-green-700 text-3xl font-bold text-center mb-6">
          ĐĂNG KÝ
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">Họ và tên:</label>
            <input
              name="fullname"
              type="text"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-1 bg-gray-100"
            />
            <span className="text-red-500 text-sm">{errors.fullname}</span>
          </div>

          <div>
            <label className="block mt-3 mb-1">Email:</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-1 bg-gray-100"
            />
            <span className="text-red-500 text-sm">{errors.email}</span>
          </div>

          <div>
            <label className="block mt-3 mb-1">Số điện thoại:</label>
            <input
              name="phoneNum"
              type="text"
              value={formData.phoneNum}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-1 bg-gray-100"
            />
            <span className="text-red-500 text-sm">{errors.phoneNum}</span>
          </div>

          <div>
            <label className="block mt-3 mb-1">Giới tính:</label>
            <div className="flex space-x-4 mb-1">
              {["Nam", "Nữ", "Khác"].map((gender) => (
                <label key={gender}>
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  {gender}
                </label>
              ))}
            </div>
            <span className="text-red-500 text-sm">{errors.gender}</span>
          </div>

          <div>
            <label className="block mt-3 mb-1">Ngày sinh:</label>
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-1 bg-gray-100"
            />
            <span className="text-red-500 text-sm">{errors.dob}</span>
          </div>

          <div>
            <label className="block mt-3 mb-1">Mật khẩu:</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-1 bg-gray-100"
            />
            <span className="text-red-500 text-sm">{errors.password}</span>
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
            <span className="text-red-500 text-sm">
              {errors.confirmPassword}
            </span>
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
          <span className="text-red-500 text-sm">{errors.terms}</span>

          <button
            type="submit"
            className="w-1/2 mx-auto block bg-green-700 text-white py-2 rounded-lg text-lg font-semibold mt-3"
          >
            ĐĂNG KÝ
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisForm;
