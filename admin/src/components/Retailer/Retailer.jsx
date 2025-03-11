import React, { useEffect, useState } from "react";
import { orderAPI } from "../../services/orderService";

const Retailer = ({ retailers }) => {
  const [selectedretailer, setSelectedretailer] = useState(null);

  console.log(retailers);
  const [revenueList, setRevenueList] = useState([]);

  useEffect(() => {
    const fetchAllRevenue = async () => {
      if (!retailers || retailers.length === 0) return;

      try {
        const revenuePromises = retailers.map(retailer =>
          orderAPI.getRevenue(retailer.retailerId, "DELIVERED").then(response => ({
            retailerId: retailer.retailerId, 
            countOrder: response.data.countOrder,
            totalRevenue: response.data.totalRevenue,
            bestSellingProduct: response.data.bestSellingProduct,
          }))
        );
        const revenues = await Promise.all(revenuePromises);
        
        setRevenueList(revenues);
      } catch (error) {
        console.error("Error fetching revenue:", error);
      }
    };

    fetchAllRevenue();
  }, [retailers]);

  console.log(revenueList);
  

  
  
  const handleRowClick = async(retailerId) => {
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
                {selectedretailer === retailer.retailerId && (
                  <tr className="bg-gray-100  mb-4">
                  <td colSpan={7} className="py-3 text-gray-700 px-18">
                   <table className="border-1 border-gray-400 w-full text-center">
                        <thead className="text-center  ">
                          <tr>
                            <th className="border-1">Tổng sản phẩm</th>
                            <th className="border-1">Sản phẩm bán chạy nhất</th>
                            <th className="border-1">Tổng đơn hàng</th>
                            <th className="border-1">Tổng lợi nhuận</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                        {revenueList ? (  revenueList
                        .filter((revenue) => revenue.retailerId === selectedretailer) 
                        .map((revenue) => (
                          <tr key={revenue.retailerId}>
                            <td className="border-1">{}</td>
                            {/* <td className="border-1">{revenue.bestSellingProduct[0].productVariant.unitName}</td> */}
                            <td className="border-1">{revenue.countOrder}</td>
                            <td className="border-1">{revenue.totalRevenue}</td>
                          </tr>
                        ))) : (
                          <tr>
                            <td>khong</td>
                          </tr>
                        )}
                        </tbody>
                      </table>
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
    </>
  );
};

export default Retailer;
