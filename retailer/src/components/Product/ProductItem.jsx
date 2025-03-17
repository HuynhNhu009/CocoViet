import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

const ProductItem = ({ product }) => {
  console.log("Item:", product);

  // Function to determine status color class
  const getStatusColor = (status) => {
    switch (status) {
      case "ENABLE":
        return "text-green-600"; 
      case "DISABLE":
        return "text-gray-600"; 
      case "PAUSE":
        return "text-yellow-600"; 
      case "BLOCK":
        return "text-red-600"; 
      default:
        return "text-gray-600"; 
    }
  };

  return (
    <div
      key={product.id}
      className="p-4 mb-5 w-full h-80 rounded-md shadow-sm cursor-pointer hover:shadow-lg hover:border-1 hover:border-green-200 overflow-hidden flex flex-col"
    >
      <img
        src={product.productImage}
        alt={product.productName}
        className="w-fit h-50 object-cover mb-2 border border-green-600"
      />
      <div className="flex-1">
        <p className="font-medium text-black truncate capitalize">
          {product.productName}
        </p>
        <p className="text-gray-600 truncate text-sm">
          Mô tả: {product.productDesc || "Chưa có"}
        </p>
        <p className="text-gray-600 text-sm truncate sm:block">
          Nguồn gốc: {product.productOrigin || "Chưa có"}
        </p>
        <p className="text-gray-600 text-sm truncate hidden sm:block">
          Danh mục:{" "}
          {product.categories && Array.isArray(product.categories)
            ? product.categories
                .map((cat) =>
                  typeof cat === "object" ? cat.categoryName : cat
                )
                .join(", ") || "Chưa có"
            : "Chưa có"}
        </p>
      </div>
      <p
        className={`${getStatusColor(
          product.status
        )} text-sm font-bold text-right mt-2`}
      >
        {product.status === "ENABLE"
          ? "Đang bán"
          : product.status === "DISABLE"
          ? "Chờ duyệt"
          : product.status === "PAUSE"
          ? "Tạm ngừng"
          : "Vi phạm"}
      </p>
    </div>
  );
};

export default ProductItem;
