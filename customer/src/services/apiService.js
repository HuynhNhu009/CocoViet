const API_BASE_URL = "http://localhost:8082/api"; // Thay bằng API gốc

export const apiService = {
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Có lỗi xảy ra khi gọi API.");
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message || "Lỗi kết nối đến API." };
    }
  },
};
