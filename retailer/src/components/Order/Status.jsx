import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderStatus, setStatusActive } from "../../redux/retailerSlice";
const Status = () => {
  const statusStore = useSelector((state) => state.RetailerStore.statusStore);
  const statusActive = useSelector((state) => state.RetailerStore.statusActive);
  const orderStore = useSelector((state) => state.RetailerStore.orderStore);
  const [status, setstatus] = useState([]);
  const [order, setOrder] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if(statusStore != [] ){
      setstatus(statusStore);
    }
  }, [statusStore]);

  useEffect(() => {
    if (!statusActive && statusStore.length > 0) {
      dispatch(setStatusActive(statusStore[1].statusCode));
    }
  }, [statusStore, statusActive, dispatch]);

  useEffect(() => {
    if (statusActive && orderStore) {
      const request = statusStore.find(
        (item) => item.statusCode === statusActive
      );

      if (request) {
        const filteredResults = orderStore.filter(
          (item) => item.statusName === request.statusName
        );
        dispatch(
          setOrderStatus(filteredResults.length > 0 ? filteredResults : [])
        );
      }
    }
  }, [statusActive, orderStore, statusStore, dispatch]);

  // const handleClickStatus = async (statusCode) => {
  //   try {
  //     dispatch(setStatusActive(statusCode));
  //     if (statusStore.length > 0) {
  //       const request = statusStore.find(
  //         (item) => item.statusCode === statusCode
  //       );

  //       if (request) {
  //         const filteredResults = orderList.filter(
  //           (item) => item.statusName === request.statusName
  //         );
  //         console.log("filteredResults",filteredResults);
          
  //         if (filteredResults) {
  //           dispatch(setOrderStatus(filteredResults));
  //         } else {
  //           dispatch(setOrderStatus([]));
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching order by statusCode:", error);
  //     setStatus([]);
  //   }
  // };


  return (
    <>
      <div className="status flex justify-between">
        {status.slice(1).map((item, index) => (
          <div key={index} className={`bg-gray-200 w-full uppercase text-center cursor-pointer py-2
            ${
              statusActive === item.statusCode
                ? "bg-green-500 text-white after:border-l-green-700  rounded-tl-md rounded-tr-md" // active
                : "bg-gray-200"
            }`}>
            {item.statusName}
          </div>
        ))}
      </div>    

      
    </>
  );
};

export default Status;
