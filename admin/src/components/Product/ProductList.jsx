import React, { useEffect, useState } from "react";
import Category from "./Category";
import SearchBar from "./../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const productStore = useSelector((state) => state.AdminStore.productStore);
  const [products, setproducts] = useState([]);
  console.log("productstore", productStore);

  useEffect(() => {
    if (productStore.length > 0) {
      setproducts(productStore);
    }
  }, [productStore]);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Category />
        <div className="flex-1 mr-3">
          <SearchBar />
        </div>
      </div>

      <div className="mt-5 mx-3">
        <ProductItem
          products={products}
         />
      </div>
    </>
  );
};

export default ProductList;
