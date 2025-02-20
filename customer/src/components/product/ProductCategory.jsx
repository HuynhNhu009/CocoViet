import { useEffect, useState } from "react";
import Search from "../Search";
import { productAPI } from "../../services/productService";
import { categoryAPI } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setProductStore } from "../../redux/productSlice";
const ProductCategory = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategogies] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await categoryAPI.getAllCategories();

                if (categoriesResponse) setCategogies(categoriesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleClickCategory = async (categoryId) => {
        try {
            const findByCategoryId = await productAPI.getByCategoryId(categoryId);
            dispatch(setProductStore([]));
            //imidiately 
            dispatch(setProductStore(findByCategoryId.data));
            setProducts(findByCategoryId.data);

        } catch (error) {
            console.error("Error fetching products by category:", error);
            setProducts([]);
        }
    };
    console.log("getPro", products);

    return (
        <>
            {categories.map((item, index) => (
                <div
                    key={item.categoryId}
                    className="bg-[#77C27F] text-white rounded-sm shadow-md  "
                    onClick={() => handleClickCategory(item.categoryId)}
                >
                    <p className="py-2 w-45 text-center cursor-pointer">
                        {item.categoryName}
                    </p>
                </div>
            ))}
        </>
    );
};

export default ProductCategory;
