import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ProductItem = ({
  productId,
  productName,
  retailerName,
  variants,
  productImage,
}) => {
  console.log(variants);
  const [price, setprice] = useState(0);

  useEffect(() => {
    if (variants.length > 0) {
      variants.map((variant) => setprice(variant.price));

      console.log(price);
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
      <ul className="shadow-md h-72 transition-opacity duration-700
       bg-[#77C27F] hover:bg-green-600 text-white rounded-2xl flex flex-col">
        <li className="h-48 w-full">
          <img
            src={productImage}
            alt={`Product ${productName}`}
            className="w-full h-full object-cover rounded-t-2xl"
          />
        </li>
        <div className="py-2 text-center mt-2">
        <li className="text-lg font-semibold truncate max-w-full px-2 overflow-hidden whitespace-nowrap text-ellipsis">
  {productName}
</li>
          <li className="font-light text-sm ">{price} VND</li>
          <li className="font-extralight text-xs mt-2 text-right pr-5">{retailerName}</li>
        </div>
      </ul>
    </motion.div>
  );
};

export default ProductItem;
