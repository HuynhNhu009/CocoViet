import React, { useState } from "react";
import {
  PlusIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const CategoryManager = ({
  categories,
  onUpdateCategories,
  disabled = false,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAddCategory = () => {
    if (!newCategory || categories.includes(newCategory)) return;
    onUpdateCategories([...categories, newCategory]);
    setNewCategory("");
    setIsAdding(false);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setEditValue(category);
  };

  const handleSaveEdit = () => {
    if (
      !editValue ||
      categories.includes(editValue) ||
      editValue === editingCategory
    ) {
      setEditingCategory(null);
      return;
    }
    const updatedCategories = categories.map((cat) =>
      cat === editingCategory ? editValue : cat
    );
    onUpdateCategories(updatedCategories);
    setEditingCategory(null);
    setEditValue("");
  };

  const handleDeleteCategory = (category) => {
    onUpdateCategories(categories.filter((cat) => cat !== category));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">
          Quản lý danh mục
        </h3>
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="p-1 bg-gray-100 rounded-md hover:bg-gray-200"
          disabled={disabled}
          aria-label="Thêm danh mục mới"
        >
          <PlusIcon className="size-5 text-gray-600" />
        </button>
      </div>

      {isAdding && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Nhập danh mục mới"
            disabled={disabled}
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            disabled={disabled}
          >
            Thêm
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
            disabled={disabled}
          >
            <XMarkIcon className="size-5 text-gray-600" />
          </button>
        </div>
      )}

      <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
        {categories.length === 0 ? (
          <p className="text-gray-500 text-sm">Chưa có danh mục nào.</p>
        ) : (
          categories.map((cat) => (
            <div key={cat} className="flex items-center justify-between py-1">
              {editingCategory === cat ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    disabled={disabled}
                  />
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="p-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                    disabled={disabled}
                  >
                    Lưu
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingCategory(null)}
                    className="p-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    disabled={disabled}
                  >
                    <XMarkIcon className="size-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-700">{cat}</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleEditCategory(cat)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      disabled={disabled}
                    >
                      <PencilIcon className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat)}
                      className="p-1 text-red-600 hover:text-red-800"
                      disabled={disabled}
                    >
                      <TrashIcon className="size-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
