import { useEffect, useState } from "react";
import { orderAPI } from "../../services/orderService";
import { useDispatch, useSelector } from "react-redux";
import { setCreateOrder } from "../../redux/orderSlice";
import Swal from "sweetalert2";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

function OrderBill(orderStore) {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);

  const CustomerStore = useSelector((state) => state.CustomerStore.customer);
  const dispatch = useDispatch();

  console.log(CustomerStore);
  
  const [customerInfo, setCustomerInfo] = useState({
    customerName: "",
    customerAddress: "",
    phoneNumbers: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log("22",CustomerStore);
    setCustomerInfo({
      customerName: CustomerStore.customerName ,
      customerAddress: CustomerStore.customerAddress,
      phoneNumbers: CustomerStore.phoneNumbers ,
    });
    
  }, [CustomerStore]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);
    
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

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
        prices[order.orderId] = orderTotal + 30;
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
              ĐƠN HÀNG #{order.orderId.split("-")[0].toUpperCase()}
            </div>
            {selectedOrderIndex === index && (
              <>
                <div className="infor-customer flex justify-between">
                  <div>
                    {/* <div className="mb-2 w-full">
                      <span className="font-medium"> Khách hàng: </span>
                      <input
                        type="text"
                        name="name"
                        className={`w-full px-2 py-1 transition-all outline-none border-b ${
              isEditing ? "border-gray-500" : "border-transparent"
            }`}
                        value={customerInfo.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-2 w-full">
                      <span className="font-medium"> Địa chỉ:</span>
                      <input
                        type="text"
                        name="address"
                        className="px-2 py-1 outline-0  "
                        value={customerInfo.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-2 w-full">
                      <span className=" font-medium">Số điện thoại:</span>
                      <input
                        type="text"
                        name="phone"
                        className="px-2  outline-0 w-25"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                      />
                    </div> */}

                    {/*  */}
                    
                    <div className="mb-2 flex justify-between items-center">
                      <span className="font-medium">Khách hàng:</span>
                      <div className="relative flex-1">
                        <input
                          type="text"
                          name="customerName"
                          className={`w-full px-2 py-1 transition-all outline-none border-b ${
                            isEditing ? "border-green-600" : "border-transparent"
                          }`}
                          value={customerInfo.customerName}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="mb-2 flex justify-between items-center">
                      <span className="font-medium">Địa chỉ:</span>
                      <div className="relative flex-1">
                        <input
                          type="text"
                          name="customerAddress"
                          className={`w-full px-2 py-1 transition-all outline-none border-b ${
                            isEditing ? "border-green-600" : "border-transparent"
                          }`}
                          value={customerInfo.customerAddress}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="mb-2 flex justify-between items-center">
                      <span className="font-medium">Số điện thoại:</span>
                      <div className="relative flex-1">
                        <input
                          type="text"
                          name="phoneNumbers"
                          className={`w-full px-2 py-1 transition-all outline-none border-b ${
                            isEditing ? "border-green-600" : "border-transparent"
                          }`}
                          value={customerInfo.phoneNumbers}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                    <div className=" mt-2">
                      {!isEditing ? (
                        <p
                        onClick={() => setIsEditing(true)}
                        className=" text-white text-center px-2 py-1 bg-green-500 hover:bg-green-600 w-20 text-sm rounded-4xl rounded-tl-none cursor-pointer"
                        >Cập nhật</p>
                       

                      ) : (
                        <button
                          className="px-3 py-1 bg-green-600 cursor-pointer text-white text-sm  rounded"
                          onClick={() => setIsEditing(false)}
                        >
                          Lưu
                        </button>
                      )}
                    </div>
                    

                    {/*  */}
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

                <div className="payment my-5">
                  <p>Thanh Toán</p>
                  <select name="payment" className="w-full px-3 py-2 border">
                    <option value={order.paymentMethod}>
                      {order.paymentMethod}
                    </option>
                    <option>Cash</option>
                  </select>
                </div>
                <div className="font-light">*Phí ship toàn quốc 30.000 VNĐ</div>

                <div className="text-right font-bold text-lg mt-2">
                  Tổng tiền:
                  <span className="text-red-600">
                    {" "}
                    {totalPrice[order.orderId] || 0} VNĐ
                  </span>
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
