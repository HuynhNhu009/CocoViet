import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { categoryAPI } from "../../services/categoryService";

const Category = () => {
  const categoryStore = useSelector((state) => state.AdminStore.categoryStore);
  const productStore = useSelector((state) => state.AdminStore.productStore);
  const [categories, setCategories] = useState([]);
  const [addCate, setAddCate] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    if (categoryStore) {
      setCategories(categoryStore);
    }
  }, [categoryStore]);

  // Đếm số lượng sản phẩm theo danh mục
  const selectedCategories = categories.map((category) => category.categoryName);
  const categoryCount = productStore.reduce((acc, item) => {
    item.categoryName.forEach((category) => {
      if (selectedCategories.includes(category)) {
        acc[category] = (acc[category] || 0) + 1;
      }
    });
    return acc;
  }, {});

  // Hiện/ẩn ô input thêm danh mục
  const toggleAddCategory = () => {
    setAddCate(!addCate);
    setNewCategory(""); // Xóa input khi ẩn
  };

  // Lưu danh mục mới vào danh sách
  const handleAddCategory = async() => {
    if (newCategory.trim() === "") return;

    console.log(newCategory);

    const duplicate =  selectedCategories.includes(newCategory);
    if(duplicate){
      Swal.fire({
        icon: "error",
        text: "Danh mục đã tồn tại!",
        showConfirmButton: false,
        timer: 1000,
      });
      
    }else{
      setCategories([...categories, { categoryName: newCategory }]);
      await categoryAPI.addCategory({ categoryName: newCategory });
      setNewCategory("");
      setAddCate(false);
    }
    
  };

  return (
    <>
      {/* Nút thêm danh mục */}
      <div
        className="border-2 mb-2 py-1 text-center rounded-2xl shadow-gray-300 shadow-md
      hover:bg-black hover:text-white cursor-pointer"
        onClick={toggleAddCategory}
      >
        <p>Thêm danh mục +</p>
      </div>

      {/* Ô nhập danh mục mới */}
      {addCate && (
        <div className="mb-5">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border p-1 rounded mb-3 w-full"
            placeholder="Nhập danh mục mới"
          />
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

      {/* Bảng danh mục */}
      <table className="w-full border-collapse">
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
              <tr key={index} className="text-center">
                <td className="p-1">{index + 1}</td>
                <td className="p-1">{item.categoryName}</td>
                <td className="p-1">{categoryCount[item.categoryName] || 0}</td>
                <td className="p-1">
                  <button className="bg-red-500 text-white px-3 py-1 ml-2 rounded-md">
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Category;
