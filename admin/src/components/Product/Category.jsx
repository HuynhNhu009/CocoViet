import { useEffect, useState } from "react";
import { productAPI } from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { setcategory, setCategoryActive } from "../../redux/adminSlice";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const categoryActive = useSelector(
    (state) => state.AdminStore.categoryActive
  );
  const categoryStore = useSelector((state) => state.AdminStore.categoryStore);

  useEffect(() => {
    if (categoryStore) {
      setCategories(categoryStore);
    }
  }, [categoryStore]);

  const handleClickCategory = async (categoryId) => {
    try {
      dispatch(setCategoryActive(categoryId));
      const findByCategoryId = await productAPI.getByCategoryId(categoryId);
      dispatch(setcategory([]));
      dispatch(setcategory(findByCategoryId.data));
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  return (
    <div className="ml-5 flex items-center gap-4">
      <select
        className="bg-white border-2  rounded-sm px-1 py-1.5 shadow-md text-gray-700"
        value={categoryActive || ""}
        onChange={(e) => handleClickCategory(e.target.value)}
      >
        <option value="" disabled>Chọn danh mục</option>
        {categories.map((item) => (
          <option key={item.categoryId} value={item.categoryId}>
            {item.categoryName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Category;
