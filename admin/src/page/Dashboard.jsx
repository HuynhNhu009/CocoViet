import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {

  
  const [activeTab, setActiveTab] = useState("orders"); // Tab mặc định
  const [label, setLabel] = useState("Đơn hàng");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-blue">
      {/* <Sidebar
        activeTab={activeTab}
        label={label}
        setLabel={setLabel}
        setActiveTab={setActiveTab}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="p-5">
        <h1 className="text-2xl font-bold">Trang quản lý</h1>
        <p>Tab hiện tại: {label}</p>
      </div> */}

      hello
    </div>
  );
};

export default Dashboard;

