import { useEffect, useState } from "react";
import { orderAPI } from "../../services/orderService";
import { useDispatch, useSelector } from "react-redux";
import { setCreateOrder } from "../../redux/orderSlice";
import Swal from "sweetalert2";

function OrderBill(orderStore) {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);

  const CustomerStore = useSelector((state) => state.CustomerStore.customer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderStore?.orderStore) {
      const orderData = Array.isArray(orderStore.orderStore)
        ? orderStore.orderStore
        : [orderStore.orderStore];
  
      setOrders(orderData);
  
      const prices = {};
  
      orderData.forEach((order) => {
        let orderTotal = 0;
        order?.receiptDetails?.forEach((item) => {
          orderTotal += item.productVariants.price * item.totalQuantity;
        });
        prices[order.orderId] = orderTotal; 
      });
  
      setTotalPrice(prices);
      setLoading(false);
    }
  }, [orderStore]);
 

  if (loading) {
    return <p className="text-center text-gray-500">Đang tải đơn hàng...</p>;
  }

  const handleCancelledOrder = async (orderId) => {
    try {
      const orderRequest = { statusCode: "CANCELLED" };
      Swal.fire({
        title: "Hủy đơn hàng",
        text: "Bạn có chắc muốn hủy đơn hàng này không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, tôi hủy!",
        cancelButtonText: "Không hủy!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await orderAPI.updateOrder(orderId, orderRequest);
          await dispatch(setCreateOrder(true));
          Swal.fire({
            title: "Đã hủy đơn hàng!",
            showConfirmButton: false,
            icon: "success",
            timer: 1000,
          });
        }
      });
    } catch (error) {
      console.error("Lỗi cập nhật đơn hàng:", error);
    }
  };

  return (
    <div className="mt-5 flex justify-center flex-col items-center">
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div
            key={order.orderId}
            className="mb-3 px-8 py-5 border-2 border-green-600 rounded-md bg-white w-[600px]"
          >
            <div
              onClick={() =>
                setSelectedOrderIndex(
                  selectedOrderIndex === index ? null : index
                )
              }
              className="mb-3 hover:text-green-500 text-center cursor-pointer font-bold text-lg text-green-600"
            >
              HÓA ĐƠN #{index + 1}
            </div>
            {selectedOrderIndex === index && (
              <>
                <div className="infor-customer flex justify-between">
                  <div>
                    <p>
                      Khách hàng:{" "}
                      {CustomerStore?.customerName || "Không có thông tin"}
                    </p>
                    <div className="mb-2 w-full">
                      <span>Địa chỉ: </span>
                      <input
                        type="text"
                        className="px-1 rounded-sm"
                        value={CustomerStore?.customerAddress || ""}
                        readOnly
                      />
                    </div>

                    <div>
                      <span>Số điện thoại: </span>
                      <input
                        type="text"
                        className="px-1 rounded-sm"
                        value={CustomerStore?.phoneNumbers || ""}
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <p>Mã đơn: {order.orderId.split("-")[0].toUpperCase()}</p>
                    <p>
                      Ngày:{" "}
                      {order.orderDate
                        ?.split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/") || "N/A"}
                    </p>
                  </div>
                </div>
                {Object.entries(
                  order?.receiptDetails?.reduce((acc, item) => {
                    if (!acc[item.retailerName]) acc[item.retailerName] = [];
                    acc[item.retailerName].push(item);
                    return acc;
                  }, {})
                ).map(([retailerName, items], idx) => (
                  <div key={idx}>
                    <div className="product bg-gray-300 px-3 py-1 font-bold mt-4">
                      {retailerName}
                    </div>
                    <table className="w-full border-collapse border mt-2">
                      <tbody>
                        {items.map((item, id) => (
                          <tr key={id} className="border-b">
                            <td className="border px-2 py-2 w-1/2">
                              {item.productName} - {item.productVariants.value}
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
                  </div>
                ))}

                <div className="payment mt-5">
                  <p>Thanh Toán</p>
                  <select name="payment" className="w-full px-3 py-2 border">
                    <option value={order.paymentMethod}>
                      {order.paymentMethod}
                    </option>
                    <option>Cash</option>
                  </select>
                </div>

                <div className="text-right font-bold text-lg mt-4">
                  Tổng tiền:
                  <span className="text-red-600"> {totalPrice[order.orderId] || 0} VND</span>
                </div>
                <button
                  onClick={() => handleCancelledOrder(order.orderId)}
                  className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full hover:bg-green-700"
                >
                  Hủy đơn
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Không có hóa đơn nào.</p>
      )}
    </div>
  );
}

export default OrderBill;
