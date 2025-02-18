// useProducts.js
import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

export const useProducts = () => {
  return useContext(ProductContext);
};
