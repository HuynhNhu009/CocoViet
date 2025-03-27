import { motion } from "framer-motion";
import React, { useState } from "react";
import { adminAPI } from "../services/adminService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin, setLogin } from "../redux/adminSlice";
import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({ adminName: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const login = await adminAPI.login(formData);
      if (login.status === "OK") {
        dispatch(setLogin(true));
        const response = await adminAPI.introspect();
        if (response.status === "OK") {
          dispatch(setAdmin(response.data));
          let timerInterval;
          Swal.fire({
            title: "Đăng nhập thành công!",
            html: "Đang vào trang quản trị",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              // const timer = Swal.getPopup().querySelector("b");
              // timerInterval = setInterval(() => {
              //   timer.textContent = `${Swal.getTimerLeft()}`;
              // }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            navigate("/products");
          });
        } else {
          setError("Hết hạn đăng nhập");
        }
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-4"
      >
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 shadow-md rounded-lg w-96">
            <h2 className="text-xl font-bold text-center mb-6">ĐĂNG NHẬP</h2>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white font-medium py-2 rounded-md"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
