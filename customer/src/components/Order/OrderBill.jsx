import React, { useEffect, useState } from "react";
import { orderAPI } from "../../services/orderService";
import { useDispatch, useSelector } from "react-redux";
import { setCreateOrder } from "../../redux/orderSlice";
import Swal from "sweetalert2";

function OrderBill(orderStore) {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState({});
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const CustomerStore = useSelector((state) => state.CustomerStore.customer);
  const paymentStore = useSelector((state) => state.OrderStore.payment);
  const statusActive = useSelector((state) => state.OrderStore.statusActive);
  const dispatch = useDispatch();

  const [selectedPayments, setSelectedPayments] = useState({});

  const [customerInfo, setCustomerInfo] = useState({
    customerName: "",
    customerAddress: "",
    customerNumber: "",
  });

  useEffect(() => {
    setCustomerInfo({
      customerName: CustomerStore.customerName,
      customerAddress: CustomerStore.customerAddress,
      customerNumber: CustomerStore.phoneNumbers,
    });
  }, [CustomerStore]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  //infor
  const hanldleSaveInfo = async (orderId) => {
    await orderAPI.updateOrder(orderId, customerInfo);
    await dispatch(setCreateOrder(true));
  };

  const handlePaymentChange = async (orderId, paymentMethod, paymentCode) => {
    setSelectedPayments((prev) => ({ ...prev, [orderId]: paymentMethod }));
    let paymentRequest = { paymentCode };
    await orderAPI.updateOrder(orderId, paymentRequest);
    await dispatch(setCreateOrder(true));
  };

  useEffect(() => {
    if (orderStore?.orderStore) {
      const orderData = Array.isArray(orderStore.orderStore)
        ? orderStore.orderStore
        : [orderStore.orderStore];

      setOrders(orderData);

      const prices = {};
      const payment = {};

      orderData.forEach((order) => {
        payment[order.orderId] = order.paymentMethod || "";

        let orderTotal = 0;
        order?.receiptDetails?.forEach((item) => {
          orderTotal += item.productVariants.price * item.totalQuantity;
        });
        prices[order.orderId] = orderTotal + 30;
      });

      setTotalPrice(prices);
      setSelectedPayments(payment);
    }
  }, [orderStore]);

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

  const buyAgain = async (orderId) => {
    try {
      const orderRequest = { statusCode: "CART" };
      Swal.fire({
        title: "Bạn muốn mua lại",
        text: "Bạn muốn mua lại các sản phẩm trong đơn hàng này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, tôi mua!",
        cancelButtonText: "Không mua!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await orderAPI.updateOrder(orderId, orderRequest);
          await dispatch(setCreateOrder(true));
          Swal.fire({
            title: "Đã thêm vào giỏ hàng!",
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

  const isDisabled = ["SHIPPING", "DELIVERED", "CANCELLED"].includes(
    statusActive
  );

  return (
    // mt-5 flex justify-center flex-col items-center
    <div className="">
      <div>
        {/* Bảng cho desktop */}
        <div className=" md:block w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className=" text-center bg-green-100 text-gray-600 uppercase">
                <th className="p-3 text-sm  ">Mã đơn</th>
                <th className="p-3 text-sm  ">Ngày đặt</th>
                <th className="p-3 text-sm ">Tổng tiền</th>
                <th className="p-3 text-sm ">Trạng thái</th>
                <th className="p-3 text-sm ">Hành động</th>
              </tr>
            </thead>

            <tbody className="w-full">
              {orders.length > 0 ? (
                orders.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr
                    title="Xem chi tiết"
                      onClick={() =>
                        setSelectedOrderIndex(
                          selectedOrderIndex === item.orderId
                            ? null
                            : item.orderId
                        )
                      }
                      className={`border-b cursor-pointer w-full text-center  hover:bg-gray-50 
                           ${
                             selectedOrderIndex === item.orderId
                               ? " text-green-600 bg-gray-200 font-bold"
                               : ""
                           }
                          `}
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
                      {["SHIPPING"].includes(statusActive) && (
                        <td className="p-3 text-center text-sm">
                          <button className="bg-orange-500 shadow-2xl rounded-sm text-white mr-1 px-2 py-1 ">
                            Đã Giao Hàng
                          </button>
                        </td>
                      )}

                      {["DELIVERED", "CANCELLED"].includes(statusActive) && (
                        <td className="p-3 text-center text-sm">
                          <button className="bg-red-600 shadow-2xl rounded-sm text-white mr-1 px-2 py-1 ">
                            Xóa
                          </button>
                        </td>
                      )}
                      {["PROCESSING"].includes(statusActive) && (
                        <td className="p-3 text-center text-sm">
                          <button
                            onClick={() => handleCancelledOrder(item.orderId)}
                            className="bg-red-600 rounded-sm text-white mr-1 px-2 py-1 hover:bg-red-700 cursor-pointer"
                          >
                            Hủy đơn
                          </button>
                        </td>
                      )}
                    </tr>

                    {/* receiptDetail */}
                    {selectedOrderIndex === item.orderId && (
                      <tr className="">
                        <td
                          colSpan="5"
                          className="bg-gray-50 p-4 text-left shadow-lg rounded-2xl "
                        >
                          <h3 className="text-lg text-gray-700 font-bold  bg-green-200 text-center">
                            CHI TIẾT ĐƠN HÀNG
                          </h3>
                          <div className="info-customer">
                            <p>Khách Hàng: {item.customerName}</p>
                            <p>Địa chỉ: {item.customerAddress}</p>
                            <p>Số điện thoại: {item.customerNumber}</p>
                          </div>

                          {Object.entries(
                            item?.receiptDetails?.reduce((acc, item) => {
                              if (!acc[item.retailerName])
                                acc[item.retailerName] = [];
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
                            </div>
                          ))}

                          <div className="payment my-5 ">
                            <p className="text-green-600 font-bold">
                              Phương thức
                            </p>

                            {["SHIPPING", "DELIVERED", "CANCELLED"].includes(
                              statusActive
                            ) ? (
                              <p> {selectedPayments[item.orderId] || ""}</p>
                            ) : (
                              <select
                                name="payment"
                                className="w-full px-3 py-2 border"
                                value={selectedPayments[item.orderId] || ""}
                                onChange={(e) =>
                                  handlePaymentChange(
                                    item.orderId,
                                    e.target.value,
                                    e.target.selectedOptions[0].dataset.key
                                  )
                                }
                              >
                                {paymentStore.map((method) => (
                                  <option
                                    key={method.paymentCode}
                                    data-key={method.paymentCode}
                                    value={method.paymentMethod}
                                  >
                                    {method.paymentMethod}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                          <div className="font-light">
                            *Phí ship toàn quốc 30.000 VNĐ
                          </div>

                          <p className="mt-2 font-medium text-right">
                            Tổng: {totalPrice[item.orderId] - 30} VND
                          </p>
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
    </div>
  );
}

export default OrderBill;
