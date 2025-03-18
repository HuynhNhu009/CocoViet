import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import ProductItem from "./Product/ProductItem";
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
    <div
      className="relative h-150 sm:h-[830px] flex justify-center items-center bg-fixed"
      // style={{ backgroundImage: `url(${assets.coconutField})` }}
    >
    
      <div className="relative flex flex-col items-center gap-4">
        <Title text1={"Sản phẩm nổi bậc"} color1={"text-green-600"} className="text-3xl sm:text-4xl  lg:text-6xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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

    // <div className="px-50 h-150 sm:h-[830px] relative flex flex-col items-center gap-4">
    //   <Title text1={"Sản phẩm nổi bậc"} color1={"text-black"} />
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    //     {productStore.slice(0,3).map((product) => (
    //       <ProductHomeItem
    //         key={product.productId}
    //         product={product}
    //         onClick={() => handleNavigate(product.productId)}
    //       />
    //     ))}
    //   </div>
    // </div>
  );
};

export default LatestCollection;
