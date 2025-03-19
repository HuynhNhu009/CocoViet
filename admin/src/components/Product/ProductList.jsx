import React, { useEffect, useState } from "react";
import FilterProductByCategory from "./FilterProductByCategory";
import FilterProductByRetailer from "./FilterProductByRetailer";
import FilterProductByStatus from "./FilterProductByStatus";
import SearchBar from "./../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { setActive, setCategoryActive, setPoductSearch, setProductStatusActive, setRetailerActive } from "../../redux/adminSlice";
const ProductList = () => {
  const productStore = useSelector((state) => state.AdminStore.productStore);
  const productSearch = useSelector((state) => state.AdminStore.productSearch);
  // const productStatus = useSelector((state) => state.AdminStore.productStatus);
  // const productCategory = useSelector((state) => state.AdminStore.productCategory);

  const categoryActive = useSelector((state) => state.AdminStore.categoryActive);
  const retailerActive = useSelector((state) => state.AdminStore.retailerActive);
  const productStatusActive = useSelector((state) => state.AdminStore.productStatusActive);
  const [products, setproducts] = useState([]);
  const dispatch = useDispatch(); 

  useEffect(() => {
    if (productStore.length > 0) {
      setproducts(productStore);  
    }
  }, [productStore]);

  const applyFilters = (products) => {
    let filtered = [...products];

    if (categoryActive !== "allProduct") {
      filtered = filtered.filter((product) =>
        product.categoryName.includes(categoryActive)
      );
    } 

    if (productStatusActive !== "allProduct") {
      filtered = filtered.filter((product) => product.status === productStatusActive);
    }

    if (retailerActive !== "allProduct") {
      filtered = filtered.filter((product) => product.retailerName === retailerActive);
    }
    return filtered;
  };

  useEffect(() => {
    if (productStore.length > 0) {
      const filteredProducts = applyFilters(productStore);      
      setproducts(filteredProducts);
    }
  }, [productStore, categoryActive, retailerActive, productStatusActive]);

  useEffect(() => {
    if (productSearch) {
      setproducts(productSearch);
      dispatch(setCategoryActive("allProduct"));
      dispatch(setProductStatusActive("allProduct"));
      dispatch(setRetailerActive("allProduct"));
    }
  }, [productSearch]);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <FilterProductByRetailer />
        <FilterProductByCategory />
        <FilterProductByStatus />
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
