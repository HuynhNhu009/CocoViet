import React, { useState } from "react";
import {
  PlusIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { unitApi } from "../services/unitService";

const UnitManager = ({
  retailer,
  units = [],
  onUpdateUnits,
  disabled = false,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newUnitName, setNewUnitName] = useState("");
  const [editingUnit, setEditingUnit] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalError, setModalError] = useState(false);

  console.log("Units received in UnitManager:", units);

  const validateUnit = (unitName, currentUnit = null) => {
    const trimmedValue = unitName.trim();
    if (!trimmedValue) {
      setError("Đơn vị không được để trống.");
      return false;
    }
    const isDuplicate = units.some(
      (u) =>
        u.unitName.toLowerCase() === trimmedValue.toLowerCase() &&
        (!currentUnit || u.unitId !== currentUnit.unitId)
    );
    if (isDuplicate) {
      setError("Đơn vị đã tồn tại (không phân biệt chữ hoa/thường).");
      return false;
    }
    return true;
  };

  const handleAddUnit = async () => {
    if (!validateUnit(newUnitName)) return;

    setIsLoading(true);
    setModalMessage("Đang thêm đơn vị...");
    setModalError(false); // Reset trạng thái lỗi
    const trimmedUnitName = newUnitName.trim();
    try {
      await unitApi.addUnit(retailer.retailerId, { unitName: trimmedUnitName });
      setModalMessage("Thêm đơn vị thành công!");
      setModalError(false);
      onUpdateUnits();
      setNewUnitName("");
      setIsAdding(false);
      setError("");
    } catch (error) {
      console.error("Lỗi khi thêm đơn vị qua API:", error);
      setModalMessage("Không thể thêm đơn vị. Vui lòng thử lại.");
      setModalError(true);
    } finally {
      setTimeout(() => setIsLoading(false), 2000); 
    }
  };

  const handleEditUnit = (unit) => {
    setEditingUnit(unit);
    setEditValue(unit.unitName);
    setError("");
  };

  const handleSaveEdit = async () => {
    if (!validateUnit(editValue, editingUnit)) return;

    setIsLoading(true);
    setModalMessage("Đang cập nhật đơn vị...");
    setModalError(false);
    const trimmedUnitName = editValue.trim();
    try {
      await unitApi.updateUnit(editingUnit.unitId, {
        unitName: trimmedUnitName,
      });
      setModalMessage("Cập nhật đơn vị thành công!");
      setModalError(false);
      onUpdateUnits();
      setEditingUnit(null);
      setEditValue("");
      setError("");
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn vị qua API:", error);
      setModalMessage("Không thể cập nhật đơn vị. Vui lòng thử lại.");
      setModalError(true);
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const handleDeleteUnit = async (unit) => {
    setIsLoading(true);
    setModalMessage("Đang xóa đơn vị...");
    setModalError(false);
    try {
      const response = await unitApi.deleteUnit(unit.unitId);
      console.log("unit dele", response.data)
      if (response.data === "Product exist") {
        throw new Error("Product exist");
      }
      setModalMessage("Xóa đơn vị thành công!");
      setModalError(false);
      onUpdateUnits();
    } catch (error) {
      // console.error("Lỗi khi xóa đơn vị qua API:", error);
      setModalMessage(
        error.message === "Product exist"
          ? "Không thể xóa đơn vị vì đang được sử dụng trong sản phẩm."
          : "Không thể xóa đơn vị. Vui lòng thử lại."
      );
      setModalError(true);
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") {
      action();
    }
  };

  return (
    <div className="min-h-[75vh] space-y-4 relative">
      {/* Modal */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-400/80">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <svg
              className="animate-spin h-12 w-12 text-green-600"
              viewBox="0 0 32 32"
            >
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                className="opacity-25"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="44 88"
                strokeDashoffset="0"
                fill="none"
                className="opacity-75"
              />
            </svg>
            <p
              className={`text-lg ${
                modalError ? "text-red-600" : "text-gray-800"
              }`}
            >
              {modalMessage}
            </p>
            {modalError && (
              <button
                onClick={() => setIsLoading(false)}
                className="mt-2 px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Đóng
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tiêu đề và nút Thêm */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Quản lý đơn vị</h3>
        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={disabled || isLoading}
            aria-label="Thêm đơn vị mới"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="text-sm">Thêm</span>
          </button>
        )}
      </div>

      {/* Form thêm đơn vị */}
      {isAdding && (
        <div className="flex flex-col gap-2 bg-gray-50 p-3 rounded-md shadow-sm">
          <input
            type="text"
            value={newUnitName}
            onChange={(e) => setNewUnitName(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, handleAddUnit)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-200"
            placeholder="Nhập đơn vị mới (VD: kg, lít)"
            disabled={disabled || isLoading}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddUnit}
              className="flex-1 p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={disabled || isLoading}
            >
              Thêm
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setNewUnitName("");
                setError("");
              }}
              className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={disabled || isLoading}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      )}

      {/* Danh sách đơn vị */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 min-h-10 max-h-64 overflow-y-auto">
        {!units.length ? (
          <p className="text-gray-500 text-sm text-center py-2">
            Chưa có đơn vị nào.
          </p>
        ) : (
          <ul className="space-y-2">
            {units.map((unit) => (
              <li
                key={unit.unitId}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                {editingUnit?.unitId === unit.unitId ? (
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, handleSaveEdit)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-200"
                      disabled={disabled || isLoading}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="p-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={disabled || isLoading}
                    >
                      Lưu
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingUnit(null);
                        setError("");
                      }}
                      className="p-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={disabled || isLoading}
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-gray-700 truncate flex-1">
                      {unit.unitName}
                    </span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => handleEditUnit(unit)}
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
                        disabled={disabled || isLoading}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUnit(unit)}
                        className="p-1 text-red-600 hover:text-red-800 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
                        disabled={disabled || isLoading}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
        {error && editingUnit && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default UnitManager;