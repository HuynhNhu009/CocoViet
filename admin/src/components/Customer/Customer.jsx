import React, { useState } from "react";

const Customer = ({ customers }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleRowClick = (customerId) => {
    setSelectedCustomer(customerId === selectedCustomer ? null : customerId);
  };

  return (
    <div className="w-full overflow-x-auto">
      {/* Mobile/Tablet View */}
      <div className="block md:hidden">
        {customers.length > 0 ? (
          customers.map((customer, index) => (
            <div 
              key={customer.customerId} 
              className="bg-white shadow-md rounded-lg mb-4 p-4 border"
              onClick={() => handleRowClick(customer.customerId)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm">#{index + 1}</span>
                <button 
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-xs"
                >
                  Xóa
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Tên khách hàng</p>
                  <p className="font-semibold">{customer.customerName}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="truncate">{customer.customerEmail}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Số điện thoại</p>
                    <p>{customer.phoneNumbers}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Ngày đăng ký</p>
                    <p>
                      {customer.createdAt
                        ?.split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/") || "N/A"}
                    </p>
                  </div>
                </div>

                {selectedCustomer === customer.customerId && (
                  <div className="mt-4 p-3 bg-gray-100 rounded-md">
                    <p className="text-xs text-gray-500 mb-2">Địa chỉ</p>
                    <p>{customer.customerAddress}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 p-4">
            Không có khách hàng nào.
          </div>
        )}
      </div>

      {/* Desktop View */}
      <table 
        className="w-full border-collapse hidden md:table"
      >
        <thead>
          <tr className="text-center bg-black text-white uppercase">
            <th className="p-3 text-sm">STT</th>
            <th className="p-3 text-sm">Tên khách hàng</th>
            <th className="p-3 text-sm">Email</th>
            <th className="p-3 text-sm">Địa chỉ</th>
            <th className="p-3 text-sm">Số điện thoại</th>
            <th className="p-3 text-sm">Ngày đăng ký</th>
            <th className="p-3 text-sm">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers?.length > 0 ? (
            customers?.map((customer, index) => (
              <React.Fragment key={customer.customerId}>
                <tr
                  className={`cursor-pointer hover:bg-gray-100 mb-4 ${
                    selectedCustomer === customer.customerId ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleRowClick(customer.customerId)}
                >
                  <td className="p-1 text-center">{index + 1}</td>
                  <td className="p-1 text-center">{customer.customerName}</td>
                  <td className="p-1 text-center">{customer.customerEmail}</td>
                  <td className="p-1 text-center">
                    {customer.customerAddress}
                  </td>
                  <td className="p-1 text-center">{customer.phoneNumbers}</td>
                  <td className="p-1 text-center">
                    {customer.createdAt
                      ?.split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/") || "N/A"}
                  </td>
                  <td className="p-3 text-center">
                    <button className="bg-red-500 text-white px-3 py-1 ml-2 rounded-md">
                      Xóa
                    </button>
                  </td>
                </tr>
                {selectedCustomer === customer.customerId && (
                  <tr className="bg-gray-100">
                    <td colSpan={7} className="p-4">
                      <div className="bg-white p-4 rounded-md shadow-inner">
                        <h4 className="font-bold mb-2 text-center">Chi tiết khách hàng</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-semibold">Tên khách hàng: </span>
                            {customer.customerName}
                          </div>
                          <div>
                            <span className="font-semibold">Email: </span>
                            {customer.customerEmail}
                          </div>
                          <div>
                            <span className="font-semibold">Số điện thoại: </span>
                            {customer.phoneNumbers}
                          </div>
                          <div>
                            <span className="font-semibold">Ngày đăng ký: </span>
                            {customer.createdAt
                              ?.split("T")[0]
                              .split("-")
                              .reverse()
                              .join("/") || "N/A"}
                          </div>
                          <div className="col-span-2">
                            <span className="font-semibold">Địa chỉ: </span>
                            {customer.customerAddress}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="p-3 text-center text-gray-500">
                Không có khách hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;