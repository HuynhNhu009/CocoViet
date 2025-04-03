import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setCreateOrder } from "../../redux/orderSlice";
import { orderAPI } from "../../services/orderService";
import { toast } from "react-toastify";

function OrderItem(orderStore) {
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState({});
  const [selectedPayment, setSelectedPayment] = useState("");

  const dispatch = useDispatch();
  const paymentStore = useSelector((state) => state.OrderStore.payment || []);

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
    if (orderStore?.orderStore) {
      setOrder(orderStore.orderStore);

      const initialQuantities = {};
      let price = 0;
      orderStore?.orderStore?.receiptDetails
        ?.filter((item) => item.productStatus === "ENABLE")
        .forEach((item) => {
          price += item.productVariants.price * item.totalQuantity;
          initialQuantities[item.productVariants.variantId] =
            item.totalQuantity;
        });
      setTotalPrice(price);
      setQuantity(initialQuantities);
      setSelectedPayment(orderStore.orderStore.paymentMethod || "");
      setLoading(false);
    }
  }, [orderStore]);

  const handlePaymentChange = async (e) => {
    const paymentMethod = e.target.value;
    const paymentCode = e.target.selectedOptions[0].dataset.key;

    setSelectedPayment(paymentMethod);
    const paymentRequest = { paymentCode };

    try {
      await orderAPI.updateOrder(order.orderId, paymentRequest);
      await dispatch(setCreateOrder(true));
      toast.success("Cập nhật phương thức thanh toán thành công!", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error("Lỗi khi cập nhật phương thức thanh toán!");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Đang tải đơn hàng...</p>;
  }

  const handleChangeQuantity = async (e, item) => {
    let value = e.target.value.trim();

    if (value === "") {
      setQuantity((prev) => ({ ...prev, [item.productVariants.variantId]: 1 }));
      return;
    }

    let num = parseInt(value, 10);
    if (num > item.productVariants.stock) {
      toast.error("Số lượng sản phẩm đã đạt giới hạn!", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (!isNaN(num) && num >= 1) {
      setQuantity((prev) => ({
        ...prev,
        [item.productVariants.variantId]: num,
      }));
      orderRequest.receiptDetailRequests = [
        {
          productVariantId: item.productVariants.variantId,
          quantity: num,
        },
      ];
      await orderAPI.updateOrder(order.orderId, orderRequest);
      await dispatch(setCreateOrder(true));
    }
  };

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

  const handleNextProcess = async () => {
    if (!order || !order.orderId || !order.receiptDetails?.length) {
      Swal.fire("Vui lòng thêm sản phẩm vào giỏ hàng!");
      return;
    }

    if (!selectedPayment) {
      Swal.fire("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    try {
      const deleteReceipt = order.receiptDetails.filter(
        (item) =>
          item.productStatus === "PAUSE" || item.productVariants.stock === 0
      );

      if (deleteReceipt.length > 0) {
        Swal.fire({
          title: "Chưa thể đặt hàng!",
          text: "Vui lòng xóa các sản phẩm đã hết hàng trước khi đặt hàng!",
          icon: "error",
          timer: 1500,
        });
      } else {
        const receiptDetailRequests = order.receiptDetails
          .filter((item) => item.productStatus === "ENABLE")
          .map((item) => ({
            productVariantId: item.productVariants.variantId,
            statusCode: "PROCESSING",
          }));

        const orderRequest = {
          receiptDetailRequests: receiptDetailRequests,
          paymentCode: paymentStore.find(
            (method) => method.paymentMethod === selectedPayment
          )?.paymentCode,
        };

        await orderAPI.updateOrder(order.orderId, orderRequest);
        await dispatch(setCreateOrder(true));

        toast.success("Đặt hàng thành công!", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Lỗi cập nhật đơn hàng:", error);
      Swal.fire(
        "Đã có lỗi xảy ra khi đặt hàng!",
        "Vui lòng thử lại sau",
        "error"
      );
    }
  };

  return (
    <>
      <div>
        <div className="mt-2 h-[390px] overflow-y-scroll">
          <table className="w-full border-collapse table-fixed">
            <thead className="bg-[#77C27F] text-white ">
              <tr>
                <th className="px-4 py-2 w-1/12">STT</th>
                <th className="px-4 py-2 w-3/12">Sản Phẩm</th>
                <th className="px-4 py-2 w-2/12">Đơn Giá</th>
                <th className="px-4 py-2 w-2/12">Số Lượng</th>
                <th className="px-4 py-2 w-2/12">Tổng Giá</th>
                <th className="px-4 py-2 w-2/12">Xóa</th>
              </tr>
            </thead>
            <tbody>
              {order?.receiptDetails?.length > 0 ? (
                order.receiptDetails.map((item, index) => (
                  <tr
                    key={index}
                    className={`text-center border-b-1 border-gray-400 ${
                      item.productStatus === "PAUSE" ||
                      item.productVariants.stock === 0
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="flex flex-row justify-center">
                      <div className="flex items-center justify-between h-28">
                        <img
                          src={item.productImage}
                          className="h-28 w-28 object-cover mr-2"
                        />
                        <span className="ml-2 w-38">
                          <span>
                            {item.productName} - ({item.productVariants.value}
                            {item.productVariants.unitName})
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      ₫
                      {new Intl.NumberFormat("vi-VN").format(
                        item.productVariants.price
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {item.productStatus !== "PAUSE" &&
                      item.productVariants.stock !== 0 ? (
                        <input
                          type="number"
                          onChange={(e) => handleChangeQuantity(e, item)}
                          onBlur={() => {
                            if (!quantity[item.productVariants.variantId]) {
                              setQuantity((prev) => ({
                                ...prev,
                                [item.productVariants.variantId]: 1,
                              }));
                            }
                          }}
                          value={quantity[item.productVariants.variantId] || ""}
                          className="text-center border-1 rounded-sm w-15"
                        />
                      ) : (
                        <p className="text-red-500 m-0 text-sm">
                          Sản phẩm đã hết hàng!
                        </p>
                      )}
                    </td>
                    {item.productStatus !== "PAUSE" &&
                    item.productVariants.stock !== 0 ? (
                      <td className="px-4 py-2">
                        ₫
                        {new Intl.NumberFormat("vi-VN").format(
                          item.productVariants.price * item.totalQuantity
                        )}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    <td className="px-4 py-2">
                      <button
                        onClick={() =>
                          handleDeleteProduct(item.receiptDetailId)
                        }
                        className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1 rounded"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500">
                    Không có đơn hàng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {order?.receiptDetails?.length > 0 && (
          <div className=" ">
            <div className="bg-[#77C27F] px-5 rounded-tl-lg rounded-tr-lg text-white pb-3 flex justify-between font-bold text-lg pt-2 ">
              <div className=" font-medium text-sm">
                <div>{order?.receiptDetails?.length} sản phẩm</div>
                <div className="">
                  <select
                    name="payment"
                    className="px-3 py-2 mt-2 border outline-green-600 bg-white text-green-600 rounded-md"
                    value={selectedPayment}
                    onChange={handlePaymentChange}
                  >
                    <option value="">Chọn phương thức thanh toán</option>
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
                </div>
              </div>
              <div className="text-right">
                <p className="mb-2">
                  Tổng tiền hàng: ₫
                  {new Intl.NumberFormat("vi-VN").format(totalPrice)}
                </p>
                <button
                  onClick={() => handleNextProcess()}
                  className="bg-green-600 cursor-pointer text-white py-1 px-3 rounded-tl-2xl rounded-br-2xl shadow-md transition-transform hover:scale-105 duration-400 ease-in-out"
                >
                  Đặt Hàng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderItem;
