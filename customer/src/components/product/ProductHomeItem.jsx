import React from "react";

const ProductHomeItem = ({ product }) => {
  return (
    <div className="p-4 mb-5 w-[350px] h-[450px] cursor-pointer overflow-hidden flex flex-col">
      <img
        src={product.productImage}
        alt={product.productName || "Hình ảnh sản phẩm"}
        className="w-fit h-[250px] object-contain mb-2"
      />
      <div className="flex-1">
        <p className="text-xl text-black capitalize font-medium">
          {product.productName}
        </p>
        <p className="text-gray-600 truncate text-sm">
         {product.productDesc || "Chưa có"}
        </p>
        <p className="text-gray-600 text-sm truncate sm:block">
          Nguồn gốc: {product.productOrigin || "Chưa có"}
        </p>
      </div>
    </div>  
  );
};

export default ProductHomeItem;
