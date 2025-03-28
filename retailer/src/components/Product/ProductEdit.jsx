import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  PlusIcon,
  XMarkIcon,
  TrashIcon,
  LockClosedIcon,
  PauseCircleIcon,
} from "@heroicons/react/24/outline";
import { IoIosSave } from "react-icons/io";
import { productApi } from "../../services/productService";
import UploadImage from "../UpLoadImage";

const ProductEdit = ({ product, onSave, onCancel }) => {
  const categories = useSelector((state) => state.RetailerStore.category);
  const units = useSelector((state) => state.RetailerStore.units);

  // Khởi tạo dataEdited với categoryId ánh xạ từ product.categoryName
  const [dataEdited, setDataEdited] = useState(() => {
    const initialCategoryIds = (product.categoryName || [])
      .map((name) => {
        const category = categories.find((cat) => cat.categoryName === name);
        return category ? category.categoryId : null;
      })
      .filter((id) => id !== null); // Loại bỏ các ID không tìm thấy

    return {
      ...product,
      categoryId: initialCategoryIds, // Thay vì categoryName
    };
  });

  const [variantErrors, setVariantErrors] = useState("");
  const [deletedVariants, setDeletedVariants] = useState([]);
  const [newVariant, setNewVariant] = useState({
    unitId: "",
    value: "",
    price: "",
    initStock: "",
  });
  const [isAddingVariantInline, setIsAddingVariantInline] = useState(false);

  // Đồng bộ lại dataEdited khi product thay đổi
  useEffect(() => {
    const initialCategoryIds = (product.categoryName || [])
      .map((name) => {
        const category = categories.find((cat) => cat.categoryName === name);
        return category ? category.categoryId : null;
      })
      .filter((id) => id !== null);

    setDataEdited({
      ...product,
      categoryId: initialCategoryIds,
    });
  }, [product, categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataEdited((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (variantId, field, value) => {
    setDataEdited((prev) => {
      const updatedVariants = prev.variants.map((variant) =>
        variant.variantId === variantId
          ? {
              ...variant,
              [field]: field === "unitId" ? value : parseFloat(value) || 0,
            }
          : variant
      );
      return { ...prev, variants: updatedVariants };
    });
  };

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
      setVariantErrors("Vui lòng điền đầy đủ thông tin.");
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

    const variant = {
      unitId: newVariant.unitId,
      value: parseInt(newVariant.value),
      price: parseInt(newVariant.price),
      initStock: parseInt(newVariant.initStock),
    };

    setDataEdited((prev) => ({
      ...prev,
      variants: [...prev.variants, variant],
    }));
    setNewVariant({ unitId: "", value: "", price: "", initStock: "" });
    setVariantErrors("");
    setIsAddingVariantInline(false);
  };

  const handleDeleteVariant = (variantId) => {
    setDeletedVariants((prev) => [...prev, variantId]);
    setDataEdited((prev) => ({
      ...prev,
      variants: prev.variants.filter(
        (variant) => variant.variantId !== variantId
      ),
    }));
  };

  const handleCategoryToggle = (categoryId) => {
    setDataEdited((prev) => {
      const currentCategoryIds = prev.categoryId || [];
      const updatedCategoryIds = currentCategoryIds.includes(categoryId)
        ? currentCategoryIds.filter((id) => id !== categoryId)
        : [...currentCategoryIds, categoryId];
      return { ...prev, categoryId: updatedCategoryIds };
    });
  };

  const isCategoryChecked = (categoryId) => {
    return (dataEdited.categoryId || []).includes(categoryId);
  };

  const handleSaveProduct = async () => {
    const updatedData = {};
    const productId = product.id || product.productId;

    ["productName", "productOrigin", "productDesc"].forEach((field) => {
      if (
        dataEdited[field] !== undefined &&
        dataEdited[field] !== product[field]
      ) {
        updatedData[field] = dataEdited[field];
      }
    });

    if (dataEdited.categoryId !== undefined) {
      const originalCategoryIds = (product.categoryName || [])
        .map((name) => {
          const category = categories.find((cat) => cat.categoryName === name);
          return category ? category.categoryId : null;
        })
        .filter((id) => id !== null);

      const updatedCategoryIds = dataEdited.categoryId || [];
      if (
        JSON.stringify(originalCategoryIds) !==
        JSON.stringify(updatedCategoryIds)
      ) {
        updatedData.categoryId = updatedCategoryIds;
      }
    }

    if (dataEdited.variants !== undefined) {
      const originalVariants = product.variants || [];
      const editedVariants = dataEdited.variants || [];

      const productVariantsToSend = [];

      const newVariants = editedVariants
        .filter(
          (ev) => !originalVariants.some((ov) => ov.variantId === ev.variantId)
        )
        .map((v) => ({
          unitId: v.unitId,
          value: v.value,
          price: v.price,
          initStock: v.initStock,
        }));
      productVariantsToSend.push(...newVariants);

      const changedVariants = editedVariants
        .filter((ev) =>
          originalVariants.some((ov) => ov.variantId === ev.variantId)
        )
        .map((ev) => {
          const originalVariant = originalVariants.find(
            (ov) => ov.variantId === ev.variantId
          );
          const hasChanges = ["unitId", "value", "price", "initStock"].some(
            (field) => ev[field] !== originalVariant[field]
          );
          return hasChanges
            ? {
                variantId: ev.variantId,
                unitId: ev.unitId,
                value: ev.value,
                price: ev.price,
                initStock: ev.initStock,
              }
            : null;
        })
        .filter((v) => v !== null);
      productVariantsToSend.push(...changedVariants);

      if (productVariantsToSend.length > 0) {
        updatedData.productVariants = productVariantsToSend;
      }
    }

    try {
      if (deletedVariants.length > 0) {
        for (const variantId of deletedVariants) {
          await productApi.deleteVariantProduct(productId, variantId);
        }
      }

      if (Object.keys(updatedData).length > 0) {
        console.log("Dataupdate================", updatedData);
        await productApi.updateProduct(productId, updatedData);
      }

      const response = await productApi.getProductById(productId);
      console.log("product================", response.data);
      onSave(response.data);
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Cập nhật sản phẩm thất bại!");
      onSave(product);
    }
  };

  const handleCancelProduct = () => {
    setDeletedVariants([]);
    onCancel();
  };

  const handleSetAccessProduct = async (productId, currentStatus) => {
    let newStatus;
    if (currentStatus === "PAUSE") {
      newStatus = "ENABLE";
    } else if (currentStatus === "ENABLE") {
      newStatus = "PAUSE";
    } else {
      console.warn("Cannot change status for: " + currentStatus);
      return;
    }

    try {
      const response = await productApi.setStatusProduct(productId, newStatus);
      onSave(response.data);
      console.log("Status updated:", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Cập nhật trạng thái thất bại!");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-md shadow-sm border border-gray-200">
      {/* Header Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mb-6">
        <button
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white ${
            product.status === "PAUSE"
              ? "bg-green-600 hover:bg-green-700"
              : product.status === "DISABLE"
              ? "bg-gray-400 cursor-not-allowed"
              : product.status === "BLOCK"
              ? "bg-red-400 cursor-not-allowed opacity-50"
              : "bg-red-600 hover:bg-red-700"
          }`}
          disabled={product.status === "BLOCK" || product.status === "DISABLE"}
          onClick={() =>
            handleSetAccessProduct(product.productId, product.status)
          }
        >
          {product.status === "PAUSE" ? (
            <PauseCircleIcon className="size-5" />
          ) : (
            <LockClosedIcon className="size-5" />
          )}
          <span>
            {product.status === "PAUSE"
              ? "Mở bán"
              : product.status === "DISABLE"
              ? "Đang chờ duyệt"
              : product.status === "BLOCK"
              ? "Đã khóa"
              : "Dừng bán"}
          </span>
        </button>
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleSaveProduct}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <IoIosSave className="size-5" />
            <span>Lưu</span>
          </button>
          <button
            onClick={handleCancelProduct}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            <XMarkIcon className="size-5" />
            <span>Hủy</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image and Categories */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Hình ảnh sản phẩm:
              </label>
              <img
                src={dataEdited.productImage || product.productImage}
                alt={dataEdited.productName || product.productName}
                className="w-full  object-contain rounded-md border border-gray-300"
              />
              <UploadImage className="w-full" />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-2/3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên sản phẩm:
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-0 focus:border-green-500"
                type="text"
                name="productName"
                value={dataEdited.productName || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nguồn gốc:
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-0 focus:border-green-500"
                type="text"
                name="productOrigin"
                value={dataEdited.productOrigin || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mô tả:
              </label>
              <textarea
                className="w-full min-h-[120px] sm:min-h-[230px] px-3 py-2 border border-gray-300 rounded-md focus:ring-0 focus:border-green-500 resize-y"
                name="productDesc"
                value={dataEdited.productDesc || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục sản phẩm:
              </label>
              <div className="min-h-40 overflow-y-auto border border-gray-300 rounded-md p-4">
                {categories.length === 0 ? (
                  <p className="text-gray-500 text-sm">Chưa có danh mục nào.</p>
                ) : (
                  categories.map((cat) => (
                    <div
                      key={cat.categoryId}
                      className="flex items-center space-x-2 py-1"
                    >
                      <input
                        type="checkbox"
                        checked={isCategoryChecked(cat.categoryId)}
                        onChange={() => handleCategoryToggle(cat.categoryId)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-gray-700">{cat.categoryName}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          
        </div>

        {/* Variants */}
        <div className="min-h-30">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Loại sản phẩm
            </label>
            <button
              type="button"
              onClick={() => setIsAddingVariantInline(true)}
              className={`${
                isAddingVariantInline ? "hidden" : ""
              } p-2 bg-gray-100 rounded-md hover:bg-gray-200`}
            >
              <PlusIcon className="size-5 text-gray-600" />
            </button>
          </div>

          {/* New Variant Form */}
          {isAddingVariantInline && (
            <div className="border border-gray-300 rounded-md p-4 mb-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    name="value"
                    value={newVariant.value}
                    onChange={handleNewVariantChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Số lượng"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Giá
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newVariant.price}
                    onChange={handleNewVariantChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Giá"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Đơn vị
                  </label>
                  <select
                    name="unitId"
                    value={newVariant.unitId}
                    onChange={handleNewVariantChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    disabled={units.length === 0}
                  >
                    <option value="">Chọn đơn vị</option>
                    {units.map((unit) => (
                      <option key={unit.unitId} value={unit.unitId}>
                        {unit.unitName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tồn kho
                  </label>
                  <input
                    type="number"
                    name="initStock"
                    value={newVariant.initStock}
                    onChange={handleNewVariantChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Tồn kho"
                  />
                </div>
              </div>
              {variantErrors && (
                <p className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
                  {variantErrors}
                </p>
              )}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Thêm
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingVariantInline(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}

          {/* Variant List */}
          <div className="min-h-30 overflow-y-auto border border-gray-300 rounded-md p-4">
            {(dataEdited.variants || []).length === 0 ? (
              <p className="text-gray-500 text-sm text-center">
                Chưa có loại sản phẩm nào được thêm.
              </p>
            ) : (
              dataEdited.variants.map((variant, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:grid sm:grid-cols-5 gap-4 py-4 border-b border-gray-200 last:border-b-0"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Số lượng
                    </label>
                    <input
                      type="number"
                      value={variant.value || ""}
                      onChange={(e) =>
                        handleVariantChange(
                          variant.variantId,
                          "value",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Giá
                    </label>
                    <input
                      type="number"
                      value={variant.price || ""}
                      onChange={(e) =>
                        handleVariantChange(
                          variant.variantId,
                          "price",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Đơn vị
                    </label>
                    <select
                      value={variant.unitId || ""}
                      onChange={(e) =>
                        handleVariantChange(
                          variant.variantId,
                          "unitId",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                      disabled={units.length === 0}
                    >
                      <option value="">Chọn đơn vị</option>
                      {units.map((unit) => (
                        <option key={unit.unitId} value={unit.unitId}>
                          {unit.unitName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tồn kho
                    </label>
                    <input
                      type="number"
                      value={variant.initStock || ""}
                      onChange={(e) =>
                        handleVariantChange(
                          variant.variantId,
                          "initStock",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => handleDeleteVariant(variant.variantId)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="size-5" />
                    </button>
                  </div>
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