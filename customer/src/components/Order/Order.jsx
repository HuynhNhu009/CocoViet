import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { useSelector } from "react-redux";
import { orderAPI } from "../../services/orderService";
function Order() {
  const customer = useSelector((state) => state.CustomerStore.customer);
  const [order, setOrder] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const status = ["Giỏ Hàng", "Đang xử lý", "Đang Giao", "Đã giao", "Đã Hủy"]

  // useEffect(() => {
  //   if (customer) {
  //     orderAPI.getOrderByCustomerId(customer.customerId)
  //       .then((response) => {
  //         console.log( response);
  //         setOrder(response.data)
          
  //         let price = 0;

  //         response.data.receiptDetails.map((item, index) => (
  //           price += (item.productVariants.price * item.totalQuantity)
  //         ))
  
  //         setTotalPrice(price);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching orders:", error);
  //       });
  //   }
  // }, []);

  return (
    <div className="flex justify-center flex-col sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-8">
      <div className="flex flex-row justify-center ">
        {status && Array.isArray(status) ? (
          status.map((item, index) => (
            <div key={index} className="relative bg-green-200 py-3 px-6 w-35 mx-2 before:absolute before:-left-0 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0 before:border-y-20 before:border-l-20 before:border-y-transparent before:border-l-green-600">
  {item}
</div>



          ))
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </div>
      
      {/* <table className="w-full mt-10 border-collapse" key={order.orderId}>
        <thead className="bg-[#77C27F]">
          <tr className="  text-white">
            <th className=" px-4 py-2 w-1/12">STT</th>
            <th className=" px-4 py-2 w-3/12">Sản Phẩm </th>
            <th className="px-4 py-2 w-2/12">Đơn Giá</th>
            <th className=" px-4 py-2 w-2/12">Số Lượng</th>
            <th className="px-4 py-2 w-2/12">Tổng Giá</th>
            <th className="px-4 py-2 w-2/12">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {order?.receiptDetails?.length > 0 ? (
            order.receiptDetails.map((item, index) => (
              <tr
                key={index}
                className="text-center border-b-1 border-gray-400"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="flex flex-row justify-center ">
                  <div className="flex items-center h-28">
                    <img
                      src="https://th.bing.com/th/id/R.21f948ddaf5ceb8af38722b6525f9576?rik=QXJDXfWA6c5bfw&riu=http%3a%2f%2fimua.com.vn%2fimages%2fAlbum%2fTrai-dua-tuoi-75.jpg&ehk=J0LhHGVtSH9w9QxAw%2fhxbidliOyBUiI6qjp8i2YcWJQ%3d&risl=&pid=ImgRaw&r=0"
                      alt="H1"
                      className="h-[100%] w-28 object-cover mr-5"
                    />
                    <span className="ml-2">{item.productName}</span>
                  </div>
                </td>
                <td className="px-4 py-2">{item.productVariants.price}</td>
                <td className="px-4 py-2">{item.totalQuantity}</td>
                <td className="px-4 py-2">{item.productVariants.price *  item.totalQuantity}</td>
                <td className="px-4 py-2">
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    X
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                Không có đơn hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* fixed bottom-0 w-full left-0 bg-[#77C27F] */}
      {/* <div className=" font-bold text-lg py-5 pr-8 text-right ">
        <p className="mb-2 text-green-600">Tổng Cộng : {totalPrice} VND</p>
        <button className="bg-white hover:scale-105 cursor-pointer text-green-600 py-1 px-3 rounded-tl-2xl rounded-br-2xl shadow-md transition-transform duration-400 ease-in-out">
          Thanh Toán
        </button>
      </div>  */}
    </div>
  );
}

export default Order;
