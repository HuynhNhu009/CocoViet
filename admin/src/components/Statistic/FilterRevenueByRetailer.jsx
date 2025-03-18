import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  setRevenueListRetailer, setRevenueRetailerActive } from "../../redux/adminSlice";
import { orderAPI } from "../../services/orderService";

const FilterRevenueByRetailer = () => {
  const [retailer, setretailer] = useState([]);
  const dispatch = useDispatch();

  const retailerStore = useSelector((state) => state.AdminStore.retailerStore);
  const retailerActive = useSelector((state) => state.AdminStore.revenueRetailerActive);
    const revenueStore = useSelector((state) => state.AdminStore.revenueList);


  useEffect(() => {
    if (retailerStore) {
      setretailer(retailerStore);
    }    
    
    if (!retailerActive) {
      dispatch(setRevenueRetailerActive("allStatistic"));
    }
  }, [retailerStore, retailerActive, dispatch, revenueStore]);

  const handleClickCategory = async (retailerId) => {
    try {
      dispatch(setRevenueRetailerActive(retailerId));
      
      if (retailerId === "allStatistic") {        
        await dispatch(setRevenueListRetailer(revenueStore));
      } else {
        const findByRetailerId = await orderAPI.getRevenue(retailerId);        
        await dispatch(setRevenueListRetailer(findByRetailerId.data));
      }
    } catch (error) {
      console.error("Error fetching products by retailer:", error);
    }
  };

  

  return (
    <div className="ml-3 flex items-center gap-4">
      <select
        className="  bg-black px-1 py-1.5 shadow-md text-white"
        value={retailerActive || "allStatistic"}
        onChange={(e) => handleClickCategory(e.target.value)}
      >
        <option value="allStatistic" default>
          Tất cả cửa hàng
        </option>
        {retailer.map((item) => (
          <option key={item.retailerId} value={item.retailerId}>
            {item.retailerName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterRevenueByRetailer;
