import api from "./Api";

export const productApi = {
  getProductByRetailerId: async (retialerID) => {
    const response = await api.get(`/products/retailer/${retialerID}`);
    return response.data;
  },
};
