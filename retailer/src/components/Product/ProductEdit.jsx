import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PlusIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";

const ProductEdit = ({ product, onSave, onCancel}) => {
  console.log("Product Edit =>", product);
  console.log("Product Edit OnSave =>", onSave);
  console.log("Product Edit OnCancel =>", onCancel);

  const [dataEdited, setDataEdited] = useState({});
  const [isAddingVariantInline, setIsAddingVariantInline] = useState(false);
  const [newVariant, setNewVariant] = useState({
    unitId: "",
    value: "",
    price: "",
    initStock: "",
  });
  const [variantErrors, setVariantErrors] = useState("");
  const textareaRef = useRef(null);

  const categories = useSelector((state) => state.RetailerStore.category);
  const units = useSelector((state)=> state.RetailerStore.units)
  console.log("Categories from Redux =>", categories);

  // Hàm xử lý khi giá trị input/textarea thay đổi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataEdited((prev) => ({ ...prev, [name]: value }));
    console.log("dataEdited =>", { ...dataEdited, [name]: value });
  };

  // Hàm xử lý khi giá trị của một variant thay đổi
  const handleVariantChange = (variantId, field, value) => {
    setDataEdited((prev) => {
      const currentVariants =
        prev.variants !== undefined ? prev.variants : product.variants || [];

      const updatedVariants = currentVariants.map((variant) =>
        variant.variantId === variantId
          ? { ...variant, [field]: field === "unitId" ? value : parseFloat(value) || 0 }
          : variant
      );

      return {
        ...prev,
        variants: updatedVariants,
      };
    });
  };

  // Hàm xử lý khi thêm một variant mới
  const handleNewVariantChange = (e) => {
    const { name, value } = e.target;
    setNewVariant((prev) => ({ ...prev, [name]: value }));
  };

  const validateVariant = () => {
    if (
      !newVariant.unitId ||
      !newVariant.value ||
      !newVariant.price ||
      !newVariant.initStock
    ) {
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

    const unit = units.find((u) => u.unitId === newVariant.unitId);
    const variant = {
      variantId: crypto.randomUUID(), // Tạo variantId mới
      unitId: newVariant.unitId,
      value: parseInt(newVariant.value),
      price: parseInt(newVariant.price),
      initStock: parseInt(newVariant.initStock),
      unit: unit ? unit.unitName : "",
    };

    setDataEdited((prev) => ({
      ...prev,
      variants: [...(prev.variants || product.variants || []), variant],
    }));
    setNewVariant({ unitId: "", value: "", price: "", initStock: "" });
    setVariantErrors("");
    setIsAddingVariantInline(false);
  };

  const handleDeleteVariant = (variantId) => {
    setDataEdited((prev) => ({
      ...prev,
      variants: (prev.variants || product.variants || []).filter(
        (variant) => variant.variantId !== variantId
      ),
    }));
  };

  // Tự động điều chỉnh chiều cao của textarea khi giá trị productDesc thay đổi
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset chiều cao để tính toán lại
      textarea.style.height = `${textarea.scrollHeight}px`; // Đặt chiều cao bằng chiều cao nội dung
    }
  }, [dataEdited.productDesc]);

  const handleCategoryToggle = (categoryId) => {
    setDataEdited((prev) => {
      const currentCategories =
        prev.categories !== undefined
          ? prev.categories
          : product.categories || [];

      const updatedCategories = currentCategories.some(
        (cat) => cat.categoryId === categoryId
      )
        ? currentCategories.filter((cat) => cat.categoryId !== categoryId)
        : [...currentCategories, { categoryId }];

      return {
        ...prev,
        categories: updatedCategories,
      };
    });
  };

  const isCategoryChecked = (categoryId) => {
    const currentCategories =
      dataEdited.categories !== undefined
        ? dataEdited.categories
        : product.categories || [];
    return currentCategories.some((cat) => cat.categoryId === categoryId);
  };

  const getDisplayValue = (field) => {
    return dataEdited[field] !== undefined
      ? dataEdited[field]
      : product[field] || "";
  };

  // Hàm lấy giá trị hiển thị của một variant
  const getVariantDisplayValue = (variantId, field) => {
    const currentVariants =
      dataEdited.variants !== undefined ? dataEdited.variants : product.variants || [];
    const variant = currentVariants.find((v) => v.variantId === variantId);
    return variant ? variant[field] || "" : "";
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
          <textarea
            ref={textareaRef}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:border-green-500 focus:outline-none"
            style={{ resize: "none", overflow: "hidden" }}
            type="text"
            name="productDesc"
            value={getDisplayValue("productDesc")}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2">
          <label className="block text-sm font-medium text-gray-700">
            Loại:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:border-green-500 focus:outline-none"
            type="text"
            name="type"
            value={getDisplayValue("type")}
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

        <div className="my-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Biến thể sản phẩm
            </label>
            <button
              type="button"
              onClick={() => setIsAddingVariantInline(true)}
              className={`${isAddingVariantInline ? "hidden" : ""} p-2 bg-gray-100 rounded-md hover:bg-gray-200`}
              aria-label="Thêm biến thể mới"
            >
              <PlusIcon className="size-5 text-gray-600" />
            </button>
          </div>
          {/* Form inline thêm variant */}
          {isAddingVariantInline && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              <input
                type="number"
                name="value"
                value={newVariant.value}
                onChange={handleNewVariantChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Số lượng"
              />
              <input
                type="number"
                name="price"
                value={newVariant.price}
                onChange={handleNewVariantChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Giá"
              />
              <select
                name="unitId"
                value={newVariant.unitId}
                onChange={handleNewVariantChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={units.length === 0}
              >
                <option value="">Chọn đơn vị</option>
                {units.map((unit) => (
                  <option key={unit.unitId} value={unit.unitId}>
                    {unit.unitName}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="initStock"
                value={newVariant.initStock}
                onChange={handleNewVariantChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Kho"
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
                  >
                    Thêm
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingVariantInline(false)}
                    className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    <XMarkIcon className="size-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Danh sách variant */}
          <div className="min-h-15 overflow-y-auto border border-gray-300 rounded-md p-2 mt-2">
            {(dataEdited.variants || product.variants || []).length === 0 ? (
              <p className="text-gray-500 text-sm">Chưa có biến thể nào.</p>
            ) : (
              (dataEdited.variants || product.variants || []).map((variant) => (
                <div
                  key={variant.variantId}
                  className="flex items-center justify-between py-1 pl-4"
                >
                  <div className="grid grid-cols-4 gap-2 w-full">
                    <input
                      type="number"
                      value={getVariantDisplayValue(variant.variantId, "value")}
                      onChange={(e) =>
                        handleVariantChange(
                          variant.variantId,
                          "value",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Số lượng"
                    />
                    <input
                      type="number"
                      value={getVariantDisplayValue(variant.variantId, "price")}
                      onChange={(e) =>
                        handleVariantChange(
                          variant.variantId,
                          "price",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Giá"
                    />
                    <select
                      value={getVariantDisplayValue(variant.variantId, "unitId")}
                      onChange={(e) =>
                        handleVariantChange(
                          variant.variantId,
                          "unitId",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      disabled={units.length === 0}
                    >
                      <option value="">Chọn đơn vị</option>
                      {units.map((unit) => (
                        <option key={unit.unitId} value={unit.unitId}>
                          {unit.unitName}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={getVariantDisplayValue(variant.variantId, "initStock")}
                      onChange={(e) =>
                        handleVariantChange(
                          variant.variantId,
                          "initStock",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Kho"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteVariant(variant.variantId)}
                    className="p-1 text-red-600 hover:text-red-800 ml-2"
                  >
                    <TrashIcon className="size-4" />
                  </button>
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