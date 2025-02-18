import { productApi } from "./api/productApi";

export const productService = {
  async getProducts() {
    const { data, error } = await productApi.getAll();
    console.log("API response:", data);
    return error
      ? { products: [], error }
      : { products: data.data, error: null };
  },
};
