import React, { useState } from "react";
import { PlusIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import UploadImage from "./UpLoadImage";

const AddProductForm = ({ onAddProduct, initialCategories = [] }) => {
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productDesc: "",
    retailerId: "d29ea4d9-207f-4902-9a24-bcf28be95afe",
    productImage: "",
    productOrigin: "",
    variantsByCategory: {},
    categoryId: [],
  });
  const [categories, setCategories] = useState([...new Set(initialCategories)]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAddingCategoryInline, setIsAddingCategoryInline] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoryErrors, setCategoryErrors] = useState("");
  const [isAddingVariantInline, setIsAddingVariantInline] = useState(false);
  const [newVariant, setNewVariant] = useState({
    unitId: "",
    value: "",
    price: "",
    initStock: "",
  });
  const [variantErrors, setVariantErrors] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (category) => {
    setNewProduct((prev) => {
      const updatedCategories = prev.categoryId.includes(category)
        ? prev.categoryId.filter((cat) => cat !== category)
        : [...prev.categoryId, category];
      const updatedVariants = { ...prev.variantsByCategory };
      if (!updatedCategories.includes(category)) {
        delete updatedVariants[category];
      }
      return {
        ...prev,
        categoryId: updatedCategories,
        variantsByCategory: updatedVariants,
      };
    });
  };

  const handleAddCategory = () => {
    if (!newCategory) {
      setCategoryErrors("Danh mục không được để trống.");
      return;
    }
    if (categories.includes(newCategory)) {
      setCategoryErrors("Danh mục đã tồn tại.");
      return;
    }
    setCategories((prev) => [...prev, newCategory]);
    setNewProduct((prev) => ({
      ...prev,
      categoryId: [...prev.categoryId, newCategory],
    }));
    setNewCategory("");
    setCategoryErrors("");
    setIsCategoryModalOpen(false);
    setIsAddingCategoryInline(false);
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setNewVariant((prev) => ({ ...prev, [name]: value }));
  };

  const validateVariant = () => {
    if (!newVariant.value || !newVariant.price || !newVariant.initStock) {
      setVariantErrors("Tất cả các trường phải được điền.");
      return false;
    }
    const value = parseInt(newVariant.value);
    const price = parseInt(newVariant.price);
    const initStock = parseInt(newVariant.initStock);
    if (
      isNaN(value) ||
      value <= 0 ||
      isNaN(price) ||
      price <= 0 ||
      isNaN(initStock) ||
      initStock < 0
    ) {
      setVariantErrors("Số lượng, giá phải > 0, tồn kho phải >= 0.");
      return false;
    }
    return true;
  };

  const handleAddVariant = () => {
    if (!validateVariant()) return;
    const unitId = crypto.randomUUID();
    const variant = {
      unitId,
      value: parseInt(newVariant.value),
      price: parseInt(newVariant.price),
      initStock: parseInt(newVariant.initStock),
    };
    setNewProduct((prev) => {
      const updatedVariants = { ...prev.variantsByCategory };
      // Thêm variant vào danh mục đầu tiên trong categoryId (hoặc logic khác nếu cần)
      const defaultCategory = prev.categoryId[0];
      updatedVariants[defaultCategory] = [
        ...(updatedVariants[defaultCategory] || []),
        variant,
      ];
      return {
        ...prev,
        variantsByCategory: updatedVariants,
      };
    });
    setNewVariant({ unitId: "", value: "", price: "", initStock: "" });
    setVariantErrors("");
    setIsAddingVariantInline(false);
  };

  const handleDeleteVariant = (category, index) => {
    setNewProduct((prev) => {
      const updatedVariants = { ...prev.variantsByCategory };
      updatedVariants[category] = updatedVariants[category].filter(
        (_, i) => i !== index
      );
      if (updatedVariants[category].length === 0)
        delete updatedVariants[category];
      return { ...prev, variantsByCategory: updatedVariants };
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.categoryId.length === 0) {
      setMessage("Vui lòng chọn ít nhất một danh mục.");
      return;
    }
    if (Object.keys(newProduct.variantsByCategory).length === 0) {
      setMessage("Vui lòng thêm ít nhất một loại sản phẩm.");
      return;
    }
    setLoading(true);
    setMessage(null);

    setTimeout(() => {
      const productToAdd = { ...newProduct, id: Date.now() };
      onAddProduct(productToAdd);
      setNewProduct({
        productName: "",
        productDesc: "",
        retailerId: "d29ea4d9-207f-4902-9a24-bcf28be95afe",
        productImage: "",
        productOrigin: "",
        variantsByCategory: {},
        categoryId: [],
      });
      setMessage("Thêm sản phẩm thành công!");
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Thêm sản phẩm mới
      </h3>
      {message && (
        <div
          className={`p-2 mb-4 text-center rounded-md ${
            message.includes("thành công")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
      <form
        onSubmit={handleAddProduct}
        className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0"
      >
        {/* Cột 1: Thông tin sản phẩm */}
        <div className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="productName"
              value={newProduct.productName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Mô tả sản phẩm
            </label>
            <textarea
              name="productDesc"
              value={newProduct.productDesc}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows="3"
              disabled={loading}
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Nguồn gốc
            </label>
            <input
              type="text"
              name="productOrigin"
              value={newProduct.productOrigin}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={loading}
            />
          </div>
          <div className="relative">
            {/* <label className="block text-sm font-medium text-gray-700">
              Hình ảnh (URL)
            </label>
            <input
              type="text"
              name="productImage"
              value={newProduct.productImage}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              disabled={loading}
            /> */}
            <UploadImage
              imageUrl={newProduct.productImage}
              onImageChange={handleInputChange}
              disabled={loading}
            />
          </div>
        </div>

        {/* Cột 2: Danh mục và Loại */}
        <div className="space-y-6">
          {/* Chọn và thêm danh mục */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Danh mục sản phẩm
              </label>
              <button
                type="button"
                onClick={() => setIsAddingCategoryInline(true)}
                className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 hidden lg:block"
                disabled={loading}
                aria-label="Thêm danh mục mới"
              >
                <PlusIcon className="size-5 text-gray-600" />
              </button>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(true)}
                className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 lg:hidden"
                disabled={loading}
                aria-label="Thêm danh mục mới"
              >
                <PlusIcon className="size-5 text-gray-600" />
              </button>
            </div>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
              {categories.length === 0 ? (
                <p className="text-gray-500 text-sm">Chưa có danh mục nào.</p>
              ) : (
                categories.map((cat) => (
                  <div key={cat} className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      checked={newProduct.categoryId.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      disabled={loading}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-gray-700">{cat}</span>
                  </div>
                ))
              )}
            </div>
            {isAddingCategoryInline && (
              <div className="hidden lg:flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Nhập danh mục mới"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  disabled={loading}
                >
                  Thêm
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingCategoryInline(false)}
                  className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  disabled={loading}
                >
                  <XMarkIcon className="size-5 text-gray-600" />
                </button>
              </div>
            )}
            {categoryErrors && (
              <p className="text-red-600 text-sm mt-1">{categoryErrors}</p>
            )}
          </div>

          {/* Quản lý loại */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Loại sản phẩm
              </label>
              <button
                type="button"
                onClick={() => setIsAddingVariantInline(true)}
                className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                disabled={loading || newProduct.categoryId.length === 0}
                aria-label="Thêm loại mới"
              >
                <PlusIcon className="size-5 text-gray-600" />
              </button>
            </div>
            {newProduct.categoryId.length === 0 && (
              <p className="text-red-600 text-sm">
                Vui lòng chọn ít nhất một danh mục trước khi thêm loại.
              </p>
            )}
            {/* Form inline thêm variant - Không có dropdown */}
            {isAddingVariantInline && (
              <div className="hidden lg:grid lg:grid-cols-4 lg:gap-2 mt-2">
                <input
                  type="number"
                  name="value"
                  value={newVariant.value}
                  onChange={handleVariantChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Số lượng"
                  disabled={loading}
                />
                <input
                  type="text"
                  name="unit"
                  value={newVariant.unit}
                  onChange={handleVariantChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Đơn vị"
                  disabled={loading}
                />
                <input
                  type="number"
                  name="price"
                  value={newVariant.price}
                  onChange={handleVariantChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Giá"
                  disabled={loading}
                />
                <input
                  type="number"
                  name="initStock"
                  value={newVariant.initStock}
                  onChange={handleVariantChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Tồn kho"
                  disabled={loading}
                />
                <div className="col-span-4 flex items-center justify-between">
                  {variantErrors && (
                    <p className="text-red-600 text-sm">{variantErrors}</p>
                  )}
                  <div className="flex gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={handleAddVariant}
                      className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      disabled={loading}
                    >
                      Thêm
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingVariantInline(false)}
                      className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      disabled={loading}
                    >
                      <XMarkIcon className="size-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Danh sách variant */}
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
              {Object.keys(newProduct.variantsByCategory).length === 0 ? (
                <p className="text-gray-500 text-sm">Chưa có loại nào.</p>
              ) : (
                Object.entries(newProduct.variantsByCategory).map(
                  ([category, variants]) => (
                    <div key={category} className="mb-2">
                      <p className="font-medium text-gray-700">{category}</p>
                      {variants.map((variant, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-1 pl-4"
                        >
                          <span className="text-gray-700">
                            {variant.value} {variant.unit} - {variant.price}đ
                            (Tồn: {variant.initStock})
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteVariant(category, index)}
                            className="p-1 text-red-600 hover:text-red-800"
                            disabled={loading}
                          >
                            <TrashIcon className="size-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>

        {/* Modal thêm danh mục trên mobile */}
        {isCategoryModalOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  Thêm danh mục mới
                </h4>
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <XMarkIcon className="size-5 text-gray-600" />
                </button>
              </div>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Nhập danh mục mới"
                disabled={loading}
              />
              {categoryErrors && (
                <p className="text-red-600 text-sm mt-1">{categoryErrors}</p>
              )}
              <button
                type="button"
                onClick={handleAddCategory}
                className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                disabled={loading}
              >
                Thêm
              </button>
            </div>
          </div>
        )}

        {/* Nút submit */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } transition-colors`}
            disabled={loading}
          >
            {loading ? "Đang thêm..." : "Thêm sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
