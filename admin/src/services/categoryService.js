import api from "./api/api";

export const categoryAPI = {
  getAllCategories: async () => {
    const response = await api.get("/categories/get-all");
    return response.data;
  },


};
