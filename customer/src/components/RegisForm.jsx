import { useState } from "react";

function RegisForm() {
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const form = event.target;
        const formData = new FormData(form);

        const userData = {
            fullname: formData.get("fullname").trim(),
            email: formData.get("email").trim(),
            phone: formData.get("phoneNum").trim(),
            gender: formData.get("gender") || "",
            dob: formData.get("dob"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
            terms: formData.get("terms") === "on",
        };

        console.log("📝 JSON xuất ra:", JSON.stringify(userData, null, 2));

        let newErrors = {};

        
        if (!userData.fullname) newErrors.fullname = "Họ và tên không được để trống.";
        
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) newErrors.email = "Email không hợp lệ.";
        
        let phoneRegex = /^[0-9]{9,11}$/;
        if (!phoneRegex.test(userData.phone)) newErrors.phone = "Số điện thoại không hợp lệ (9-11 chữ số).";
        
        if (!userData.gender) newErrors.gender = "Vui lòng chọn giới tính.";
        
        if (!userData.dob) newErrors.dob = "Vui lòng chọn ngày sinh.";
        
        if (userData.password.length < 8) newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
        
        if (userData.password !== userData.confirmPassword) 
            newErrors.confirmPassword = "Mật khẩu nhập lại không khớp.";
        
        if (!userData.terms) newErrors.terms = "Bạn phải đồng ý với điều khoản dịch vụ.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return; 

        try {
            const response = await fetch("/abc", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Có lỗi xảy ra khi gửi dữ liệu.");
            }

            alert("Đăng ký thành công!");
            form.reset(); 
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Đăng ký thất bại, vui lòng thử lại.");
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center my-[20px]">
            <div className="bg-white shadow-lg rounded-lg p-8 w-[450px] border border-gray-200">
                <h2 className="text-green-700 text-3xl font-bold text-center mb-6">ĐĂNG KÝ</h2>
                <form id="registerForm" onSubmit={handleSubmit}>
                    <label className="block mb-1">Họ và tên:</label>
                    <input name="fullname" type="text" className="w-full border rounded p-2 mb-3 bg-gray-100" />
                    <span className="error text-red-500">{errors.fullname}</span>

                    <label className="block mb-1">Email:</label>
                    <input name="email" type="email" className="w-full border rounded p-2 mb-3 bg-gray-100" />
                    <span className="error text-red-500">{errors.email}</span>

                    <label className="block mb-1">Số điện thoại:</label>
                    <input name="phoneNum" type="text" className="w-full border rounded p-2 mb-3 bg-gray-100" />
                    <span className="error text-red-500">{errors.phone}</span>

                    <label className="block mb-1">Giới tính:</label>
                    <div className="flex space-x-4 mb-3">
                        <label><input type="radio" name="gender" value="Nam" className="mr-1" /> Nam</label>
                        <label><input type="radio" name="gender" value="Nữ" className="mr-1" /> Nữ</label>
                        <label><input type="radio" name="gender" value="Khác" className="mr-1" /> Khác</label>
                    </div>
                    <span className="error text-red-500">{errors.gender}</span>

                    <label className="block mb-1">Ngày sinh:</label>
                    <input name="dob" type="date" className="w-full border rounded p-2 mb-3 bg-gray-100" />
                    <span className="error text-red-500">{errors.dob}</span>

                    <label className="block mb-1">Mật khẩu:</label>
                    <input name="password" type="password" className="w-full border rounded p-2 mb-3 bg-gray-100" />
                    <span className="error text-red-500">{errors.password}</span>

                    <label className="block mb-1">Nhập lại mật khẩu:</label>
                    <input name="confirmPassword" type="password" className="w-full border rounded p-2 mb-3 bg-gray-100" />
                    <span className="error text-red-500">{errors.confirmPassword}</span>

                    <div className="flex items-center mb-4">
                        <input name="terms" type="checkbox" className="mr-2" />
                        <span className="text-sm">Tôi đồng ý với <a href="#" className="text-blue-600">Điều khoản dịch vụ</a>.</span>
                    </div>
                    <span className="error text-red-500">{errors.terms}</span>

                    <button type="submit" className="w-1/2 mx-auto block bg-green-700 text-white py-2 rounded-lg text-lg font-semibold">
                        ĐĂNG KÝ
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisForm;
