import React, { useEffect, useState } from "react";
import { orderAPI } from "../../services/orderService";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setLoadOrder } from "../../redux/retailerSlice";

const OrderItem = ({ orderStatus }) => {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState({});
  const statusActive = useSelector((state) => state.RetailerStore.statusActive);
  const statusName = useSelector((state) => state.RetailerStore.statusName);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const dispatch = useDispatch();

  const orderRequest = {
    receiptDetailRequests: [
      {
        productVariantId: "",
        quantity: "",
        statusCode: "",
      },
    ],
  };

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

  const handleCancelledOrder = async (orderId, productVariantId) => {
    try {
      const orderRequest = { statusCode: "CANCELLED" };
      orderRequest.receiptDetailRequests = [
        {
          productVariantId: productVariantId,
          statusCode: "CANCELLED",
        },
      ];
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
          await dispatch(setLoadOrder(true));
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

  const handleShipping = async (orderId, productVariantId) => {
    try {
      orderRequest.receiptDetailRequests = [
        {
          productVariantId: productVariantId,
          statusCode: "SHIPPING",
        },
      ];

      Swal.fire({
        title: "Giao đơn hàng!",
        content: "Vui lòng xem chi tiết tại trạng thái Đang giao hàng.",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });

      await orderAPI.updateOrder(orderId, orderRequest);
      await dispatch(setLoadOrder(true));
    } catch (error) {
      console.error("Lỗi cập nhật đơn hàng:", error);
    }
  };

  const handleDelivered = async (orderId, productVariantId) => {
    try {
      orderRequest.receiptDetailRequests = [
        {
          productVariantId: productVariantId,
          statusCode: "DELIVERED",
        },
      ];
      Swal.fire({
        title: "Giao hàng thành công!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      await orderAPI.updateOrder(orderId, orderRequest);
      await dispatch(setLoadOrder(true));
    } catch (error) {
      console.error("Lỗi cập nhật đơn hàng:", error);
    }
  };

  console.log(orders);
  

  return (
    <div>
      {/* Bảng cho desktop */}
      <div className="hidden md:block overflow-x-auto">
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

          <tbody>
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <React.Fragment key={index}>
                  <tr
                    title="Xem chi tiết"
                    onClick={() =>
                      setSelectedOrderId(
                        selectedOrderId === item.orderId ? null : item.orderId
                      )
                    }
                    className={`border-b cursor-pointer text-center  hover:bg-gray-50 
                     ${
                       selectedOrderId === item.orderId
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
                    <td className="p-3">₫{(new Intl.NumberFormat("vi-VN").format(totalPrice[item.orderId]))}</td>
                    <td className="p-3">{statusName}</td>

                    {!["SHIPPING", "DELIVERED", "CANCELLED"].includes(
                      statusActive
                    ) && (
                      <td className="p-3 text-center text-sm">
                        <button
                          onClick={(e) => {
                            item.receiptDetails.forEach((detail) => {
                              handleShipping(
                                item.orderId,
                                detail.productVariants.variantId
                              );
                            });
                            e.stopPropagation();
                          }}
                          className="bg-green-600 rounded-sm shadow-2xl text-white mr-1 px-2 py-1 hover:bg-green-500 cursor-pointer"
                        >
                          Giao Hàng
                        </button>
                        <button
                          onClick={(e) => {
                            item.receiptDetails.forEach((detail) => {
                              handleCancelledOrder(
                                item.orderId,
                                detail.productVariants.variantId
                              );
                            });
                            e.stopPropagation();
                          }}
                          className="bg-red-500 rounded-sm shadow-2xl text-white px-2 py-1 hover:bg-red-600 cursor-pointer "
                        >
                          Từ chối
                        </button>
                      </td>
                    )}

                    {["SHIPPING"].includes(statusActive) && (
                      <td className="p-3 text-center text-sm">
                        <button
                          onClick={(e) => {
                            item.receiptDetails.forEach((detail) => {
                              handleDelivered(
                                item.orderId,
                                detail.productVariants.variantId
                              );
                            });
                            e.stopPropagation();
                          }}
                          className="bg-orange-500 shadow-2xl rounded-sm text-white mr-1 px-2 py-1 hover:bg-orange-600 cursor-pointer "
                        >
                          Đã Giao Hàng
                        </button>
                      </td>
                    )}
                    {["CANCELLED", "DELIVERED"].includes(statusActive) && (
                      <td className="p-3 text-center text-sm">
                        <button
                          // onClick={() => handleDelivered(item.orderId)}
                          className="bg-red-600 rounded-sm text-white mr-1 px-2 py-1 hover:text-green-800 "
                        >
                          Xóa
                        </button>
                      </td>
                    )}
                  </tr>
                  {/* receiptDetail */}
                  {selectedOrderId === item.orderId && (
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

                        <table className="w-full border-collapse border mt-2">
                          <thead className=" bg-gray-200">
                            <tr className="border-b text-center">
                              <th className="border px-2 py-2 w-1/4 font-medium">
                                Sản phẩm
                              </th>
                              <th className="border px-2 py-2 w-1/4 font-medium">
                                Đơn vị
                              </th>
                              <th className="border px-2 py-2 w-1/4 font-medium">
                                Số lượng
                              </th>
                              <th className="border px-2 py-2 w-1/4 font-medium">
                                Đơn giá
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {item.receiptDetails.map((item, idx) => (
                              <tr key={idx} className="border-b text-center">
                                <td className="border px-2 py-2 w-1/4">
                                  {item.productName}
                                </td>
                                <td className="border px-2 py-2 w-1/4 ">
                                  {item.productVariants.value}
                                  {item.productVariants.unitName}
                                </td>
                                <td className="border px-2 py-2 w-1/4">
                                  x{item.totalQuantity}
                                </td>
                                <td className="border px-2 py-2 w-1/4 ">
                                ₫{(new Intl.NumberFormat("vi-VN").format(item.productVariants.price))}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                          <p className="mt-5">
                            Phương thức: {item.paymentMethod}
                          </p>
                          <p className="font-light">
                            *Phí ship toàn quốc ₫30.000 
                          </p>

                          <p className="mt-2 font-extralight text-right">
                            Tổng tiền hàng:  ₫{(new Intl.NumberFormat("vi-VN").format(totalPrice[item.orderId] - 30000))} 
                          </p>
                          <p className=" font-extralight text-right">
                            Phí vận chuyển: ₫30.000 
                          </p>
                          <p className=" font-medium text-right">
                            Tổng cộng: ₫{(new Intl.NumberFormat("vi-VN").format(totalPrice[item.orderId]))} 
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
