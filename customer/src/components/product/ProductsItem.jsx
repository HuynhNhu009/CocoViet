import { useEffect, useState } from "react";
import { productAPI } from "../../services/productService";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
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
      navigate(`/product/${productId}`);

      const findByProductId = await productAPI.getByProductId(productId);
      dispatch(setProductItem({}));
      dispatch(setProductItem(findByProductId.data));
    
      dispatch(setProductStore(products))

      setProducts(findByProductId.data);
    } catch (error) {
      console.error("Error fetching products by productId:", error);
      setProducts([]);
    }
  };

  // console.log(products);
  



  return (
    <>
      {products.length > 0 ? (
        products.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }} // Bắt đầu từ dưới lên và mờ
            animate={{ opacity: 1, y: 0 }} // Hiện rõ và lên vị trí ban đầu
            exit={{ opacity: 0, y: -20 }} // Khi xoá thì trượt lên mờ dần
            transition={{ duration: 0.5, ease: "easeOut" }} // Tốc độ hiệu ứng
          >
            <ul
              className="shadow-md transition-opacity duration-700 bg-[#77C27F]  hover:bg-green-600 text-white rounded-2xl flex flex-col cursor-pointer"
              onClick={() => handleNavigate(item.productId)}
            >
              <li>
                <img
                  src="https://th.bing.com/th/id/R.21f948ddaf5ceb8af38722b6525f9576?rik=QXJDXfWA6c5bfw&riu=http%3a%2f%2fimua.com.vn%2fimages%2fAlbum%2fTrai-dua-tuoi-75.jpg&ehk=J0LhHGVtSH9w9QxAw%2fhxbidliOyBUiI6qjp8i2YcWJQ%3d&risl=&pid=ImgRaw&r=0"
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
      <Outlet />

    </>
  );
};

export default ProductItem;
