import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostFilter, setPostRetailerActive } from "../../redux/adminSlice";
import { postApi } from "../../services/postService";

const FilterPostByRetailer = () => {
  const [retailer, setRetailer] = useState([]);
  const dispatch = useDispatch();

  const retailerStore = useSelector((state) => state.AdminStore.retailerStore);
  const postStore = useSelector((state) => state.AdminStore.postStore);
  const retailerActive = useSelector(
    (state) => state.AdminStore.postRetailerActive
  );

  useEffect(() => {
    if (retailerStore) {
      setRetailer(retailerStore);
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
        const findByRetailerId = postStore.filter((item) =>
          item.authorId.includes(retailerId)
        );
        dispatch(setPostFilter(findByRetailerId)); // Fixed: Removed .data as it’s not present in the filtered array
      }
    } catch (error) {
      console.error("Error fetching products by retailer:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <select
        className="w-full sm:w-48 bg-white border-2 rounded-md px-2 py-2 text-sm sm:text-base text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={retailerActive || "allPost"}
        onChange={(e) => handleClickCategory(e.target.value)}
      >
        <option value="allPost">Tất cả cửa hàng</option>
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