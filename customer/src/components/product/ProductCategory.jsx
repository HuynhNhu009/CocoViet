import { useEffect, useState } from "react";
import { productAPI } from "../../services/productService";
import { categoryAPI } from "../../services/categoryService";
import { useDispatch, useSelector } from "react-redux";
import { setProductCategory, setActive } from "../../redux/productSlice";

const ProductCategory = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const active = useSelector((state) => state.ProductStore.active);
  const categoryStore = useSelector((state) => state.ProductStore.category);
  const productStore = useSelector((state) => state.ProductStore.productStore);

  useEffect(() => {
    if (categoryStore) {
      setCategories(categoryStore);
    }
  }, [categoryStore]);

  const handleClickCategory = async (categoryName) => {
    try {
      dispatch(setActive(categoryName));
      if (productStore) {
        const findByCategoryId = productStore.filter((item) =>
          item.categoryName.includes(categoryName)
        );
        if (findByCategoryId) {
          dispatch(setProductCategory(findByCategoryId));
        } else {
          dispatch(setProductCategory([]));
        }
      }
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  return (
    <>
      {categories.map((item) => (
        <div
          key={item.categoryId}
          className={`rounded-sm mb-5 shadow-md cursor-pointer text-center py-2 transition-all duration-200 ${
            active === item.categoryId
              ? "bg-green-700 text-white font-bold" // active
              : "bg-[#77C27F] text-white hover:bg-green-600"
          }`}
          onClick={() => handleClickCategory(item.categoryName)}
        >
          <p className="py-1 w-45 text-center cursor-pointer">
            {item.categoryName}
          </p>
        </div>
      ))}
    </>
  );
};

export default ProductCategory;
