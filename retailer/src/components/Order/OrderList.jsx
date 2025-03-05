import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Status from "./Status";
import OrderItem from "./OrderItem";

const OrderList = ({ orderStatus }, label) => {
  // const statusStore = useSelector((state) => state.RetailerStore.statusStore);
  // const orderStore = useSelector((state) => state.RetailerStore.orderStore);
  // const [status, setstatus] = useState([]);
  
  
  if (orderStatus == []) {
    return (
      <div className="text-center py-4 text-gray-600">
        Chưa có đơn hàng nào.
      </div>
    );
  }

  return (
    <div>
      <div className="status">
        <Status />
      </div>

      <div className="orderItem">
        <OrderItem 
          orderStatus={orderStatus}
        />
      </div>
    </div>
  );
};

export default OrderList;
