import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

const ProductItem = ({ product }) => {
  return (
    <div key={product.id} className="p-4 mb-5 w-full h-80 rounded-md shadow-sm cursor-pointer hover:shadow-lg hover:border-2 hover:border-green-200 overflow-hidden">
      <img
        src={product.productImage}
        alt={product.productName}
        className="w-fit h-50 object-cover mb-2 border border-green-600"
      />
      <p className="font-medium text-green-800 truncate capitalize ">{product.productName}</p>
      <p className="text-green-600 truncate text-sm">
        Mô tả: {product.productDesc || "Chưa có"}
      </p>
      <p className="text-green-600 text-sm truncate sm:block">
        Nguồn gốc: {product.productOrigin || "Chưa có"}
      </p>
      <p className="text-green-600 text-sm truncate hidden sm:block">
        Danh mục: {product.categories && Array.isArray(product.categories)
          ? product.categories
              .map((cat) =>
                typeof cat === "object" ? cat.categoryName : cat
              )
              .join(", ") || "Chưa có"
          : "Chưa có"}
      </p>  
    </div>
  );
};

export default ProductItem;
