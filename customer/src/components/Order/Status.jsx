import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderStatus,
  setStatusActive,
  setStatusName
} from "../../redux/orderSlice";
import { orderAPI } from "../../services/orderService";
function Status() {
  const statusStore = useSelector((state) => state.OrderStore.status);
  const statusActive = useSelector((state) => state.OrderStore.statusActive);
  const customer = useSelector((state) => state.CustomerStore.customer);
  const createOrder = useSelector((state) => state.OrderStore.createOrder);
  

  const [status, setStatus] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (statusStore?.length > 0) {
      setStatus(statusStore);
    }
  }, [statusStore]);

  useEffect(() => {
    if (!statusActive && statusStore.length > 0) {
      dispatch(setStatusActive(statusStore[0].statusCode));
    }
  }, [statusStore, statusActive, dispatch]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (statusActive && customer.customerId) {
        try {
          const response = await orderAPI.getOrderByCustomerId(
            customer.customerId,
            statusActive
          );

          dispatch(
            setOrderStatus(response.data.length > 0 ? response.data : [])
          );
        } catch (error) {
          console.error("Lỗi khi lấy đơn hàng:", error);
        }
      }
    };

    fetchOrders();
  }, [statusActive, statusStore,createOrder, dispatch]);

  const handleClickStatus = async (status) => {
    try {
      dispatch(setStatusActive(status.statusCode));
      dispatch(setStatusName(status.statusName));
      const response = await orderAPI.getOrderByCustomerId(
        customer.customerId,
        status.statusCode
      );

      dispatch(setOrderStatus(response.data.length > 0 ? response.data : []));
    } catch (error) {
      console.error("Error fetching order by statusCode:", error);
      setStatus([]);
    }
  };

  return (
    <div className="flex flex-row justify-center flex-wrap">
      {status.length > 0 ? (
        status?.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClickStatus(item)}
            className={`relative mx-3 my-2 text-white font-bold bg-gray-400 py-3 
            text-center w-32 pl-6 before:absolute before:-left-0 before:top-1/2 
            before:-translate-y-1/2 before:w-0 before:h-0 before:border-y-25 
            before:border-l-20 before:border-y-transparent before:border-l-white
            after:absolute after:-right-6 after:top-1/2 after:-translate-y-1/2 
            after:w-0 after:h-0 after:border-y-24 after:border-l-25 after:border-y-transparent 
            after:border-l-gray-500 cursor-pointer hover:bg-green-600  ${
              statusActive === item.statusCode
                ? "bg-green-600 after:border-l-green-700 " // active
                : "bg-gray-400"
            }`}
          >
            {item.statusName}
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Status;
