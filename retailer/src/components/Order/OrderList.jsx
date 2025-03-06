import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Status from "./Status";
import OrderItem from "./OrderItem";

const OrderList = ({ orderStatus }, label) => {

  console.log(orderStatus);
  

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
