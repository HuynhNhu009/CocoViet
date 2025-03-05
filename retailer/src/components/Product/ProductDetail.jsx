import React from "react";
import { PencilIcon, TrashIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const ProductDetail = ({ product, onBack }) => {
  return (
    <div className="p-6 bg-white rounded-md shadow-sm min-h-80">
      {/* Back button - only visible on mobile */}
      <button
        onClick={onBack}
        className="md:hidden mb-4 flex items-center gap-2 text-green-600 hover:text-green-800"
      >
        <ArrowLeftIcon className="size-5" />
        Quay lại danh sách
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <img
            src={product.productImage}
            alt={product.productName}
            className="w-full object-cover rounded-md border border-green-600"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-bold text-green-800 mb-2 capitalize">
            {product.productName}
          </h2>
          <div className="space-y-2">
            <p className="text-green-600">
              <span className="font-medium">Mô tả:</span>{" "}
              {product.productDesc || "Chưa có"}
            </p>
            <p className="text-green-600">
              <span className="font-medium">Nguồn gốc:</span>{" "}
              {product.productOrigin || "Chưa có"}
            </p>
            <p className="text-green-600">
              <span className="font-medium">Danh mục:</span>{" "}
              {product.categoryId.join(", ") || "Chưa có"}
            </p>
            <div className="text-green-600">
              <span className="font-medium">Loại:</span>
              {!product.variants || product.variants.length === 0 ? (
                <span> Chưa có</span>
              ) : (
                <ul className="list-disc pl-6 mt-1">
                  {product.variants.map((variant, index) => (
                    <li key={index}>
                      {variant.value} {variant.unit} - {variant.price}đ (Tồn:{" "}
                      {variant.initStock})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-800">
              <PencilIcon className="size-5" />
              Sửa
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-800">
              <TrashIcon className="size-5" />
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;