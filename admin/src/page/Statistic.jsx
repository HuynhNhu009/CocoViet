import React from "react";
import { motion } from "framer-motion";

import StatisticCom from "../components/Statistic/Statistic"
const Statistic = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }}  
      transition={{ duration: 0.8 }}   
      className="p-4"
    >
      <StatisticCom />
    </motion.div>
  );
};

export default Statistic;
