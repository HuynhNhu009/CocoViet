import { motion } from "framer-motion";

const ProductItem = ({ productId, productName, retailerName, variants }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="cursor-pointer"
    >
      <ul className="shadow-md transition-opacity duration-700 bg-[#77C27F] hover:bg-green-600 text-white rounded-2xl flex flex-col">
        <li>
          <img
            src="https://th.bing.com/th/id/R.21f948ddaf5ceb8af38722b6525f9576?rik=QXJDXfWA6c5bfw&riu=http%3a%2f%2fimua.com.vn%2fimages%2fAlbum%2fTrai-dua-tuoi-75.jpg&ehk=J0LhHGVtSH9w9QxAw%2fhxbidliOyBUiI6qjp8i2YcWJQ%3d&risl=&pid=ImgRaw&r=0"
            alt={`Product ${productName}`}
            className="w-full object-cover rounded-t-2xl"
          />
        </li>
        <div className="py-2 text-center">
          <li className="text-lg font-semibold">{productName}</li>
          {variants > 0 && 
            variants.map((variant, vIndex) => (
              <li key={vIndex} className="font-light text-sm">
                {variant.price} VND
              </li>
            ))}
          <li className="font-extralight text-xs">{retailerName}</li>
        </div>
      </ul>
    </motion.div>
  );
};

export default ProductItem;
