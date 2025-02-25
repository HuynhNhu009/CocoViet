import React from "react";
import {
  ShoppingCartIcon,
  CubeIcon,
  PlusIcon,
  XMarkIcon,
  TagIcon, // Thêm icon cho Quản lý danh mục
} from "@heroicons/react/24/outline";

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navItems = [
    {
      id: "orders",
      label: "Đơn hàng",
      icon: <ShoppingCartIcon className="size-5" />,
    },
    {
      id: "products",
      label: "Sản phẩm",
      icon: <CubeIcon className="size-5" />,
    },
    {
      id: "add-product",
      label: "Thêm sản phẩm",
      icon: <PlusIcon className="size-5" />,
    },
    {
      id: "category-manager",
      label: "Quản lý danh mục",
      icon: <TagIcon className="size-5" />,
    },
  ];

  const renderNavItem = (item, closeOnClick = false) => (
    <button
      key={item.id}
      onClick={() => {
        setActiveTab(item.id);
        if (closeOnClick) setIsOpen(false);
      }}
      className={`flex items-center gap-2 py-2 px-4 rounded-md transition-colors duration-200 ${
        activeTab === item.id
          ? "bg-green-600 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
      aria-label={item.label}
    >
      {item.icon}
      <span>{item.label}</span>
    </button>
  );

  return (
    <>
      {/* Sidebar trượt cho mobile */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white p-5 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden z-50`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu điều hướng"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Menu</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 transition-colors"
            aria-label="Đóng menu"
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => renderNavItem(item, true))}
        </nav>
      </div>

      {/* Sidebar cố định cho desktop */}
      <div
        className="hidden lg:block lg:w-64 flex-shrink-0 bg-white p-5 rounded-lg shadow-md"
        role="navigation"
        aria-label="Menu điều hướng"
      >
        <div className="sticky top-10">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => renderNavItem(item))}
          </nav>
        </div>
      </div>

      {/* Overlay khi sidebar mở trên mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
