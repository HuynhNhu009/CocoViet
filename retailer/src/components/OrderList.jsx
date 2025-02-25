import React from "react";

const OrderList = ({ orders }) => {
  if (!orders.length) {
    return (
      <div className="text-center py-4 text-gray-600">
        Chưa có đơn hàng nào.
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Danh sách đơn hàng
      </h3>
      {/* Bảng cho desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                Mã đơn
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                Ngày đặt
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                Tổng tiền
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                Trạng thái
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order._id}</td>
                <td className="p-3">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="p-3">{order.total} VND</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">
                  <button
                    onClick={() => alert(`Xem chi tiết đơn hàng: ${order._id}`)}
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Grid cho mobile */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="font-medium text-gray-700">Mã đơn:</span>
              <span>{order._id}</span>
              <span className="font-medium text-gray-700">Ngày đặt:</span>
              <span>{new Date(order.date).toLocaleDateString()}</span>
              <span className="font-medium text-gray-700">Tổng tiền:</span>
              <span>{order.total} VND</span>
              <span className="font-medium text-gray-700">Trạng thái:</span>
              <span>{order.status}</span>
            </div>
            <button
              onClick={() => alert(`Xem chi tiết đơn hàng: ${order._id}`)}
              className="mt-2 text-green-600 hover:text-green-800 font-medium"
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
