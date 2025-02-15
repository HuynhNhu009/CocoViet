import { getAllProducts } from "../services/ProductServiceTest";

export const loadProducts = async (setProducts) => {
  const data = await getAllProducts();
  setProducts(data);
};
