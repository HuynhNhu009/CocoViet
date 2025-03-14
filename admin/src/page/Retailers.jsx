import React from "react";
import RetailerList from "../components/Retailer/RetailerList";
import { motion } from "framer-motion";

const Retailers = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-4"
      >
        <RetailerList />
      </motion.div>
    </>
  );
};

export default Retailers;
