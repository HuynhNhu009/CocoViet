import {useEffect, useState } from "react";

function OrderItem(orderStore) {

  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    if(orderStore){
      setOrder(orderStore.orderStore)  
      console.log(orderStore);
         

      let price = 0;
      orderStore?.orderStore?.receiptDetails?.forEach((item) => {
        price += item.productVariants.price * item.totalQuantity;
      });
      setTotalPrice(price);
      setLoading(false);
    }
  }, [orderStore]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Đang tải đơn hàng...</p>
    );
  }

  const handleChangeQuantity = (e, productId) => {
    let value = e.target.value.trim(); 
  
    if (value === "") {
      setQuantity(0); 
      return;
    }
    console.log(value, productId);
    
    let num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1) {
      setQuantity(num);
    }
  }
  
  
  return (
      <>
        <table className="w-full mt-10 border-collapse" key={order.orderId}>
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
                className="text-center border-b-1 border-gray-400 "
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="flex flex-row justify-center ">
                  <div className="flex items-center justify-between justify-center h-28">
                    <img
                      src="https://th.bing.com/th/id/R.21f948ddaf5ceb8af38722b6525f9576?rik=QXJDXfWA6c5bfw&riu=http%3a%2f%2fimua.com.vn%2fimages%2fAlbum%2fTrai-dua-tuoi-75.jpg&ehk=J0LhHGVtSH9w9QxAw%2fhxbidliOyBUiI6qjp8i2YcWJQ%3d&risl=&pid=ImgRaw&r=0"
                      alt="H1"
                      className="h-28 w-28 object-cover mr-2"
                    />
                    <span className="ml-2 w-38">{item.productName}</span>
                  </div>
                </td>
                <td className="px-4 py-2">{item.productVariants.price}</td>
                <td className="px-4 py-2">
                <input type="number" 
                    onChange={(e) => handleChangeQuantity(e,item.receiptDetailId )}
                  onBlur={() => quantity === "" && setQuantity(item.totalQuantity)}
                  value={quantity[item.totalQuantity]}
                  className="text-center border-1 rounded-sm w-15" id="quantity" />

                </td>
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
              <td colSpan="6" className="text-center  text-gray-500">
                Không có đơn hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className=" font-bold text-lg py-5 pr-8 text-right ">
        <p className="mb-2 text-green-600">Tổng Cộng : {totalPrice} VND</p>
        <button className="bg-green-600 cursor-pointer text-white py-1 px-3 rounded-tl-2xl rounded-br-2xl shadow-md transition-transform hover:scale-105 duration-400 ease-in-out">
          Thanh Toán
        </button>
      </div> 
      </>
      

  );
}

export default OrderItem;
