import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setCreateOrder } from "../../redux/orderSlice";
import { orderAPI } from "../../services/orderService";
import { toast } from "react-toastify";

function OrderItem(orderStore) {
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState({});

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
    if (orderStore) {
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
      setLoading(false);
    }
  }, [orderStore]);

  if (loading) {
    return <p className="text-center text-gray-500">Đang tải đơn hàng...</p>;
  }

  const handleChangeQuantity = async (e, productVariantId) => {
    let value = e.target.value.trim();

    if (value === "") {
      setQuantity((prev) => ({ ...prev, [productVariantId]: 1 }));
      return;
    }

    let num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1) {
      setQuantity((prev) => ({ ...prev, [productVariantId]: num }));
      orderRequest.receiptDetailRequests = [
        {
          productVariantId: productVariantId,
          quantity: num,
        },
      ];
      await orderAPI.updateOrder(order.orderId, orderRequest);
      await dispatch(setCreateOrder(true));
    }
  };

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

  //buyProduct
  const handleNextProcess = async () => {
    if (!order || !order.orderId || !order.receiptDetails?.length) {
      Swal.fire("Vui lòng thêm sản phẩm vào giỏ hàng!");
      return;
    }

    try {
      const deleteReceipt = order.receiptDetails.filter(
        (item) =>
          item.productStatus === "PAUSE" || item.productVariants.stock === 0
      );

      console.log("dele", deleteReceipt);

      if (deleteReceipt.length > 0) {
        Swal.fire({
          title: "Chưa thể đặt hàng!",
          text: "Vui lòng xóa các sản phẩm đã hết hàng trước khi đặt hàng!",
          icon: "error",
          showConfirmButton: false,
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
        };

        await orderAPI.updateOrder(order.orderId, orderRequest);
        await dispatch(setCreateOrder(true));

        toast.success("Đặt hàng thành công!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          closeButton: false,
          theme: "light",
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
                      item.productStatus == "PAUSE" ||
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
                          <span className="">
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

                    <td className={`px-4 py-2`}>
                      {item.productStatus !== "PAUSE" &&
                      item.productVariants.stock != 0 ? (
                        <input
                          type="number"
                          onChange={(e) =>
                            handleChangeQuantity(
                              e,
                              item.productVariants.variantId
                            )
                          }
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
                          Sản phẩm đã hết hàng !
                        </p>
                      )}
                    </td>

                    {item.productStatus !== "PAUSE" &&
                    item.productVariants.stock != 0 ? (
                      <td className="px-4 py-2">
                        ₫
                        {new Intl.NumberFormat("vi-VN").format(
                          item.productVariants.price * item.totalQuantity
                        )}
                      </td>
                    ) : (
                      <p></p>
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
          <div className=" bg-[#77C27F] text-white rounded-tl-lg rounded-tr-lg pb-3 flex justify-between font-bold text-lg pt-2 pr-8 text-right ">
            <div className="px-5 font-medium text-sm">
              {order?.receiptDetails?.length} sản phẩm
            </div>
            <div>
              <p className="mb-2">
                Tổng tiền hàng : ₫
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
        )}
      </div>
    </>
  );
}

export default OrderItem;
