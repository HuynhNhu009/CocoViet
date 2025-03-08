import React from "react";
import DashboardContent from "../components/DashboardContent";
import Sidebar from "../components/Layout/Sidebar";

const Dashboard = () => {
  

  return (
    <div className=" flex mt-6">
      <Sidebar />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
