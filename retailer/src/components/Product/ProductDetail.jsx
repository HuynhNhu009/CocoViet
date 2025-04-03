import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ProductEdit from "./ProductEdit";
import { productApi } from "../../services/productService";

const ProductDetail = ({
  product,
  onBack,
  onEdit,
  onDelete,
  fetchProducts,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    onEdit();
  };

  const handleSave = async (updatedProduct) => {
    setIsEditing(false);
    try {
      const response = await productApi.getProductById(
        updatedProduct.id || updatedProduct.productId
      );
      if (typeof fetchProducts === "function") fetchProducts();
      if (typeof onBack === "function") onBack(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm sau khi lưu:", error);
      alert("Không thể tải sản phẩm đã chỉnh sửa!");
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case "ENABLE":
        return { text: "Đang bán", color: "text-green-600 bg-green-100" };
      case "DISABLE":
        return { text: "Chờ duyệt", color: "text-gray-600 bg-gray-100" };
      case "PAUSE":
        return { text: "Tạm ngừng", color: "text-yellow-600 bg-yellow-100" };
      case "BLOCK":
        return { text: "Vi phạm", color: "text-red-600 bg-red-100" };
      default:
        return { text: "", color: "text-gray-600 bg-gray-100" };
    }
  };

  const statusDisplay = getStatusDisplay(product.status);

  return (
    <div className="p-4 sm:p-6 bg-white rounded-md shadow-sm min-h-80 border-2 border-green-100">
      {/* Header section */}
      <div className="flex items-center justify-between mb-4">
        {/* Back button - mobile only */}
        <button
          onClick={onBack}
          className="md:hidden flex items-center gap-2 text-green-600 hover:text-green-800"
        >
          <ArrowLeftIcon className="size-5" />
          Quay lại
        </button>

        {/* Status */}

        <div className="flex gap-2 justify-star">
          <span
            className={`${statusDisplay.color} px-2 py-1 rounded-md text-sm font-medium`}
          >
            {statusDisplay.text}
          </span>
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 px-3 py-1 text-green-600 rounded cursor-pointer hover:text-green-800"
          >
            <PencilIcon className="size-5" />
            Sửa
          </button>
        </div>

        {/* Close button - desktop only */}
        <button
          onClick={onBack}
          className="hidden md:flex items-center text-green-600 hover:text-green-800"
        >
          <XMarkIcon className="size-6" />
        </button>
      </div>

      {isEditing ? (
        <ProductEdit
          product={product}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="w-full md:w-1/3">
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-64 md:h-auto object-cover rounded-md border border-green-600"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 capitalize">
              {product.productName}
            </h2>
            <div className="space-y-3 text-sm md:text-base">
              <div>
                <span className="font-medium">Mô tả: </span>
                <span
                  className="text-gray-700"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {product.productDesc || "Chưa có"}
                </span>
              </div>
              <div>
                <span className="font-medium">Nguồn gốc: </span>
                <span className="text-gray-700">
                  {product.productOrigin || "Chưa có"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Danh mục: </span>
                <div className="mt-1">
                  {product.categoryName && product.categoryName.length > 0 ? (
                    product.categoryName.map((c, index) => (
                      <span
                        key={index}
                        className="text-gray-700 block md:inline md:mr-2"
                      >
                        {typeof c === "object" ? c.categoryName : c}
                        {index < product.categoryName.length - 1 &&
                          window.innerWidth >= 768 &&
                          ", "}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-700">Chưa có</span>
                  )}
                </div>
              </div>
              <div>
                <span className="font-medium">Loại: </span>
                {!Array.isArray(product.variants) ||
                product.variants.length === 0 ? (
                  <span className="text-gray-700">Chưa có</span>
                ) : (
                  <div className="mt-1 space-y-2">
                    {product.variants.map((variant, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
                      >
                        <span className="text-gray-700">
                          {variant.value} {variant.unitName}
                        </span>
                        <span className="text-gray-700">
                          ₫
                          {new Intl.NumberFormat("vi-VN").format(variant.price)}{" "}
                          (Kho: {variant.initStock})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
