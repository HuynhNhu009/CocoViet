import React from "react";
import StatusCompo from "../components/Status/Status";
import { motion } from "framer-motion";

const Status = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-4"
      >
        <StatusCompo />
      </motion.div>
    </>
  );
};

export default Status;
