import React, { useState } from "react";

const Retailer = ({ retailers }) => {
  const [selectedRetailer, setSelectedRetailer] = useState(null);

  const handleRowClick = (retailerId) => {
    setSelectedRetailer(retailerId === selectedRetailer ? null : retailerId);
  };

  return (
    <div className="w-full overflow-x-auto">
      {/* Mobile/Tablet View */}
      <div className="block md:hidden">
        {retailers.length > 0 ? (
          retailers.map((retailer, index) => (
            <div 
              key={retailer.retailerId} 
              className="bg-white shadow-md rounded-lg mb-4 p-4 border"
              onClick={() => handleRowClick(retailer.retailerId)}
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
                  <p className="text-xs text-gray-500">Tên cửa hàng</p>
                  <p className="font-semibold">{retailer.retailerName}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="truncate">{retailer.retailerEmail}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Số điện thoại</p>
                    <p>{retailer.phoneNumbers}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Ngày đăng ký</p>
                    <p>
                      {retailer.createdAt
                        ?.split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/") || "N/A"}
                    </p>
                  </div>
                </div>

                {selectedRetailer === retailer.retailerId && (
                  <div className="mt-4 p-3 bg-gray-100 rounded-md">
                    <p className="text-xs text-gray-500 mb-2">Địa chỉ</p>
                    <p>{retailer.retailerAddress}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 p-4">
            Không có cửa hàng nào.
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
            <th className="p-3 text-sm">Tên cửa hàng</th>
            <th className="p-3 text-sm">Email</th>
            <th className="p-3 text-sm">Địa chỉ</th>
            <th className="p-3 text-sm">Số điện thoại</th>
            <th className="p-3 text-sm">Ngày đăng ký</th>
            <th className="p-3 text-sm">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {retailers.length > 0 ? (
            retailers?.map((retailer, index) => (
              <React.Fragment key={retailer.retailerId}>
                <tr
                  className={`cursor-pointer hover:bg-gray-100 mb-4 ${
                    selectedRetailer === retailer.retailerId ? "bg-gray-100" : ""
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
                {selectedRetailer === retailer.retailerId && (
                  <tr className="bg-gray-100">
                    <td colSpan={7} className="p-4">
                      <div className="bg-white p-4 rounded-md shadow-inner">
                        <h4 className="font-bold mb-2 text-center">Chi tiết cửa hàng</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-semibold">Tên cửa hàng: </span>
                            {retailer.retailerName}
                          </div>
                          <div>
                            <span className="font-semibold">Email: </span>
                            {retailer.retailerEmail}
                          </div>
                          <div>
                            <span className="font-semibold">Số điện thoại: </span>
                            {retailer.phoneNumbers}
                          </div>
                          <div>
                            <span className="font-semibold">Ngày đăng ký: </span>
                            {retailer.createdAt
                              ?.split("T")[0]
                              .split("-")
                              .reverse()
                              .join("/") || "N/A"}
                          </div>
                          <div className="col-span-2">
                            <span className="font-semibold">Địa chỉ: </span>
                            {retailer.retailerAddress}
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
                Không có cửa hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Retailer;