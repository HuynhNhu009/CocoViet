import { productApi } from "./api/productApi";

export const productService = {
  async getProducts() {
    const { data, error } = await productApi.getAll();
    return error
      ? { products: [], error }
      : { products: data.data, error: null };
  },
};
