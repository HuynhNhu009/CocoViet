import React, { useState } from "react";

const Retailer = ({ retailers }) => {
  const [selectedretailer, setSelectedretailer] = useState(null);

  const handleRowClick = (retailerId) => {
    setSelectedretailer(retailerId === selectedretailer ? null : retailerId);
  };

  return (
    <>
      <table className="w-full border-collapse ">
        <thead>
          <tr className="text-center bg-black text-white uppercase">
            <th className="p-3 text-sm">STT</th>
            <th className="p-3 text-sm">Tên cửa hàng</th>
            <th className="p-3 text-sm">Email</th>
            <th className="p-3 text-sm">Địa chỉ</th>
            <th className="p-3 text-sm">Số điện thoại</th>
            <th className="p-3 text-sm">Ngày đăng ký </th>
            <th className="p-3 text-sm">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {retailers.length > 0 ? (
            retailers?.map((retailer, index) => (
              <React.Fragment key={retailer.retailerId}>
                <tr
                  className={`cursor-pointer hover:bg-gray-100 mb-4 ${
                    selectedretailer === retailer.retailerId
                      ? "bg-gray-100"
                      : ""
                  }`}
                  onClick={() => handleRowClick(retailer.retailerId)}
                >
                  <td className="p-1 text-center">{index + 1}</td>
                  <td className="p-1 text-center">{retailer.retailerName}</td>
                  <td className="p-1 text-center">{retailer.retailerEmail}</td>
                  <td className="p-1 text-center">
                    {retailer.retailerAddress}
                  </td>
                  <td className="p-1 text-center">{retailer.phoneNumbers}</td>
                  <td className="p-1 text-center">
                  {retailer.createdAt
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

export default Retailer;
