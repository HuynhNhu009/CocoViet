import React from "react";

function Order() {
  return (
    <div className="flex justify-center flex-col sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-8">
      <table className="w-full my-10 border-collapse">
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
          <tr className="text-center border-b-1 border-gray-400">
            <td className="px-4 py-2">1</td>
            <td className=" flex flex-row justify-center ">
            <div className="flex items-center h-28">
                <img
                  src="https://th.bing.com/th/id/R.21f948ddaf5ceb8af38722b6525f9576?rik=QXJDXfWA6c5bfw&riu=http%3a%2f%2fimua.com.vn%2fimages%2fAlbum%2fTrai-dua-tuoi-75.jpg&ehk=J0LhHGVtSH9w9QxAw%2fhxbidliOyBUiI6qjp8i2YcWJQ%3d&risl=&pid=ImgRaw&r=0"
                  alt="H1"
                  className="h-[100%] w-28 object-cover mr-5"
                />
                <span className="ml-2">Nước dừa tươi</span>
              </div>  
            </td>
            <td className="px-4 py-2">500</td>
            <td className="px-4 py-2">
              <div className="flex items-center justify-center">
                <input
                  type="number"
                  className="mx-2 w-12 text-center border border-gray-400 appearance-auto"
                  value={0}
                />
              </div>
            </td>
            <td className="px-4 py-2">3922</td>
            <td className="px-4 py-2">
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                X
              </button>
            </td>
          </tr>          
        </tbody>        
      </table>
      <div className="bg-[#77C27F] font-bold text-lg py-5 pr-8 text-white text-right fixed bottom-0 w-full left-0">
        Tổng Cộng : 600.000VND
      </div>
    </div>
  );
}

export default Order;
