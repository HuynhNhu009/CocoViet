import React from "react";
import CategoryCompo from "../components/Category/Category"
import { motion } from "framer-motion";

const Category = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-4"
      >
        <CategoryCompo />
      </motion.div>
    </>
  );
};

export default Category;
