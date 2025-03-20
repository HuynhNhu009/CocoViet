import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetail } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";
import ProductHomeItem from "./product/ProductHomeItem";
import Title from "./ui/Title";

const LatestCollection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productStore = useSelector(
    (state) => state.ProductStore.productStore || []
  );

  console.log(productStore);

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
    <div className="relative flex flex-col items-center justify-center min-h-[500px] sm:min-h-[830px] bg-fixed px-4 sm:px-[5vw] lg:px-[7vw] py-5 sm:py-10">
      <div className="flex flex-col items-center gap-4 w-full">
        <Title
          text1={"Sản phẩm nổi bật"}
          
          color1={"text-green-600"}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-10 w-full px-15">
          {productStore.slice(0, 3).map((product) => (
            <ProductHomeItem
              key={product.productId}
              product={product}
              onClick={() => handleNavigate(product.productId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;