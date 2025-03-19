import React from "react";

const ProductHomeItem = ({ product }) => {
  return (
    <div className="p-4 mb-5 w-[350px] h-[450px] cursor-pointer overflow-hidden flex flex-col">
      <div className="bg-amber-300 w-[350px]">
      <img
        src={product.productImage}
        alt={product.productName || "Hình ảnh sản phẩm"}
        className="w-full h-[250px] object-cover "
      />
      </div>
      <div className="flex-1">
        <div className="h-20">
          <p className="text-xl text-black line-clamp-2 capitalize font-medium">
            {product.productName}
          </p>
        </div>
        <div className="h-20">

        <p className="text-gray-600 line-clamp-4 text-sm">
          {product.productDesc || "Chưa có"}
        </p>
        </div>

        
        {/* <p className="text-gray-600 text-sm truncate sm:block">
          Nguồn gốc: {product.productOrigin || "Chưa có"}
        </p> */}
      </div>
    </div>
  );
};

export default ProductHomeItem;
