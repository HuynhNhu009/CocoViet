import axios from "axios";

const API_URL = "http://localhost:8082/api/products/get-all"; // Cập nhật URL nếu cần

export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data.data || []; // Trả về `data` nếu có, nếu không thì mảng rỗng
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    return [];
  }
};
