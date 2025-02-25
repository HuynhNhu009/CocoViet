import api from "./Api";

export const categoryApi = {
  getCategoryById: async (categoryId) => {
    const reponse = await api.get(`/categories/${categoryId}`);
    return reponse.data;
  },
  getAllCategory: async () => {
    const reponse = await api.get(`/categories/get-all`);
    return reponse.data;
  },
};
