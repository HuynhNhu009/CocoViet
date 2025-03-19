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
      {/* bg-[#77C27F]  */}
      <ul className="h-72 transition-opacity duration-700
        text-white flex flex-col ">
        <li className="h-48 w-full">
          <img
            src={productImage}
            alt={`Product ${productName}`}
            className="w-full h-full object-cover"
          />
        </li>
        <div className="py-2 h-10">
          <li className="text-sm sm:text-base font-semibold max-w-full px-2 line-clamp-2">
            {productName}
          </li>
          <li className="font-light text-sm ">₫{(new Intl.NumberFormat("vi-VN").format(price))}</li>
          <li className="font-extralight text-xs mt-2 text-right pr-5">{retailerName}</li>
        </div>
      </ul>
    </motion.div>
  );
};

export default ProductItem;
