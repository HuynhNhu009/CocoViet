import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  // Dữ liệu mẫu của khách hàng
  const customer = useSelector((state) => state.CustomerStore.customer);
  console.log(customer);
  

  

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <div className="flex flex-col items-center">
        <img
          src={"https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-2 border-green-500"
        />
        <h2 className="mt-3 text-xl font-bold">{customer.customerName}</h2>
        <p className="text-gray-600">{customer.customerEmail}</p>
      </div>
      <div className="mt-4 space-y-2">
        <p>
          <strong>📞 Số điện thoại:</strong> {customer.phoneNumbers}
        </p>
        <p>
          <strong>📍 Địa chỉ:</strong> {customer.customerAddress}
        </p>
        <p>
          <strong>🆔 ID:</strong> {customer.customerId}
        </p>
        <p>
          <strong>🕒 Ngày tạo:</strong> {(customer.createdAt)}
        </p>
      </div>

      <div className="text-center mt-5">
      <button className="text-center bg-blue-600 hover:bg-blue-700 cursor-pointer text-white p-2 rounded-sm text-sm">
        Cập nhật thông tin
      </button>
      </div>
    </div>
  );
};

export default Profile;
