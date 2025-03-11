import React, { useState } from "react";

const Customer = ({ customers }) => {
  const [selectedcustomer, setSelectedcustomer] = useState(null);

  const handleRowClick = (customerId) => {
    setSelectedcustomer(customerId === selectedcustomer ? null : customerId);
  };

  return (
    <>
      <table className="w-full border-collapse ">
        <thead>
          <tr className="text-center bg-black text-white uppercase">
            <th className="p-3 text-sm">STT</th>
            <th className="p-3 text-sm">Tên khách hàng</th>
            <th className="p-3 text-sm">Email</th>
            <th className="p-3 text-sm">Địa chỉ</th>
            <th className="p-3 text-sm">Số điện thoại</th>
            <th className="p-3 text-sm">Ngày đăng ký </th>
            <th className="p-3 text-sm">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers?.map((customer, index) => (
              <React.Fragment key={customer.customerId}>
                <tr
                  className={`cursor-pointer hover:bg-gray-100 mb-4 ${
                    selectedcustomer === customer.customerId
                      ? "bg-gray-100"
                      : ""
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
    </>
  );
};

export default Customer;
