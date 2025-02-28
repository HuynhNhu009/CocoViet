import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { useSelector } from "react-redux";
import { orderAPI } from "../../services/orderService";
import Status from "./Status";
import { useDispatch } from "react-redux";
import { setOrderList } from "../../redux/orderSlice";
import OrderItem from "./OrderItem";

function Order() {
  const orderStatus = useSelector((state) => state.OrderStore.orderStatus);  
  const [order, setOrder] = useState({});
    
  useEffect( () => {
    if (orderStatus.length == 1) {
      setOrder(orderStatus[0]);
    } else {
      setOrder(orderStatus);
    }
  }, [orderStatus]);

  return (
    <div className="flex justify-center flex-col w-full sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-8">
      <Status />
      <OrderItem 
        orderStore={order}
      />
     
    </div>
  );
}

export default Order;
