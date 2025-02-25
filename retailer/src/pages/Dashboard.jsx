import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BellIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Title from "../components/Title";
import Sidebar from "../components/SideBar";
import OrderList from "../components/OrderList";
import ProductList from "../components/ProductList";
import AddProductForm from "../components/AddProductForm";
import CategoryManager from "../components/CategoryManager";

const Dashboard = () => {
  const retailer = useSelector((state) => state.RetailerStore.retailer);
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    "Coconut Water",
    "Coconut Oil",
    "Coconut Crafts",
  ]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setOrders([
      { id: 1, date: "2025-02-24", total: 500000, status: "Đã giao" },
      { id: 2, date: "2025-02-23", total: 300000, status: "Đang xử lý" },
    ]);
    setLoading(false);
  }, []);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    newProduct.categoryId.forEach((cat) => {
      if (!categories.includes(cat)) {
        setCategories((prev) => [...prev, cat]);
      }
    });
    setActiveTab("products");
    setIsSidebarOpen(false);
  };

  const updateCategories = (updatedCategories) => {
    setCategories(updatedCategories);
    setProducts((prev) =>
      prev.map((product) => ({
        ...product,
        categoryId: product.categoryId.filter((cat) =>
          updatedCategories.includes(cat)
        ),
        variantsByCategory: Object.fromEntries(
          Object.entries(product.variantsByCategory).filter(([cat]) =>
            updatedCategories.includes(cat)
          )
        ),
      }))
    );
  };

  const tabContent = {
    orders: <OrderList orders={orders} />,
    products: <ProductList products={products} />,
    "add-product": (
      <AddProductForm
        onAddProduct={addProduct}
        initialCategories={categories}
      />
    ),
    "category-manager": (
      <CategoryManager
        categories={categories}
        onUpdateCategories={updateCategories}
      />
    ),
  };

  if (loading) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-200 pt-10 px-4 flex flex-col lg:flex-row gap-6">
      <div className="lg:hidden flex justify-between items-center mb-4">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Bars3Icon className="size-6 text-gray-700" />
        </button>
        <Title
          text1={"DASHBOARD"}
          text2={retailer?.retailerName || "Retailer"}
        />
        <BellIcon className="size-6 text-gray-700" />
      </div>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1">
        <div className="hidden lg:flex justify-between items-center mb-6">
          <Title
            text1={"DASHBOARD"}
            text2={retailer?.retailerName || "Retailer"}
          />
          <BellIcon className="size-7 text-gray-700" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
