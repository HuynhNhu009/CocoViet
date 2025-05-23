import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ProductItem = ({
  productId,
  productName,
  retailerName,
  variants,
  productImage,
}) => {
  const [price, setprice] = useState(0);

  useEffect(() => {
    if (variants.length > 0) {
      variants.map((variant) => setprice(variant.price));
    }
  }, [variants]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="cursor-pointer"
    >
      <div className="shadow mb-5 rounded-md cursor-pointer transition-transform duration-300 hover:scale-105">
        <ul
          className="h-72 transition-opacity duration-700
        text-black flex flex-col bg-gray-50 hover:border-green-500 hover:border-1 group"
        >
          <li className="h-48 w-full">
            <img
              src={productImage}
              alt={`Product ${productName}`}
              className="w-full h-full object-cover"
            />
          </li>
          <div className="p-2 h-25">
            <p className="h-10 sm:text-sm text-sm font-semibold max-w-full line-clamp-2 group-hover:text-green-600">
              {productName}
            </p>
            <p className="font-light h-5 text-sm mt-2">
              ₫{new Intl.NumberFormat("vi-VN").format(price)}
            </p>
            <p className="font-medium text-green-600 text-xs h-4 text-right pr-2">
              {retailerName}
            </p>
          </div>
        </ul>
      </div>
    </motion.div>
  );
};

export default ProductItem;
