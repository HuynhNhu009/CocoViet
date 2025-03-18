import React, { useEffect, useState } from "react";
import FilterProductByCategory from "./FilterProductByCategory";
import FilterProductByRetailer from "./FilterProductByRetailer";
import FilterProductByStatus from "./FilterProductByStatus";
import SearchBar from "./../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { setActive, setPoductSearch } from "../../redux/adminSlice";
const ProductList = () => {
  const productStore = useSelector((state) => state.AdminStore.productStore);
  const productSearch = useSelector((state) => state.AdminStore.productSearch);
  const productStatus = useSelector((state) => state.AdminStore.productStatus);
  const productCategory = useSelector((state) => state.AdminStore.productCategory);
  const [products, setproducts] = useState([]);
  const dispatch = useDispatch();  

  useEffect(() => {
    if (productStore.length > 0) {
      setproducts(productStore);  
    }
  }, [productStore]);

  useEffect(() => {
    if (productSearch) {
      setproducts(productSearch);
    }
  }, [productSearch]);

  useEffect(() => {
    if (productStatus) {
      setproducts(productStatus);
    }

    console.log("run-------------");
    
  }, [productStatus]);
  
  useEffect(() => {
    if (productCategory) {
      setproducts(productCategory);
    }else{
      setproducts([]);
    }
  }, [productCategory]);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <FilterProductByCategory />
        <FilterProductByStatus />
        <FilterProductByRetailer />
        <div className="flex-1">
          <SearchBar 
            placeholder="Search for products..."
            dataList={productStore}
            parameter1={"productDesc"}
            parameter2={"productName"}
            dispatchFunction={(data) => dispatch(setPoductSearch(data))}
            setActive={(value) => dispatch(setActive(value))}
            navigateTo="/products"
          />
        </div>
      </div>

      <div className="mt-5">
        <ProductItem
          products={products}
         />
      </div>
    </>
  );
};

export default ProductList;
