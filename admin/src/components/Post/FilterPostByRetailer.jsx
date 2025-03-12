import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostFilter, setPostRetailerActive } from "../../redux/adminSlice";
import { postApi } from "../../services/postService";

const FilterPostByRetailer = () => {
  const [retailer, setretailer] = useState([]);
  const dispatch = useDispatch();

  const retailerStore = useSelector((state) => state.AdminStore.retailerStore);
  const postStore = useSelector((state) => state.AdminStore.postStore);
  const retailerActive = useSelector((state) => state.AdminStore.postRetailerActive
  );  

  useEffect(() => {
    if (retailerStore) {
      setretailer(retailerStore);
    }
    if (!retailerActive) {
      dispatch(setPostRetailerActive("allPost"));
    }
  }, [retailerStore, retailerActive, dispatch, postStore]);

  const handleClickCategory = async (retailerId) => {
    try {
      dispatch(setPostRetailerActive(retailerId));
      if (retailerId === "allPost") {
        dispatch(setPostFilter(postStore));
      } else {
        const findByRetailerId = postStore.filter(
          (item) => (item.authorId).includes(retailerId)
        );        
        dispatch(setPostFilter(findByRetailerId.data));
      }
    } catch (error) {
      console.error("Error fetching products by retailer:", error);
    }
  };

  

  return (
    <div className="ml-3 flex items-center gap-4">
      <select
        className="bg-white border-2  rounded-sm px-1 py-1.5 shadow-md text-gray-700"
        value={retailerActive || "allPost"}
        onChange={(e) => handleClickCategory(e.target.value)}
      >
        <option value="allPost" default>
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

export default FilterPostByRetailer;
