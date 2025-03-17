import Swal from "sweetalert2";
import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Status = () => {
    const statusStore = useSelector((state) => state.AdminStore.statusStore);
    const orderStore = useSelector((state) => state.AdminStore.orderStore);
    const [categories, setCategories] = useState([]);
    const [addCate, setAddCate] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (statusStore) {
        setCategories(statusStore);
      }
    }, [statusStore]);
  
    const selectedCategories = categories.map(
      (category) => category.categoryName
    );
    // const categoryCount = productStore.reduce((acc, item) => {
    //   item.categoryName.forEach((category) => {
    //     if (selectedCategories.includes(category)) {
    //       acc[category] = (acc[category] || 0) + 1;
    //     }
    //   });
    //   return acc;
    // }, {});
  
    // const toggleAddCategory = () => {
    //   setAddCate(!addCate);
    //   setNewCategory("");
    // };
  
    // const handleAddCategory = async () => {
    //   if (!newCategory.trim()) {
    //     setError("Tên danh mục không được để trống.");
    //   } else if (newCategory.length < 6 || newCategory.length > 50) {
    //     setError("Tên danh mục phải từ 6 đến 50 ký tự.");
    //   } else {
    //     const duplicate = selectedCategories.includes(newCategory);
    //     if (duplicate) {
    //       Swal.fire({
    //         icon: "error",
    //         text: "Danh mục đã tồn tại!",
    //         showConfirmButton: false,
    //         timer: 1000,
    //       });
    //     } else {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Thêm danh mục thành công!",
    //         showConfirmButton: false,
    //         timer: 1000,
    //       });
    //       setCategories([...categories, { categoryName: newCategory }]);
    //       await categoryAPI.addCategory({ categoryName: newCategory });
    //       setNewCategory("");
    //       setAddCate(false);
    //     }
    //   }
    // };
  
    // const deleteCategory = async (categoryId, categoryName) => {
    //   if (categoryCount[categoryName] > 0) {
    //     Swal.fire({
    //       icon: "error",
    //       text: "Vui lòng chuyển sản phẩm ra khỏi danh mục này trước khi xóa!",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   } else {
    //     await categoryAPI.deleteCategoryById(categoryId);
    //     await dispatch(setUpdate(true));
    //     window.location.reload();
    //   }
    // };
  

  return (
    <>
      <div
        className="border-2 mb-2 py-1 text-center rounded-2xl shadow-gray-300 shadow-md
      hover:bg-black hover:text-white cursor-pointer"
        // onClick={toggleAddCategory}
      >
        <p>Thêm danh mục +</p>
      </div>

      {/* {addCate && ( */}
        <div className="mb-5">
          <input
            type="text"
            // value={newCategory}
            // onChange={(e) => setNewCategory(e.target.value)}
            className="border p-1 rounded mb-3 w-full"
            placeholder="Nhập danh mục mới"
          />
          {/* {error && <p className="text-red-500">{error}</p>} */}
          <div className="flex justify-center">
            <button
              className="bg-green-500 text-white px-3 py-1 mx-1 rounded-md"
            //   onClick={handleAddCategory}
            >
              Thêm
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 mx-1 rounded-md"
            //   onClick={toggleAddCategory}
            >
              Hủy
            </button>
          </div>
        </div>
      {/* )} */}

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
          {/* {categories.length > 0 ? (
            categories.map((item, index) => ( */}
              {/* <tr key={index} className="text-center">
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
              </tr> */}
            {/* ))
          ) : ( */}
            <tr>
              <td colSpan={4} className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          {/* )} */}
        </tbody>
      </table>
    </>
  );
};

export default Status;