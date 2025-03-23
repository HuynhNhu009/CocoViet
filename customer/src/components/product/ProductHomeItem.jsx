import React from "react";
import { useNavigate } from "react-router-dom";

const ProductHomeItem = ({ product }) => {
  const navigator = useNavigate();
  return (
    <div
      className="mb-5 gap-4 sm:max-w-[350px] h-[450px] cursor-pointer overflow-hidden shadow flex flex-col group box-border hover:outline-1 hover:outline-green-200"
      onClick={() => navigator(`/products/${product.productId}`)}
    >
      <div className="bg-amber-300 w-full max-h-[250px] sm:w-[350px] overflow-hidden">
        <img
          src={product.productImage}
          alt={product.productName || "Hình ảnh sản phẩm"}
          className="w-full h-[250px] object-cover group-hover:scale-110 duration-300 transition-all"
        />
      </div>
      <div className="flex-1 px-2">
        <div className="py-2">
          <p className="text-xl text-black line-clamp-2 capitalize font-medium group-hover:text-green-600">
            {product.productName}
          </p>
        </div>
        <div className="h-16 sm:h-20">
          <p className="text-gray-600 line-clamp-4 text-xs sm:text-sm">
            {product.productDesc || "Chưa có"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductHomeItem;