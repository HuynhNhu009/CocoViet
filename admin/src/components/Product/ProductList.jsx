import React, { useEffect, useState } from "react";
import FilterProductByCategory from "./FilterProductByCategory";
import FilterProductByRetailer from "./FilterProductByRetailer";
import FilterProductByStatus from "./FilterProductByStatus";
import SearchBar from "./../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { 
  setActive, 
  setCategoryActive, 
  setPoductSearch, 
  setProductStatusActive, 
  setRetailerActive 
} from "../../redux/adminSlice";

const ProductList = () => {
  const productStore = useSelector((state) => state.AdminStore.productStore);
  const productSearch = useSelector((state) => state.AdminStore.productSearch);
  const categoryActive = useSelector((state) => state.AdminStore.categoryActive);
  const retailerActive = useSelector((state) => state.AdminStore.retailerActive);
  const productStatusActive = useSelector((state) => state.AdminStore.productStatusActive);
  
  const [products, setProducts] = useState([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productStore.length > 0) {
      const disabledProducts = productStore.filter((item) => item.status === "DISABLE");
      const otherProducts = productStore.filter((item) => item.status !== "DISABLE");
      const productCop = [...disabledProducts, ...otherProducts];
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
      const disabledProducts = filteredProducts.filter((item) => item.status === "DISABLE");
      const otherProducts = filteredProducts.filter((item) => item.status !== "DISABLE");
      const productCop = [...disabledProducts, ...otherProducts];
      setProducts(productCop);
    }
  }, [categoryActive, retailerActive, productStatusActive]);

  useEffect(() => {
    if (productSearch.length > 0) {
      setProducts(productSearch);
      dispatch(setCategoryActive("allProduct"));
      dispatch(setProductStatusActive("allProduct"));
      dispatch(setRetailerActive("allProduct"));
    }
  }, [productSearch]);

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  return (
    <div className="container mx-auto px-4 ">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <button 
          onClick={toggleFilterMenu}
          className="w-full bg-gray-200 p-2 rounded-md flex items-center justify-center"
        >
          {isFilterMenuOpen ? "Close Filters" : "Open Filters"}
        </button>
      </div>

      {/* Filter and Search Container */}
      <div className="relative">
        {/* Mobile Filters Slide Over */}
        <div className={`
          lg:hidden 
          fixed inset-x-0 top-0 z-50 bg-white transform transition-transform duration-300 ease-in-out
          ${isFilterMenuOpen ? 'translate-y-0' : '-translate-y-full'}
          shadow-lg p-4
        `}>
          <div className="flex flex-col space-y-4">
            <FilterProductByRetailer />
            <FilterProductByCategory />
            <FilterProductByStatus />
            <button 
              onClick={toggleFilterMenu}
              className="bg-gray-200 p-2 rounded-md"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Overlay for mobile filters */}
        {isFilterMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleFilterMenu}
          ></div>
        )}

        {/* Desktop Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Desktop Filters */}
          <div className="hidden lg:flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <FilterProductByRetailer />
            <FilterProductByCategory />
            <FilterProductByStatus />
          </div>

          {/* Search Bar */}
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
      </div>

      {/* Product List */}
      <div className="mt-6">
        <ProductItem products={products} />
      </div>
    </div>
  );
};

export default ProductList;