import { useDispatch, useSelector } from "react-redux";
import { setProductStatusActive, setProductStatus } from "../../redux/adminSlice";
import { productAPI } from "../../services/productService";

const FilterProductByStatus = () => {
  const dispatch = useDispatch();

  const productStore = useSelector((state) => state.AdminStore.productStore);
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

  const handleClickStatus = async (status) => {    
    try {
      dispatch(setProductStatusActive(status));
      if(status === "allProduct"){
        dispatch(setProductStatus(productStore)); 
      }else{
        const findByStatus = await productStore.filter((item) => (
          item.status === status
        ))            
        dispatch(setProductStatus(findByStatus));
      }
      
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  return (
    <div className=" flex items-center gap-4">
      <select
        className="bg-white border-2  rounded-sm px-1 py-1.5 shadow-md text-gray-700"
        // value={categoryActive || "allProduct"}
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
