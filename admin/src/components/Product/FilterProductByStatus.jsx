import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductStatus, setProductStatusActive } from "../../redux/adminSlice";

const FilterProductByStatus = () => {
  const dispatch = useDispatch();

  const productStore = useSelector((state) => state.AdminStore.productStore);
  const productStatusActive = useSelector((state) => state.AdminStore.productStatusActive);
  const loadingAPI = useSelector((state) => state.AdminStore.loadingAPI);
  
  const productStatus = [
    {
      status:"ENABLE",
      statusName: "Đang bán"
    },
    {
      status:"DISABLE",
      statusName: "Chờ duyệt"
    },
    {
      status:"PAUSE",
      statusName: "Tạm ngừng"
    },
    {
      status:"BLOCK",
      statusName: "Vi phạm"
    },
  ]

  useEffect(() => {
    if(productStatusActive){
      // const findByStatus = productStore.filter((item) => (
      //   item.status === productStatusActive
      // ))   
      // dispatch(setProductStatus(findByStatus));
      
      if(productStatusActive === "allProduct"){
        dispatch(setProductStatusActive("allProduct"));
      dispatch(setProductStatus(productStore));
      }
      
    }

    if (!productStatusActive) {
      dispatch(setProductStatusActive("allProduct"));
      dispatch(setProductStatus(productStore));
    }


  }, [ dispatch, productStore, loadingAPI, productStatusActive]);

  const handleClickStatus = async (status) => {    
    try {
      dispatch(setProductStatusActive(status));
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  return (
    <div className=" flex items-center gap-4">
      <select
        className="bg-white border-2  rounded-sm px-1 py-1.5 shadow-md text-gray-700"
        value={productStatusActive || "allProduct"}
        onChange={(e) => handleClickStatus(e.target.value)}
      >
        <option value="allProduct" default>Tất cả trạng thái</option>
        {productStatus.map((item) => (
          <option key={item.status} value={item.status}>
            {item.statusName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterProductByStatus;
