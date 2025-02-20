import { productService } from "../productService";

export const productApi = {
  getAll: async () => await productService.get("/products/get-all"),

  getByCategoryId: async (categoryId) => await productService.get(`/products/category/${categoryId}`),
  // create: async (product) => await apiService.post("/products", product),
  // update: async (id, product) =>
  //   await apiService.put(`/products/${id}`, product),
  // delete: async (id) => await apiService.delete(`/products/${id}`),
};
