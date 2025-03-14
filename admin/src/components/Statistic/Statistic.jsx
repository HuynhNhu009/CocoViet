import React from "react";
import FilterRevenueByRetailer from "./FilterRevenueByRetailer";
import StatisticItem from "./StatisticItem";

const Statistic = () => {

  return (
    <div className="">
      <div className="col-span-4 py-2 text-center flex justify-center font-bold bg-black text-white">
      <FilterRevenueByRetailer />
      </div>
      <div className="mt-3">
        <StatisticItem />
      </div>
    </div>
  );
};

export default Statistic;
