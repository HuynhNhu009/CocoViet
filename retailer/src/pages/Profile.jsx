import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const retailer = useSelector((state) => state.RetailerStore.retailer);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="max-w-2xl mx-auto my-5 p-5 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-5 mb-5">
        <img
          src={!retailer.avatar ? "https://api.dicebear.com/9.x/thumbs/svg" : retailer.avatar}
          alt="Avatar"
          className="w-36 h-36 rounded-full object-cover"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{retailer.retailerName}</h1>
          <p className="text-gray-600">{retailer.retailerEmail}</p>
        </div>
      </div>

      <div className="mb-5">
        <div className="mt-3 space-y-1">
          <p className="text-gray-600">
            <span className="font-medium">Địa chỉ:</span> {retailer.retailerAddress}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Số điện thoại:</span> {retailer.phoneNumbers}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Tham gia:</span> {formatDate(retailer.createdAt)}
          </p>
        </div>
      </div>

      <div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Chỉnh sửa hồ sơ
        </button>
      </div>
    </div>
  );
};

export default Profile;