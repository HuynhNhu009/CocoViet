import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllRoute from "./components/AllRoute";
import { setcategory } from "./redux/adminSlice";
import { categoryAPI } from "./services/categoryService";
import { productAPI } from "./services/productService";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await categoryAPI.getAllCategories();        
        if (categoriesResponse) {
           dispatch(setcategory(categoriesResponse.data));
        }        
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    const fetchProduct = async () => {
      const productList = await productAPI.getAllProducts();
    };
  
    fetchProduct();
  }, []);
  return <AllRoute />;
}

export default App;
