import { apiService } from "../apiService";

export const productApi = {
  getAll: async () => await apiService.get("/customers/get-all"),
  // getById: async (id) => await apiService.get(`/products/${id}`),
  // create: async (product) => await apiService.post("/products", product),
  // update: async (id, product) =>
  //   await apiService.put(`/products/${id}`, product),
  // delete: async (id) => await apiService.delete(`/products/${id}`),
};
