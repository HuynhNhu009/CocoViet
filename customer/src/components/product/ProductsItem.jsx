import { useEffect, useState } from "react";
import { productAPI } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion"; 
import { useDispatch} from "react-redux";
import { setProductStore, setProductItem } from "../../redux/productSlice";

const ProductItem = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await productAPI.getAllProducts();
        if (productResponse) setProducts(productResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const productStore = useSelector(
    (state) => state.ProductStore.productStore || []
  );

  useEffect(() => {
    if (productStore.length > 0) {
      setProducts(productStore);
    }
  }, [productStore]);

  const handleNavigate = async (productId) => {
    try {
        navigate(`/product-details/{productId}`);

        const findByProductId = await productAPI.getByProductId(productId);
        dispatch(setProductItem({}));
        dispatch(setProductItem(findByProductId.data));
        setProducts(findByProductId.data);
    } catch (error) {
        console.error("Error fetching products by productId:", error);
        setProducts([]);
    }
        
  }; 
  

  return (
    <>
      {products.length > 0 ? (
        products.map((item, index) => (
          <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: 20 }} // Bắt đầu từ dưới lên và mờ
              animate={{ opacity: 1, y: 0 }} // Hiện rõ và lên vị trí ban đầu
              exit={{ opacity: 0, y: -20 }} // Khi xoá thì trượt lên mờ dần
              transition={{ duration: 0.5, ease: "easeOut" }} // Tốc độ hiệu ứng
            >
              <ul
                className="shadow-md transition-opacity duration-700 bg-[#77C27F] text-white rounded-2xl flex flex-col cursor-pointer"
                onClick={() => handleNavigate(item.productId)}
              >
                <li>
                  <img
                    src="https://www.sunnzfood.co.nz/wp-content/uploads/2016/11/Coconut-Products-3.jpg"
                    alt={`Image ${index + 1}`}
                    className="w-full object-cover rounded-t-2xl"
                  />
                </li>
                <div className="py-2 text-center">
                  <li className="text-lg font-semibold">{item.productName}</li>
                  {item.variants?.map((variant, vIndex) => (
                    <li key={vIndex} className="font-light text-sm">
                      {variant.price} VND
                    </li>
                  ))}
                  <li className="font-extralight text-xs">{item.retailerName}</li>
                </div>
              </ul>
            </motion.div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          Không có sản phẩm nào trong danh mục này.
        </p>
      )}

    </>
  );
};

export default ProductItem;
