import api from "./api/api";

export const categoryAPI = {
  getAllCategories: async () => {
    const response = await api.get("/categories/get-all");
    return response.data;
  },

  addCategory: async (categoryName) => {
    const response = await api.post("/categories/add",categoryName);
    return response.data;
  },
  deleteCategoryById: async (categoryId) => {
    const response = await api.delete("/categories/",{
      params: {
        categoryId: categoryId
      },
    });
    return response.data;
  },
};
