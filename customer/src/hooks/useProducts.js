import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

const useProducts = () => {
  return useContext(ProductContext);
};

export default useProducts;
