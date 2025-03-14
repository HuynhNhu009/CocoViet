import React from "react";
import CustomerList from "../components/Customer/CustomerList";
import { motion } from "framer-motion";

const Customers = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-4"
      >
        <CustomerList />
      </motion.div>
    </>
  );
};

export default Customers;
