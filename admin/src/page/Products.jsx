import React from "react";
import ProductList from "../components/Product/ProductList";
import { motion } from "framer-motion";

const Products = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-4"
      >
        <ProductList />
      </motion.div>
    </>
  );
};

export default Products;
