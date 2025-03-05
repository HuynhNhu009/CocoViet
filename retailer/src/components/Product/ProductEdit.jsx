import React, { useState } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { productApi } from "../../services/productService";
const ProductEdit = ({ product, onSave, onCancel }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...editedProduct.variants];
    updatedVariants[index][field] = field === "unit" ? value : parseInt(value) || 0;
    setEditedProduct((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        productId: editedProduct.id,
        productName: editedProduct.productName,
        productDesc: editedProduct.productDesc,
        productOrigin: editedProduct.productOrigin,
        categoryId: editedProduct.categoryId,
        productVariants: editedProduct.variants.map((v) => ({
          unitId: v.unitId,
          unitName: v.unit,
          value: v.value,
          price: v.price,
          initStock: v.initStock,
        })),
      };
      await productApi.updateProduct(updatedData);
      onSave(); 
      alert("Cập nhật sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Cập nhật sản phẩm thất bại!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3">
        <img
          src={editedProduct.productImage}
          alt={editedProduct.productName}
          className="w-full object-cover rounded-md border border-green-600"
        />
        <input
          type="text"
          name="productImage"
          value={editedProduct.productImage}
          onChange={handleInputChange}
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          placeholder="URL ảnh sản phẩm"
        />
      </div>
      <div className="w-full md:w-2/3">
        <input
          type="text"
          name="productName"
          value={editedProduct.productName}
          onChange={handleInputChange}
          className="text-xl font-bold text-green-800 mb-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
        />
        <div className="space-y-2">
          <p className="text-green-600">
            <span className="font-medium">Mô tả:</span>{" "}
            <textarea
              name="productDesc"
              value={editedProduct.productDesc || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              rows="3"
            />
          </p>
          <p className="text-green-600">
            <span className="font-medium">Nguồn gốc:</span>{" "}
            <input
              type="text"
              name="productOrigin"
              value={editedProduct.productOrigin || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </p>
          <p className="text-green-600">
            <span className="font-medium">Danh mục:</span>{" "}
            <input
              type="text"
              name="categoryId"
              value={editedProduct.categoryId.join(", ") || ""}
              onChange={(e) => setEditedProduct((prev) => ({
                ...prev,
                categoryId: e.target.value.split(", "),
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </p>
          <div className="text-green-600">
            <span className="font-medium">Loại:</span>
            {editedProduct.variants && editedProduct.variants.length > 0 ? (
              <ul className="list-disc pl-6 mt-1">
                {editedProduct.variants.map((variant, index) => (
                  <li key={index} className="flex gap-2 items-center">
                    <input
                      type="number"
                      value={variant.value}
                      onChange={(e) => handleVariantChange(index, "value", e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      value={variant.unit}
                      onChange={(e) => handleVariantChange(index, "unit", e.target.value)}
                      className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                      className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="number"
                      value={variant.initStock}
                      onChange={(e) => handleVariantChange(index, "initStock", e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <span>Chưa có</span>
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-800"
          >
            <CheckIcon className="size-5" />
            Lưu
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-800"
          >
            <XMarkIcon className="size-5" />
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;