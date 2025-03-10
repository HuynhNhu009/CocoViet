import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { useSelector } from "react-redux";
import Status from "./Status";
import OrderItem from "./OrderItem";
import OrderBill from "./OrderBill";

function Order() {
  const orderStatus = useSelector((state) => state.OrderStore.orderStatus);
  const [order, setOrder] = useState({});
  const statusActive = useSelector((state) => state.OrderStore.statusActive);

  useEffect(() => {
    if (orderStatus.length == 1) {
      setOrder(orderStatus[0]);
    } else {
      setOrder(orderStatus);
    }
  }, [orderStatus, statusActive]);  

  return (
    <div className="flex justify-center flex-col w-full sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-8">
      <Status />
      {["CART"].includes(
        statusActive
      ) && <OrderItem orderStore={order} />}

      {["PROCESSING", "SHIPPING", "DELIVERED", "CANCELLED"].includes(
        statusActive
      ) && <OrderBill orderStore={order} />}
    </div>
  );
}

export default Order;
