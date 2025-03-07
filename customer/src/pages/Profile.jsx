import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerApi } from "../services/customerService";
import { useEffect } from "react";
const Profile = () => {
  const customer = useSelector((state) => state.CustomerStore.customer);
  const [isEditing, setIsEditing] = useState(false);

  const [editedCustomer, setEditedCustomer] = useState({
    userName: "",
    userAddress: "",
    phoneNumbers: "",
  });

  useEffect(() => {
    if (customer) {
      setEditedCustomer({
        userName: customer.customerName,
        userAddress: customer.customerAddress,
        phoneNumbers: customer.phoneNumbers,
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    setEditedCustomer({ ...editedCustomer, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const updatedFields = Object.keys(editedCustomer).reduce((acc, key) => {
      if (editedCustomer[key] !== customer[key]) {
        acc[key] = editedCustomer[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      setIsEditing(false);
      return;
    }

    try {
      await customerApi.updateProfile(customer.customerId, updatedFields);
      window.location.reload();
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      {customer && (
        <>
          <div className="flex flex-col items-center">
            <img
              src={
                "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
              }
              alt="Avatar"
              className="w-24 h-24 rounded-full border-2 border-green-500"
            />
            {isEditing ? (
              <input
                type="text"
                name="userName"
                value={editedCustomer?.userName}
                onChange={handleChange}
                className="mt-3 text-xl font-bold border p-1 text-center rounded"
              />
            ) : (
              <p className="mt-3 text-xl font-bold  p-1 text-center ">
                {customer.customerName}
              </p>
            )}

            <p className="text-gray-600">{customer.customerEmail}</p>
          </div>

          <div className="mt-4 space-y-2">
            {isEditing ? (
              <>
                <div>
                  <label className="font-bold">📞 Số điện thoại:</label>
                  <input
                    type="text"
                    name="phoneNumbers"
                    value={editedCustomer.phoneNumbers}
                    onChange={handleChange}
                    className="border p-1 w-full rounded"
                  />
                </div>
                <div>
                  <label className="font-bold">📍 Địa chỉ:</label>
                  <input
                    type="text"
                    name="userAddress"
                    value={editedCustomer.userAddress}
                    onChange={handleChange}
                    className="border p-1 w-full rounded"
                  />
                </div>
                <div>
                  <label className="font-bold">🆔 ID:</label>
                  <p>{customer.customerId}</p>
                </div>
                <div>
                  <label className="font-bold">🕒 Ngày tạo:</label>
                  <p>{customer.createdAt}</p>
                </div>
              </>
            ) : (
              <>
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
                  <strong>🕒 Ngày tạo:</strong> {customer.createdAt}
                </p>
              </>
            )}
          </div>
        </>
      )}

      <div className="text-center mt-5">
        {isEditing ? (
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 cursor-pointer text-white p-2 rounded-sm text-sm"
            >
              Lưu thay đổi
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white p-2 rounded-sm text-sm"
            >
              Hủy
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white p-2 rounded-sm text-sm"
          >
            Cập nhật thông tin
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
