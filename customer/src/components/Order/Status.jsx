import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { useSelector } from "react-redux";
import { statusAPI } from "../../services/statusService";
import { logout } from "../../redux/customerSlice";
import { useDispatch } from "react-redux";
import { setStatusActive } from "../../redux/orderSlice";
function Status() {
  const statusStore = useSelector((state) => state.OrderStore.status);    
  const orderList = useSelector((state) => state.OrderStore.orderList);    
  const statusActive = useSelector((state) => state.OrderStore.statusActive);    
  
  console.log("list", orderList);
  
  const [status, setStatus] = useState([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (statusStore.length > 0) {
      setStatus(statusStore);
      
    }
  }, [statusStore]);

  
  const handleClickStatus = async (statusCode) => {
      try {
          dispatch(setStatusActive(statusCode)); 

          
          // if(filteredResults){
          //   console.log(filteredResults);
            
          // }

          // const findByCategoryId = await productAPI.getByCategoryId(categoryId);
          // dispatch(setProductCategory([]));
          // dispatch(setProductCategory(findByCategoryId.data));
          // setProducts(findByCategoryId.data);
      } catch (error) {
          console.error("Error fetching order by statusCode:", error);
          setStatus([]);
      }
  };
      


  return (
      <div className="flex flex-row justify-center ">
        {status.length > 0 ? (
          status.map((item, index) => (
            <div
              key={index}
              onClick={() => (handleClickStatus(item.statusCode))}
              className={`relative mx-3 text-white font-bold bg-gray-400 py-3 
            text-center w-32 pl-6 before:absolute before:-left-0 before:top-1/2 
            before:-translate-y-1/2 before:w-0 before:h-0 before:border-y-25 
            before:border-l-20 before:border-y-transparent before:border-l-white
            after:absolute after:-right-6 after:top-1/2 after:-translate-y-1/2 
            after:w-0 after:h-0 after:border-y-24 after:border-l-25 after:border-y-transparent 
            after:border-l-gray-500 cursor-pointer ${
                        statusActive === item.statusCode
                            ? "bg-green-700" // active
                            : "bg-gray-400"
                    }`}
            >
            {item.statusName}
            </div>
          ))
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </div>
  );
}

export default Status;
