import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

const ProductItem = ({ product }) => {
  return (
    <div key={product.id} className="p-4 mb-5 w-full h-80 rounded-md shadow-sm cursor-pointer hover:shadow-lg overflow-hidden">
      <img
        src={product.productImage}
        alt={product.productName}
        className="w-fit object-cover mb-2 border border-green-600"
      />
      <p className="font-medium text-green-800 truncate capitalize ">{product.productName}</p>
      <p className="text-green-600 text-sm">
        Mô tả: {product.productDesc || "Chưa có"}
      </p>
      <p className="text-green-600 text-sm truncate sm:block">
        Nguồn gốc: {product.productOrigin || "Chưa có"}
      </p>
      <p className="text-green-600 text-sm truncate hidden sm:block">
        Danh mục: {product.categoryId.join(", ") || "Chưa có"}
      </p>
      {/* <div className="text-sm text-gray-500 mt-1 truncate">
        Loại:
        {!product.variants || product.variants.length === 0 ? (
          <span> Chưa có</span>
        ) : (
          <ul className="list-disc pl-4 truncate">
            {product.variants.map((variant, index) => (
              <li key={index} className="text-gray-600 truncate">
                {variant.value} {variant.unit} - {variant.price}đ (Tồn:{" "}
                {variant.initStock})
              </li>
            ))}
          </ul>
        )}
      </div> */}
      {/* <div className="flex gap-2 mt-2">
        <button className="text-blue-600 hover:text-blue-800">
          <PencilIcon className="size-5" />
        </button>
        <button className="text-red-600 hover:text-red-800">
          <TrashIcon className="size-5" />
        </button>
      </div> */}
    </div>
  );
};

export default ProductItem;
