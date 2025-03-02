import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOrderStatus, setStatusActive } from "../../redux/orderSlice";
function Status() {
  const statusStore = useSelector((state) => state.OrderStore.status);
  const orderList = useSelector((state) => state.OrderStore.orderList);
  const statusActive = useSelector((state) => state.OrderStore.statusActive);

  console.log("order - status", orderList);

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
    if (statusActive && orderList) {
      const request = statusStore.find(
        (item) => item.statusCode === statusActive
      );

      if (request) {
        const filteredResults = orderList.filter(
          (item) => item.statusName === request.statusName
        );
        dispatch(
          setOrderStatus(filteredResults.length > 0 ? filteredResults : [])
        );
      }
    }
  }, [statusActive, orderList, statusStore, dispatch]);

  const handleClickStatus = async (statusCode) => {
    try {
      dispatch(setStatusActive(statusCode));
      if (statusStore.length > 0) {
        const request = statusStore.find(
          (item) => item.statusCode === statusCode
        );

        if (request) {
          const filteredResults = orderList.find(
            (item) => item.statusName === request.statusName
          );
          if (filteredResults) {
            dispatch(setOrderStatus(filteredResults));
          } else {
            dispatch(setOrderStatus([]));
          }
        }
      }
    } catch (error) {
      console.error("Error fetching order by statusCode:", error);
      setStatus([]);
    }
  };

  return (
    <div className="flex flex-row justify-center flex-wrap">
      {status.length > 0 ? (
        status.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClickStatus(item.statusCode)}
            className={`relative mx-3 my-2 text-white font-bold bg-gray-400 py-3 
            text-center w-32 pl-6 before:absolute before:-left-0 before:top-1/2 
            before:-translate-y-1/2 before:w-0 before:h-0 before:border-y-25 
            before:border-l-20 before:border-y-transparent before:border-l-white
            after:absolute after:-right-6 after:top-1/2 after:-translate-y-1/2 
            after:w-0 after:h-0 after:border-y-24 after:border-l-25 after:border-y-transparent 
            after:border-l-gray-500 cursor-pointer  ${
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
