import api from "./api/api";

export const categoryAPI = {
  getAllCategories: async () => {
    const response = await api.get("/categories/get-all");
    return response.data;
  },

  addCategory: async (category) => {
    const response = await api.post("/categories/add",category);
    return response.data;
  },


};
