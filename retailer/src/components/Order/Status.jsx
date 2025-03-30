import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountOrder, setLoadOrder, setOrderStatus, setStatusActive, setStatusName } from "../../redux/retailerSlice";

const Status = () => {
  const statusStore = useSelector((state) => state.RetailerStore.statusStore);
  const statusActive = useSelector((state) => state.RetailerStore.statusActive);
  const statusName = useSelector((state) => state.RetailerStore.statusName);
  const orderStore = useSelector((state) => state.RetailerStore.orderStore);
  const loadOrder = useSelector((state) => state.RetailerStore.loadOrder);
  const [status, setStatus] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (statusStore != []) {
      setStatus(statusStore);
    }
  }, [statusStore]);

  useEffect(() => {
    if (!statusActive && statusStore.length > 0) {
      dispatch(setStatusActive(statusStore[1].statusCode));
      dispatch(setStatusName(statusStore[1].statusName));
    }
  }, [statusStore, statusActive, statusName, dispatch]);

  useEffect(() => {
    if (statusActive && orderStore) {
      const request = statusStore.find(
        (item) => item.statusCode === statusActive
      );

      if (request) {
        const filteredResults = orderStore.filter((item) =>
          item.receiptDetails.some(
            (detail) => detail.statusName === request.statusName
          )
        );
        if (request.statusCode === "PROCESSING") {
          dispatch(
            setCountOrder(filteredResults.length > 0 ? filteredResults.length : 0)
          );
        }

        dispatch(
          setOrderStatus(filteredResults.length > 0 ? filteredResults : [])
        );
      }
    }
  }, [statusActive, orderStore, loadOrder, statusStore, dispatch]);

  const handleClickStatus = async (status) => {
    try {
      dispatch(setStatusActive(status.statusCode));
      dispatch(setStatusName(status.statusName));
      if (statusStore.length > 0) {
        const request = statusStore.find(
          (item) => item.statusCode === status.statusCode
        );

        if (request) {
          const filteredResults = orderStore.filter((item) =>
            item.receiptDetails.some(
              (detail) => detail.statusName === request.statusName
            )
          );

          if (filteredResults.length > 0) {
            await dispatch(setOrderStatus(filteredResults));
          } else {
            await dispatch(setOrderStatus([]));
          }

          await dispatch(setLoadOrder(true));
        }
      }
    } catch (error) {
      console.error("Error fetching order by statusCode:", error);
      await dispatch(setOrderStatus([]));
    }
  };

  return (
    <div className="status">
      {/* Desktop: Horizontal layout */}
      <div className="hidden md:flex justify-between">
        {status.slice(1).map((item, index) => (
          <div
            key={index}
            onClick={() => handleClickStatus(item)}
            className={`w-full uppercase text-center cursor-pointer py-2 hover:text-gray-600
              ${
                statusActive === item.statusCode
                  ? "bg-green-500 text-white shadow-md shadow-gray-300 rounded-tl-md rounded-tr-md"
                  : "bg-gray-50"
              }`}
          >
            {item.statusName}
          </div>
        ))}
      </div>

      {/* Mobile/iPad: Vertical layout */}
      <div className="block md:hidden space-y-2">
        {status.slice(1).map((item, index) => (
          <div
            key={index}
            onClick={() => handleClickStatus(item)}
            className={`w-full uppercase text-center cursor-pointer py-3 px-2 rounded-md hover:text-gray-600
              ${
                statusActive === item.statusCode
                  ? "bg-green-500 text-white shadow-md shadow-gray-300"
                  : "bg-gray-50"
              }`}
          >
            {item.statusName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;