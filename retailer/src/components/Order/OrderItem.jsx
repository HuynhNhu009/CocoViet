import React, { useEffect, useState } from "react";

const OrderItem = ({ orderStatus }) => {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null); 

  useEffect(() => {
    if (orderStatus) {
      const orderData = Array.isArray(orderStatus)
        ? orderStatus
        : [orderStatus];
      setOrders(orderData);

      const prices = {};
      orderData.forEach((order) => {
        let orderTotal = 0;
        order?.receiptDetails?.forEach((item) => {
          orderTotal += item.productVariants.price * item.totalQuantity;
        });
        prices[order.orderId] = orderTotal + 30;
      });

      setTotalPrice(prices);
    }
  }, [orderStatus]);

  return (
    <div>
      {/* Bảng cho desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="p-3 text-sm font-medium text-gray-700">Mã đơn</th>
              <th className="p-3 text-sm font-medium text-gray-700">
                Ngày đặt
              </th>
              <th className="p-3 text-sm font-medium text-gray-700">
                Tổng tiền
              </th>
              <th className="p-3 text-sm font-medium text-gray-700">
                Trạng thái
              </th>
              <th className="p-3 text-sm font-medium text-gray-700">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <React.Fragment key={index}>
                  <tr
                    onClick={() =>
                      setSelectedOrderId(
                        selectedOrderId === item.orderId ? null : item.orderId
                      )
                    }
                    className="border-b cursor-pointer text-center hover:bg-gray-50"
                  >
                    <td className="p-3">
                      {item.orderId.split("-")[0].toUpperCase()}
                    </td>
                    <td className="p-3">
                      {item.orderDate
                        ?.split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/") || "N/A"}
                    </td>
                    <td className="p-3">{totalPrice[item.orderId]} VND</td>
                    <td className="p-3">{item.statusName}</td>
                    <td className="p-3 text-center text-sm">
                      <button className="bg-green-600 rounded-sm text-white mr-1 px-2 py-1 hover:text-green-800 ">
                        Giao Hàng
                      </button>

                      <button className="bg-red-500 rounded-sm text-white px-2 py-1 hover:text-green-800 ">
                        Từ chối
                      </button>
                    </td>
                  </tr>
                  {/* receiptDetail */}
                  {selectedOrderId === item.orderId && (
                    <tr>
                      <td colSpan="5" className="bg-gray-50 p-4 text-left">
                        <h3 className="text-lg font-semibold text-green-600 text-center">
                          Chi tiết đơn hàng
                        </h3>
                        <div className="info-customer">
                          <p>Khách Hàng: {item.customerName}</p>
                          <p>Địa chỉ: {item.customerAddress}</p>
                          <p>Số điện thoại: {item.customerNumber}</p>
                        </div>

                        <table className="w-full border-collapse border mt-2">
                          <tbody>
                            {item.receiptDetails.map((item, idx) => (
                              <tr key={idx} className="border-b">
                                <td className="border px-2 py-2 w-1/2">
                                  {item.productName} -{" "}
                                  {item.productVariants.value}
                                  {item.productVariants.unitName}
                                </td>
                                <td className="border px-2 py-2 w-1/4 text-center">
                                  x{item.totalQuantity}
                                </td>
                                <td className="border px-2 py-2 w-1/4 text-center">
                                  {item.productVariants.price} VND
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className="mt-2 font-medium text-right">
                          Phí vận chuyển: 30 VND
                        </p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">
                  Chưa có đơn hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderItem;
