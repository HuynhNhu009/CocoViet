import React from "react";

const ProductHomeItem = ({ product }) => {
  return (
    <div className="p-2 sm:p-4 mb-5 w-full sm:w-[350px] h-auto sm:h-[450px] cursor-pointer overflow-hidden flex sm:flex-col flex-row">
      <img
        src={product.productImage}
        alt={product.productName || "Hình ảnh sản phẩm"}
        className="w-50 sm:w-full h-[150px] sm:h-[250px] object-fit sm:object-cover mb-2 sm:mb-4"
      />
      <div className="flex-1 flex flex-col pl-2 sm:pl-0">
        <div className="h-20 sm:h-18">
          <p className="text-base sm:text-xl text-black line-clamp-3 sm:line-clamp-2 capitalize text-justify font-medium">
            {product.productName}
          </p>
        </div>
        <div className="h-16 sm:h-20">
          <p className="text-gray-600 line-clamp-4 text-justify text-xs sm:text-sm">
            {product.productDesc || "Chưa có"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductHomeItem;
