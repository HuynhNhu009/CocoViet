import { useEffect, useState } from "react";
import { productAPI } from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import {  setCategoryActive, setPoductCategory } from "../../redux/adminSlice";

const FilterProductByRetailer = () => {
  const [retailer, setretailer] = useState([]);
  const dispatch = useDispatch();
  const categoryActive = useSelector(
    (state) => state.AdminStore.categoryActive
  );
  const retailerStore = useSelector((state) => state.AdminStore.retailerStore);
  const productStore = useSelector((state) => state.AdminStore.productStore);

  useEffect(() => {
    if (retailerStore) {
      setretailer(retailerStore);
    }
    if (!categoryActive) {
      dispatch(setCategoryActive("allProduct"));
    }
  }, [retailerStore, categoryActive, dispatch, productStore]);

  const handleClickCategory = async (retailerId) => {    
    try {
      dispatch(setCategoryActive(retailerId));
      if(retailerId === "allProduct"){
        dispatch(setPoductCategory(productStore)); 
      }else{        
        const findByRetailerId = await productAPI.getProductByRetailerId(retailerId);  
        dispatch(setPoductCategory(findByRetailerId.data));
      }
      
    } catch (error) {
      console.error("Error fetching products by retailer:", error);
    }
  };

  return (
    <div className="ml-3 flex items-center gap-4">
      <select
        className="bg-white border-2  rounded-sm px-1 py-1.5 shadow-md text-gray-700"
        value={categoryActive || "allProduct"}
        onChange={(e) => handleClickCategory(e.target.value)}
      >
        <option value="allProduct" default>Tất cả cửa hàng</option>
        {retailer.map((item) => (
          <option key={item.retailerId} value={item.retailerId}>
           {item.retailerName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterProductByRetailer;
