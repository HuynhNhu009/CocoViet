import { useEffect, useState } from "react";
import { orderAPI } from "../../services/orderService";
import { useDispatch, useSelector } from "react-redux";
import { setCreateOrder } from "../../redux/orderSlice";
import Swal from "sweetalert2";

function OrderBill(orderStore) {
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState({});
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);

  const CustomerStore = useSelector((state) => state.CustomerStore.customer);


  const dispatch = useDispatch();
  const orderRequest = {
    receiptDetailRequests: [
      {
        productVariantId: "",
        quantity: "",
      },
    ],
  };
  useEffect(() => {
    if (orderStore) {
      setOrder(orderStore.orderStore);
      const initialQuantities = {};
      let price = 0;
      orderStore?.orderStore?.receiptDetails?.forEach((item) => {
        price += item.productVariants.price * item.totalQuantity;
        initialQuantities[item.productVariants.variantId] = item.totalQuantity;
      });
      setTotalPrice(price);
      setQuantity(initialQuantities);
      setLoading(false);
    }
  }, [orderStore]);


  if (loading) {
    return <p className="text-center text-gray-500">Đang tải đơn hàng...</p>;
  }

  

  //delete product
  const handleDeleteProduct = async (receiptDetailId) => {
    Swal.fire({
      title: "Xóa sản phẩm",
      text: "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, tôi muốn xóa!",
      cancelButtonText: "Hủy xóa!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await orderAPI.deleteProductInOrder(order.orderId, receiptDetailId);
        await dispatch(setCreateOrder(true));
        Swal.fire({
          title: "Đã xóa!",
          showConfirmButton: false,
          icon: "success",
          timer: 1000,
        });
      }
    });
  };
  console.log(order);
  

  return (
    <>
      <div className="mt-5 flex justify-center align-middle self-center flex-col">
        {order?.map((order, index) => (
          <div
            key={order.orderId}
            className=" mb-3 px-8 py-5 border-2 border-green-600 rounded-md bg-white w-[600px]"
          >
            <div
              onClick={() =>
                setSelectedOrderIndex(
                  selectedOrderIndex === index ? null : index
                )
              }
              className=" mb-5 hover:text-green-500 text-center cursor-pointer font-bold text-lg text-green-600"
            >
              HÓA ĐƠN #{index + 1}
            </div>
            {selectedOrderIndex === index && (
              <>
                <div className="infor-customer flex justify-between">
                  <div className="">
                    <p className="mb-2">
                      Khách hàng: {CustomerStore.customerName}
                    </p>

                    <div className="mb-2 w-full">
                      <span className="">Địa chỉ: </span>
                      <input
                        type="text"
                        className=" px-1 rounded-sm"
                        value={CustomerStore.customerAddress}
                      />
                    </div>

                    <div>
                      <span>Số điện thoại: </span>
                      <input
                        type="text"
                        className="px-1 rounded-sm"
                        value={CustomerStore.phoneNumbers}
                      />
                    </div>
                  </div>

                  <div>
                    <p>Mã đơn: #{order.orderId.split("-")[0].toUpperCase()}</p>
                    <p>
                      Ngày:{" "}
                      {order.orderDate
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                    </p>
                  </div>
                </div>

                {/* {order?.receiptDetails?.map((item, index) => (
                <div key={index}>
                  <div className="product bg-gray-300 px-3 py-1 font-bold mt-4">
                    {item.retailerName}
                  </div>
                  <table className="w-full border-collapse border mt-2">
                    <tbody>
                      <tr className="border-b">
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
                    </tbody>
                  </table>
                </div>
              ))} */}
                {Object.entries(
                  order?.receiptDetails?.reduce((acc, item) => {
                    if (!acc[item.retailerName]) acc[item.retailerName] = [];
                    acc[item.retailerName].push(item);
                    return acc;
                  }, {})
                ).map(([retailerName, items], index) => (
                  <div key={index}>
                    <div className="product bg-gray-300 px-3 py-1 font-bold mt-4">
                      {retailerName}
                    </div>
                    <table className="w-full border-collapse border mt-2">
                      <tbody>
                        {items.map((item, idx) => (
                          <tr key={idx} className="border-b">
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
                  <select
                    name="payment"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value={order.paymentMethod}>
                      {" "}
                      {order.paymentMethod}{" "}
                    </option>
                    <option>Cash </option>
                  </select>
                </div>

                <div className="text-right font-bold text-lg mt-4">
                  Tổng tiền: <span className="text-red-600">1.600.000 VND</span>
                </div>
                <button className="border-2 border-green-600 text-green-600 px-4 py-2 rounded mt-4 w-full hover:bg-green-100 active:scale-95 transition">
                  Hủy đơn
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full hover:bg-green-700 active:scale-80 transition">
                  Xác nhận
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default OrderBill;
