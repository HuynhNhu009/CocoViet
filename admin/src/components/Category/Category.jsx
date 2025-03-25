import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { categoryAPI } from "../../services/categoryService";
import { setUpdate } from "../../redux/adminSlice";

const Category = () => {
  const categoryStore = useSelector((state) => state.AdminStore.categoryStore);
  const productStore = useSelector((state) => state.AdminStore.productStore);
  const [categories, setCategories] = useState([]);
  const [addCate, setAddCate] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryStore) {
      setCategories(categoryStore);
    }
  }, [categoryStore]);

  const selectedCategories = categories.map(
    (category) => category.categoryName
  );
  const categoryCount = productStore.reduce((acc, item) => {
    item.categoryName.forEach((category) => {
      if (selectedCategories.includes(category)) {
        acc[category] = (acc[category] || 0) + 1;
      }
    });
    return acc;
  }, {});

  const toggleAddCategory = () => {
    setAddCate(!addCate);
    setNewCategory("");
    setError("");
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      setError("Tên danh mục không được để trống.");
    } else if (newCategory.length < 6 || newCategory.length > 50) {
      setError("Tên danh mục phải từ 6 đến 50 ký tự.");
    } else {
      const duplicate = selectedCategories.includes(newCategory);
      if (duplicate) {
        Swal.fire({
          icon: "error",
          text: "Danh mục đã tồn tại!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thêm danh mục thành công!",
          showConfirmButton: false,
          timer: 1000,
        });
        setCategories([...categories, { categoryName: newCategory }]);
        await categoryAPI.addCategory({ categoryName: newCategory });
        setNewCategory("");
        setAddCate(false);
      }
    }
  };

  const deleteCategory = async (categoryId, categoryName) => {
    if (categoryCount[categoryName] > 0) {
      Swal.fire({
        icon: "error",
        text: "Vui lòng chuyển sản phẩm ra khỏi danh mục này trước khi xóa!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await categoryAPI.deleteCategoryById(categoryId);
      await dispatch(setUpdate(true));
      window.location.reload();
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div 
        className="border-2 mb-2 py-1 text-center rounded-2xl shadow-gray-300 shadow-md
        hover:bg-black hover:text-white cursor-pointer"
        onClick={toggleAddCategory}
      >
        <p>Thêm danh mục +</p>
      </div>

      {addCate && (
        <div className="mb-5">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => {
              setNewCategory(e.target.value);
              setError("");
            }}
            className="border p-1 rounded mb-3 w-full"
            placeholder="Nhập danh mục mới"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="flex justify-center">
            <button
              className="bg-green-500 text-white px-3 py-1 mx-1 rounded-md"
              onClick={handleAddCategory}
            >
              Thêm
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 mx-1 rounded-md"
              onClick={toggleAddCategory}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Mobile/Tablet View */}
      <div className="block md:hidden">
        {categories.length > 0 ? (
          categories.map((item, index) => (
            <div 
              key={item.categoryId || index} 
              className="bg-white shadow-md rounded-lg mb-4 p-4 border"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm">#{index + 1}</span>
                <button 
                  onClick={() => deleteCategory(item.categoryId, item.categoryName)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-xs"
                >
                  Xóa
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Tên danh mục</p>
                  <p className="font-semibold">{item.categoryName}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Số sản phẩm</p>
                  <p>{categoryCount[item.categoryName] || 0}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 p-4">
            Không có danh mục nào.
          </div>
        )}
      </div>

      {/* Desktop View */}
      <table 
        className="w-full border-collapse hidden md:table"
      >
        <thead>
          <tr className="text-center bg-black text-white uppercase">
            <th className="p-3 text-sm">STT</th>
            <th className="p-3 text-sm">Tên danh mục</th>
            <th className="p-3 text-sm">Số sản phẩm</th>
            <th className="p-3 text-sm">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((item, index) => (
              <tr 
                key={item.categoryId || index} 
                className="text-center hover:bg-gray-100"
              >
                <td className="p-1">{index + 1}</td>
                <td className="p-1">{item.categoryName}</td>
                <td className="p-1">{categoryCount[item.categoryName] || 0}</td>
                <td className="p-1">
                  <button
                    onClick={() =>
                      deleteCategory(item.categoryId, item.categoryName)
                    }
                    className="bg-red-500 text-white px-3 py-1 ml-2 rounded-md"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 p-3">
                Không có danh mục nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Category;