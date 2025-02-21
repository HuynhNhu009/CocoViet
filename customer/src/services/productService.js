import api from "./api/api";

export const productAPI = {
  getAllProducts: async () => {
    const response = await api.get("/products/get-all");
    return response.data;
  },

  getByCategoryId: async (categoryId) => {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
  },

  getByProductId: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },
};
