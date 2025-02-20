import axios from "axios";

const API_BASE_URL = "http://localhost:8082/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 🛠️ Tự động thêm token vào request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🛠️ Xử lý lỗi từ response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(
      error.response?.data || { message: "Lỗi kết nối đến API." }
    );
  }
);

export default api;
