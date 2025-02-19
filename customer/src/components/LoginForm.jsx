import { useState } from "react";

function LoginForm() {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống.";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Email không hợp lệ.";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Mật khẩu không được để trống.";
        } else if (formData.password.length < 8) {
            newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch("http://localhost:5000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();
                if (response.ok) {
                    alert("Đăng nhập thành công!");
                    //Chuyển đến trang chủ sau khi đăng nhập thành công
                    //window.location.href = "/";
                } else {
                    setErrors({ server: data.message || "Có lỗi xảy ra." });
                }
            } catch {
                //setErrors({ server: "Không thể kết nối đến máy chủ." });
                alert("Không thể kết nói tới máy chủ!");
            }
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96 border border-gray-200 my-8">
                <h2 className="text-green-600 text-2xl font-bold text-center mb-6">ĐĂNG NHẬP</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 font-semibold text-lg text-gray-500">Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    <label className="block mt-3 mb-2 font-semibold text-lg text-gray-500">Mật khẩu:</label>
                    <p className="text-xs text-gray-500">Gồm ít nhất 8 ký tự.</p>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                    <div className="text-right mt-2">
                        <a href="#" className="text-green-600 text-sm">Quên mật khẩu?</a>
                    </div>

                    {errors.server && <p className="text-red-500 text-center mt-2">{errors.server}</p>}

                    <button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 mt-4 rounded-lg hover:bg-green-700">
                        ĐĂNG NHẬP
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
