import { useEffect, useState } from "react";
import { productAPI } from "../../services/productService";
import { categoryAPI } from "../../services/categoryService";
import { useDispatch, useSelector } from "react-redux";
import { setProductCategory, setActive } from "../../redux/productSlice";

const ProductCategory = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const active = useSelector((state) => state.ProductStore.active);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await categoryAPI.getAllCategories();
                if (categoriesResponse) setCategories(categoriesResponse.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchData();
    }, []);

    const handleClickCategory = async (categoryId) => {
        try {
            dispatch(setActive(categoryId)); //activeactive
            const findByCategoryId = await productAPI.getByCategoryId(categoryId);
            dispatch(setProductCategory([]));
            dispatch(setProductCategory(findByCategoryId.data));
            setProducts(findByCategoryId.data);
        } catch (error) {
            console.error("Error fetching products by category:", error);
            setProducts([]);
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
                    onClick={() => handleClickCategory(item.categoryId)}
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
