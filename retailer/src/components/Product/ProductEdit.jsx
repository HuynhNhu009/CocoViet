import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PlusIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { IoIosSave } from "react-icons/io";
import { productApi } from "../../services/productService";
import UploadImage from "../UpLoadImage";

const ProductEdit = ({ product, productId, onSave, onCancel }) => {
  const [dataEdited, setDataEdited] = useState({});
  const [variantErrors, setVariantErrors] = useState("");
  const [deletedVariants, setDeletedVariants] = useState([]);
  const [newVariant, setNewVariant] = useState({
    unitId: "",
    value: "",
    price: "",
    initStock: "",
  });

  // const productID = productId;
  // console.log(product.id, product.productName);
  const [isAddingVariantInline, setIsAddingVariantInline] = useState(false);

  const categories = useSelector((state) => state.RetailerStore.category);
  const units = useSelector((state) => state.RetailerStore.units);

  // Hàm xử lý khi giá trị input/textarea thay đổi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataEdited((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý khi giá trị của một variant thay đổi
  const handleVariantChange = (variantId, field, value) => {
    setDataEdited((prev) => {
      const currentVariants = prev.variants || product.variants || [];
      const updatedVariants = currentVariants.map((variant) =>
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

    const variant = {
      unitId: newVariant.unitId,
      value: parseInt(newVariant.value),
      price: parseInt(newVariant.price),
      initStock: parseInt(newVariant.initStock),
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
    console.log("dele", variantId);
    // const response = await productApi.deleteVariantProduct(product.id, variantId);
    // console.log("Delel----edit", response.data);
    setDeletedVariants((prev) => [...prev, variantId]);
    setDataEdited((prev) => ({
      ...prev,
      variants: (prev.variants || product.variants || []).filter(
        (variant) => variant.variantId !== variantId
      ),
    }));

    console.log("Delll---edit", deletedVariants);
  };

  const handleCategoryToggle = (categoryId) => {
    setDataEdited((prev) => {
      const currentCategories = prev.categories || product.categories || [];
      const updatedCategories = currentCategories.some(
        (cat) => cat.categoryId === categoryId
      )
        ? currentCategories.filter((cat) => cat.categoryId !== categoryId)
        : [...currentCategories, { categoryId }];
      return { ...prev, categories: updatedCategories };
    });
  };

  const isCategoryChecked = (categoryId) => {
    const currentCategories = dataEdited.categories || product.categories || [];
    return currentCategories.some((cat) => cat.categoryId === categoryId);
  };

  const getDisplayValue = (field) => {
    return dataEdited[field] !== undefined
      ? dataEdited[field]
      : product[field] || "";
  };

  const getVariantDisplayValue = (variantId, field) => {
    const currentVariants = dataEdited.variants || product.variants || [];
    const variant = currentVariants.find((v) => v.variantId === variantId);
    return variant ? variant[field] || "" : "";
  };

  // Hàm xử lý lưu sản phẩm
  const handleSaveProduct = async (productId) => {
    const updatedData = {};
    // console.log("====product id", productId)

    // Chỉ gửi các trường được thay đổi
    ["productName", "productOrigin", "productDesc"].forEach((field) => {
      if (
        dataEdited[field] !== undefined &&
        dataEdited[field] !== product[field]
      ) {
        updatedData[field] = dataEdited[field];
      }
    });

    // Xử lý categoryId (chuyển từ mảng đối tượng thành mảng chuỗi)
    if (dataEdited.categories !== undefined) {
      const originalCategoryIds = (product.categories || []).map(
        (c) => c.categoryId
      );
      const updatedCategoryIds = (dataEdited.categories || []).map(
        (c) => c.categoryId
      );
      if (
        JSON.stringify(originalCategoryIds) !==
        JSON.stringify(updatedCategoryIds)
      ) {
        updatedData.categoryId = updatedCategoryIds; // Gửi mảng các chuỗi categoryId
      }
    }

    // Xử lý productVariants
    if (dataEdited.variants !== undefined) {
      const originalVariants = product.variants || [];
      const editedVariants = dataEdited.variants || [];

      // Tạo mảng productVariants gửi lên server (bao gồm cả mới và cũ được thay đổi)
      const productVariantsToSend = [];

      // Thêm các variants mới
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

      // Thêm các variants cũ được thay đổi
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

      // Nếu có productVariants cần gửi, thêm vào updatedData
      if (productVariantsToSend.length > 0) {
        updatedData.productVariants = productVariantsToSend;
      }
    }

    try {
      if (deletedVariants.length > 0) {
        console.log("Deleting variants:", deletedVariants);
        console.log("Product Id:", productId);
        
        for (const variantId of deletedVariants) {
          const response = await productApi.deleteVariantProduct(
            product.id,
            variantId
          );
          console.log("Deleted variant response:", response.data);
        }
      }
      // Nếu có dữ liệu thay đổi, gửi request lên server
      if (Object.keys(updatedData).length > 0) {
        console.log("Updated data:", JSON.stringify(updatedData, null, 2));
        const response = await productApi.updateProduct(
          productId,
          updatedData,
          null
        );
        console.log("Update response:", response);
        const responseProduct = await productApi.getProductById(
          productId,
        );
        onSave(responseProduct.data);
        // const updatedProduct = response.data;
      } else {
        console.log("No changes detected.");
        // onSave(product); // Thoát chế độ chỉnh sửa nếu không có thay đổi
      }
      
    } catch (error) {
      console.error("Error updating product:", error);
      onSave(product);
    }
  };

  const handleCancelProduct = () => {
    setDeletedVariants([]); // Clear deleted variants without processing
    onCancel();
  };

  return (
    <div className="px-6 py-2 bg-white rounded-md shadow-sm border border-gray-200">
      {/* Nút Lưu và Hủy */}
      <div className="flex justify-end space-x-2 mb-6">
        <button
          onClick={()=>handleSaveProduct(product.id)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <IoIosSave className="size-5" />
          <span>Lưu</span>
        </button>
        <button
          onClick={handleCancelProduct}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          <XMarkIcon className="size-5" />
          <span>Hủy</span>
        </button>
      </div>

      {/* Bố cục chính */}
      <div className="space-y-6">
        {/* Thông tin cơ bản */}
        <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-6">
          {/* Hình ảnh sản phẩm và Danh mục */}
          <div className="space-y-6">
            <div className="relative flex flex-col items-center mx-auto w-[50%] gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Hình ảnh sản phẩm:
              </label>
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-fit max-w-xs h-40 object-cover rounded-md border border-gray-300"
              />
              <UploadImage className={"w-full"} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục sản phẩm:
              </label>
              <div className="min-h-40 mr-4 overflow-y-auto border border-gray-300 rounded-md p-4">
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

          {/* Thông tin sản phẩm */}
          <div className="space-y-4 mr-6">
            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Tên sản phẩm:
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-0 focus:border-green-500 focus:outline-none"
                type="text"
                name="productName"
                value={getDisplayValue("productName")}
                onChange={handleInputChange}
              />
            </div>
            <div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mô tả:
              </label>
              <textarea
                className="w-full min-h-[230px] px-3 py-2 border border-gray-300 rounded-sm focus:ring-0 focus:border-green-500 focus:outline-none overflow-y-auto"
                name="productDesc"
                value={getDisplayValue("productDesc")}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Loại sản phẩm */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Thể loại
            </label>
            <button
              type="button"
              onClick={() => setIsAddingVariantInline(true)}
              className={`${
                isAddingVariantInline ? "hidden" : ""
              } p-2 bg-gray-100 rounded-md hover:bg-gray-200`}
              aria-label="Thêm biến thể mới"
            >
              <PlusIcon className="size-5 text-gray-600" />
            </button>
          </div>

          {/* Form thêm Loại mới */}
          {isAddingVariantInline && (
            <div className="border border-gray-300 rounded-md p-4 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    name="value"
                    value={newVariant.value}
                    onChange={handleNewVariantChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tồn kho"
                  />
                </div>
              </div>
              {variantErrors && (
                <p className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
                  {variantErrors}
                </p>
              )}
              <div className="flex justify-end space-x-2 mt-4">
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

          {/* Danh sách thể loại */}
          <div className="min-h-40 overflow-y-auto border border-gray-300 rounded-md p-4">
            {(dataEdited.variants || product.variants || []).length === 0 ? (
              <p className="text-gray-500 text-sm text-center">
                Chưa có thể loại nào được thêm.
              </p>
            ) : (
              (dataEdited.variants || product.variants || []).map(
                (variant, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center py-2 border-b border-gray-200 last:border-b-0"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Số lượng
                      </label>
                      <input
                        type="number"
                        value={getVariantDisplayValue(
                          variant.variantId,
                          "value"
                        )}
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
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Giá
                      </label>
                      <input
                        type="number"
                        value={getVariantDisplayValue(
                          variant.variantId,
                          "price"
                        )}
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
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Đơn vị
                      </label>
                      <select
                        value={getVariantDisplayValue(
                          variant.variantId,
                          "unitId"
                        )}
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
                        {/* <option value>Chọn đơn vị</option> */}
                        <option
                          value={getVariantDisplayValue(
                            variant.unitId,
                            "unitId"
                          )}
                        >
                          {variant.unitName}
                        </option>
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
                        value={getVariantDisplayValue(
                          variant.variantId,
                          "initStock"
                        )}
                        onChange={(e) =>
                          handleVariantChange(
                            variant.variantId,
                            "initStock",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Tồn kho"
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
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
