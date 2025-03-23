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
  const categoryActive = useSelector((state) => state.AdminStore.categoryActive);
  const retailerActive = useSelector((state) => state.AdminStore.retailerActive);
  const productStatusActive = useSelector((state) => state.AdminStore.productStatusActive);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productStore.length > 0) {
      const disabledProducts = productStore.filter((item) => item.status === "DISABLE");
      const otherProducts = productStore.filter((item) => item.status !== "DISABLE");
      const productCop = [...otherProducts, ...disabledProducts]; // Reversed order for UX
      setProducts(productCop);
    }
  }, [productStore]);

  const applyFilters = (products) => {
    let filtered = [...products];

    if (categoryActive !== "allProduct") {
      filtered = filtered.filter((product) => product.categoryName.includes(categoryActive));
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
      setProducts(filteredProducts);
    }
  }, [categoryActive, retailerActive, productStatusActive]);

  useEffect(() => {
    if (productSearch) {
      setProducts(productSearch);
      dispatch(setCategoryActive("allProduct"));
      dispatch(setProductStatusActive("allProduct"));
      dispatch(setRetailerActive("allProduct"));
    }
  }, [productSearch]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <FilterProductByRetailer />
          <FilterProductByCategory />
          <FilterProductByStatus />
        </div>
        <div className="w-full md:flex-1">
          <SearchBar
            placeholder="Search for products..."
            dataList={productStore}
            parameter1={"productDesc"}
            parameter2={"productName"}
            dispatchFunction={(data) => dispatch(setPoductSearch(data))}
            setActive={(value) => dispatch(setActive(value))}
            navigateTo="/products"
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-6">
        <ProductItem products={products} />
      </div>
    </div>
  );
};

export default ProductList;