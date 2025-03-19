import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRetailerActive } from "../../redux/adminSlice";

const FilterProductByRetailer = () => {
  const [retailer, setretailer] = useState([]);
  const dispatch = useDispatch();
  const retailerActive = useSelector((state) => state.AdminStore.retailerActive);
  const retailerStore = useSelector((state) => state.AdminStore.retailerStore);
  const productStore = useSelector((state) => state.AdminStore.productStore);

  useEffect(() => {
    if (retailerStore) {
      setretailer(retailerStore);
    }
    if (!retailerActive) {
      dispatch(setRetailerActive("allProduct"));
    }
  }, [retailerStore, retailerActive, dispatch, productStore]);

  const handleClickCategory = async (retailerId) => {    
    try {
      dispatch(setRetailerActive(retailerId));
    } catch (error) {
      console.error("Error fetching products by retailer:", error);
    }
  };

  return (
    <div className=" flex items-center gap-4">
      <select
        className="bg-white border-2  rounded-sm px-1 py-1.5 shadow-md text-gray-700"
        value={retailerActive || "allProduct"}
        onChange={(e) => handleClickCategory(e.target.value)}
      >
        <option value="allProduct" default>Tất cả cửa hàng</option>
        {retailer.map((item) => (
          <option key={item.retailerId} value={item.retailerName}>
           {item.retailerName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterProductByRetailer;
