import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./Product/ProductItem";
import { setProductDetail } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";

const LatestCollection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productStore = useSelector(
    (state) => state.ProductStore.productStore || []
  );


  const handleNavigate = (productId) => {
      const findByProductId = productStore.find(
        (item) => item.productId === productId
      );
      navigate(`/product/${productId}`);
  
      if (findByProductId) {
        dispatch(setProductDetail({}));
        dispatch(setProductDetail(findByProductId));
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        console.log("Product not found!");
      }
    };
  return (
    <div className="h-150 sm:h-[830px] flex flex-col justify-evenly items-center text-4xl">
      <p className="font-bold text-5xl text-green-700 " >
      CÁC SẢN PHẨM MỚI
      </p>
      <div className=" productItem align-middle grid  sm:grid-cols-3 md:grid-cols-4 gap-6 m-0">
      {productStore.slice(-4).map((item) => ( 
            <div className="w-80"
              key={item.productId}
              onClick={() => handleNavigate(item.productId)}
            >
              <ProductItem
                productId={item.productId}
                productName={item.productName}
                retailerName={item.retailerName}
                variants={item.variants || []}
                productImage={item.productImage || []}
              />
            </div>
          ))}
        </div>
    </div>
  );
};

export default LatestCollection;
