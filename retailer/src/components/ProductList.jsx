import React from "react";
import { useSelector } from "react-redux";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const ProductList = () => {
  const products = useSelector((state) => state.RetailerStore.products);

  if (!products.length) {
    return (
      <div className="text-center py-4 text-gray-600">
        Chưa có sản phẩm nào.
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Danh sách sản phẩm
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-md shadow-sm">
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-40 object-cover mb-2 rounded-md"
            />
            <p className="font-medium text-gray-800">{product.productName}</p>
            <p className="text-gray-600 text-sm">
              Mô tả: {product.productDesc || "Chưa có"}
            </p>
            <p className="text-gray-600 text-sm">
              Nguồn gốc: {product.productOrigin || "Chưa có"}
            </p>
            <p className="text-gray-600 text-sm">
              Danh mục: {product.categoryId.join(", ") || "Chưa có"}
            </p>
            <div className="text-sm text-gray-500 mt-1">
              Loại:
              {!product.variants || product.variants.length === 0 ? (
                <span> Chưa có</span>
              ) : (
                <ul className="list-disc pl-4">
                  {product.variants.map((variant, index) => (
                    <li key={index} className="text-gray-600">
                      {variant.value} {variant.unit} - {variant.price}đ (Tồn:{" "}
                      {variant.initStock})
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex gap-2 mt-2">
              <button className="text-blue-600 hover:text-blue-800">
                <PencilIcon className="size-5" />
              </button>
              <button className="text-red-600 hover:text-red-800">
                <TrashIcon className="size-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
