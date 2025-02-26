import React, { useState } from "react";
import {
  PlusIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { unitApi } from "../services/unitService";

const UnitManager = ({ units = [], onUpdateUnits, disabled = false }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newUnitName, setNewUnitName] = useState("");
  const [editingUnit, setEditingUnit] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState("");

  console.log("Units received in UnitManager:", units);

  const validateUnit = (unitName, currentUnit = null) => {
    const trimmedValue = unitName.trim();
    if (!trimmedValue) {
      setError("Đơn vị không được để trống.");
      return false;
    }
    const isDuplicate = units.some(
      (u) =>
        u.unitName === trimmedValue &&
        (!currentUnit || u.unitId !== currentUnit.unitId)
    );
    if (isDuplicate) {
      setError("Đơn vị đã tồn tại.");
      return false;
    }
    return true;
  };

  const handleAddUnit = async () => {
    if (!validateUnit(newUnitName)) return;

    const trimmedUnitName = newUnitName.trim();
    try {
      await unitApi.addUnit({ unitName: trimmedUnitName });
      console.log("Unit added successfully via API");
      onUpdateUnits();
      setNewUnitName("");
      setIsAdding(false);
      setError("");
    } catch (error) {
      console.error("Lỗi khi thêm đơn vị qua API:", error);
      setError("Không thể thêm đơn vị. Vui lòng thử lại.");
    }
  };

  const handleEditUnit = (unit) => {
    setEditingUnit(unit);
    setEditValue(unit.unitName);
    setError("");
  };

  const handleSaveEdit = async () => {
    if (!validateUnit(editValue, editingUnit)) return;

    const trimmedUnitName = editValue.trim();
    try {
      // Gửi PATCH request để cập nhật đơn vị
      const reponse = await unitApi.updateUnit(editingUnit.unitId, {
        unitName: trimmedUnitName,
      });
      console.log("Unit updated successfully via API");

      // Gửi tín hiệu để Dashboard làm mới danh sách
      onUpdateUnits();

      setEditingUnit(null);
      setEditValue("");
      setError("");
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn vị qua API:", error);
      setError("Không thể cập nhật đơn vị. Vui lòng thử lại.");
    }
  };

  const handleDeleteUnit = async (unit) => {
    try {
      await unitApi.deleteUnit(unit.unitId);
      console.log("Unit deleted successfully via API");
      onUpdateUnits();
    } catch (error) {
      console.error("Lỗi khi xóa đơn vị qua API:", error);
      setError("Không thể xóa đơn vị. Vui lòng thử lại.");
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") {
      action();
    }
  };

  return (
    <div className="space-y-4">
      {/* Tiêu đề */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Quản lý đơn vị</h3>
        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={disabled}
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
            disabled={disabled}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddUnit}
              className="flex-1 p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={disabled}
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
              className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={disabled}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      )}

      {/* Danh sách đơn vị */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 max-h-60 overflow-y-auto">
        {!units || units.length === 0 ? (
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
                      disabled={disabled}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="p-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={disabled}
                    >
                      Lưu
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingUnit(null);
                        setError("");
                      }}
                      className="p-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={disabled}
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
                        disabled={disabled}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUnit(unit)}
                        className="p-1 text-red-600 hover:text-red-800 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
                        disabled={disabled}
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
