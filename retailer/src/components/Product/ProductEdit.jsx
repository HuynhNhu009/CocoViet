import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProductEdit = ({ product, onSave, onCancel }) => {
  console.log("Product Edit =>", product);
  console.log("Product Edit OnSave =>", onSave);
  console.log("Product Edit OnCancel =>", onCancel);

  const [dataEdited, setDataEdited] = useState({});
  const categories = useSelector((state) => state.RetailerStore.category);
  console.log("Categories from Redux =>", categories);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataEdited((prev) => ({ ...prev, [name]: value }));
    console.log("dataEdited =>", dataEdited);
  };

  const handleCategoryToggle = (categoryId) => {
    setDataEdited((prev) => {
      const currentCategories = prev.categories !== undefined
        ? prev.categories
        : product.categories || [];

      const updatedCategories = currentCategories.some(cat => cat.categoryId === categoryId)
        ? currentCategories.filter(cat => cat.categoryId !== categoryId)
        : [...currentCategories, { categoryId }]; // Thêm object với categoryId

      return {
        ...prev,
        categories: updatedCategories,
      };
    });
  };

  const isCategoryChecked = (categoryId) => {
    const currentCategories = dataEdited.categories !== undefined
      ? dataEdited.categories
      : product.categories || [];
    return currentCategories.some(cat => cat.categoryId === categoryId);
  };

  const getDisplayValue = (field) => {
    return dataEdited[field] !== undefined
      ? dataEdited[field]
      : product[field] || "";
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-2/7">
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-full object-cover"
        />
      </div>
      <div className="w-full md:5/7">
        <div className="my-2">
          <label className="block text-sm font-medium text-gray-700">
            Tên sản phẩm:
          </label>
          <input
            className="w-full text-[16px] font-semibold px-3 py-2 border rounded-sm border-gray-300 focus:border-green-500 focus:ring-0 focus:outline-none"
            type="text"
            name="productName"
            value={getDisplayValue("productName")}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2">
          <label className="block text-sm font-medium text-gray-700">
            Mô tả:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:border-green-500 focus:outline-none"
            type="text"
            name="productDesc"
            value={getDisplayValue("productDesc")}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2">
          <label className="block text-sm font-medium text-gray-700">
            Nguồn gốc:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:border-green-500 focus:outline-none"
            type="text"
            name="productOrigin"
            value={getDisplayValue("productOrigin")}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2">
          <label className="block text-sm font-medium text-gray-700">
            Danh mục sản phẩm
          </label>
          <div className="min-h-30 overflow-y-auto border border-gray-300 rounded-md p-2">
            {categories.length === 0 ? (
              <p className="text-gray-500 text-sm">Chưa có danh mục nào.</p>
            ) : (
              categories.map((cat) => (
                <div
                  key={cat.categoryId}
                  className="flex items-center gap-2 py-1"
                >
                  <input
                    type="checkbox"
                    checked={isCategoryChecked(cat.categoryId)}
                    onChange={() => handleCategoryToggle(cat.categoryId)}
                    className="w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700">{cat.categoryName}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;