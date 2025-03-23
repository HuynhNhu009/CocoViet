import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { customerApi } from "../services/customerService.js";

const CustomerProfile = () => {
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
        userName: customer.customerName || "",
        userAddress: customer.customerAddress || "",
        phoneNumbers: customer.phoneNumbers || "",
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    setEditedCustomer({ ...editedCustomer, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const updatedFields = Object.keys(editedCustomer).reduce((acc, key) => {
      if (editedCustomer[key] !== (customer[key] || "")) {
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
    <div className="max-w-6xl mx-auto p-5 font-sans">
      <section className="bg-gray-100  p-6 shadow-md rounded-lg mb-8 flex items-start gap-6">
        <div className="w-32 h-32 mt-2 flex-shrink-0 flex items-center justify-center">
          <img
            src="https://img.freepik.com/premium-vector/young-coconut-design-premium-logo_187482-677.jpg"
            alt="customer"
            className="w-full h-full object-cover rounded-sm shadow-sm"
          />
        </div>

        <div className="flex-1 text-gray-600">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {customer?.customerName || "Tên nhà bán lẻ"}
          </h1>
          <div className="flex justify-between">
            <div>
              <p className="text-sm md:text-base mb-2">
                <strong>Địa chỉ:</strong>{" "}
                {customer?.customerAddress || "Chưa có thông tin"}
              </p>
              <p className="text-sm md:text-base mb-2">
                <strong>Số điện thoại:</strong>{" "}
                {customer?.phoneNumbers || "Chưa có thông tin"}
              </p>
              <p className="text-sm md:text-base mb-2">
                <strong>Email:</strong>{" "}
                {customer?.customerEmail || "Chưa có thông tin"}
              </p>
            </div>

            <div>
              <p className="text-sm md:text-base mb-2">
                <strong>Tham gia:</strong>{" "}
                {customer?.createdAt
                  ?.split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/") || "N/A"}
              </p>
              {!isEditing && (
                <p className="text-sm md:text-base mb-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white p-2 rounded-sm text-sm w-full"
                  >
                    Cập nhật thông tin
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {isEditing && (
        <section className=" p-6 shadow-md rounded-lg mb-8">
          <h2 className="text-xl md:text-xl text-black uppercase mb-4 text-center">
            Chỉnh sửa thông tin
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm md:text-base text-black  block mb-1">
                <strong>Tên khách hàng</strong>
              </label>
              <input
                type="text"
                name="userName"
                value={editedCustomer.userName}
                onChange={handleChange}
                className="w-full p-2 rounded-sm text-black  border  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm md:text-base text-black  block mb-1">
                <strong>Địa chỉ</strong>
              </label>
              <input
                type="text"
                name="userAddress"
                value={editedCustomer.userAddress}
                onChange={handleChange}
                className="w-full p-2 rounded-sm text-black  border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm md:text-base text-black  block mb-1">
                <strong>Số điện thoại</strong>
              </label>
              <input
                type="text"
                name="phoneNumbers"
                value={editedCustomer.phoneNumbers}
                onChange={handleChange}
                className="w-full p-2 rounded-sm text-black  border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 cursor-pointer text-white p-2 rounded-sm text-sm px-4"
            >
              Lưu thay đổi
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white p-2 rounded-sm text-sm px-4"
            >
              Hủy
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default CustomerProfile;