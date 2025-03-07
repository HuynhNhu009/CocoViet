import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import ProductEdit from "./ProductEdit";

const ProductDetail = ({ product, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);

  // console.log("CategoryID :", product.categories);
  console.log("Product Detail:", product);

  useEffect(() => {
    setIsEditing(false);
  }, [product]);

  return (
    <div className="p-6 bg-white rounded-md shadow-sm min-h-80 border-2 border-green-100">
      {/* Back button - only visible on mobile */}
      <button
        onClick={onBack}
        className="md:hidden mb-4 flex items-center gap-2 text-green-600 hover:text-green-800"
      >
        <ArrowLeftIcon className="size-5" />
        Quay lại danh sách
      </button>

      <button
        onClick={onBack}
        className="hidden sm:flex items-center ml-auto 
        rounded-sm text-green-600 cursor-pointer"
      >
        <XMarkIcon className="size-6" />
      </button>

      {isEditing ? (
        <ProductEdit
          product={product}
          onSave={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full object-cover rounded-md border border-green-600"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-xl font-bold text-gray-900 mb-2 capitalize">
              {product.productName}
            </h2>
            <div className="space-y-2  font-medium">
              <div>
                <span>Mô tả:</span> {product.productDesc || "Chưa có"}
              </div>
              <div>
                <span>Nguồn gốc:</span> {product.productOrigin || "Chưa có"}
              </div>
              <div className="flex items-start">
                <span className="w-24 text-gray-700">Danh mục: </span>
                <div className="flex flex-col space-y-1">
                  {product.categories && product.categories.length > 0 ? (
                    product.categories.map((c, index) => (
                      <span key={index} className="text-gray-700">
                        {typeof c === "object" ? c.categoryName : c}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-700">Chưa có</span>
                  )}
                </div>
              </div>
              <div>
                <span>Loại:</span>
                {!product.variants || product.variants.length === 0 ? (
                  <span> Chưa có</span>
                ) : (
                  product.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="flex items-center rounded-sm shadow-sm my-2 justify-between p-2"
                    >
                      <span className="text-gray-700">
                        {variant.value} {variant.unitName} - {variant.price}đ (Kho:{" "}
                        {variant.initStock})
                      </span>
                      <button
                        type="button"
                        // onClick={() => handleDeleteVariant(index)}
                        className="p-1 text-red-600 hover:text-red-800"
                        // disabled={loading}
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-4 ">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white cursor-pointer rounded hover:bg-blue-800"
              >
                <PencilIcon className="size-5" />
                Sửa
              </button>
              <button className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white cursor-pointer rounded hover:bg-red-800">
                <TrashIcon className="size-5" />
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
