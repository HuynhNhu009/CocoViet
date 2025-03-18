import api from "./api/api";

export const productAPI = {
  getAllProducts: async () => {
    const response = await api.get("/products/get-all", {
      withCredentials: true,
    });
    return response.data;
  },

  getByCategoryId: async (categoryId) => {
    const response = await api.get(`/products/category/${categoryId}`, {
      withCredentials: true,
    });
    return response.data;
  },

  getByProductId: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },
  getProductByRetailerId: async (retialerID) => {
    const response = await api.get(`/products/retailer/${retialerID}`);
    return response.data;
  },

  setStatusProduct: async (productId, statusName) => {
    const response = await api.post(
      `/products/set-status?productId=${productId}&status=${statusName}`
    );
    console.log("Set status product => ", response.data);
    return response.data;
  },
};
