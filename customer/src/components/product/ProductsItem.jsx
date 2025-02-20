import { useEffect, useState } from "react";
import { productAPI } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductItem = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  const handleNavigate = async () => {
    navigate("/product-details");
  };

  return (
    <>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul
            key={item.productId}
            className="shadow-md bg-[#77C27F] text-white rounded-2xl rounded-md flex flex-col"
            onClick={() => handleNavigate()}
          >
            <li>
              <img
                src="https://www.sunnzfood.co.nz/wp-content/uploads/2016/11/Coconut-Products-3.jpg"
                alt={`Image ${index + 1}`}
                className="w-auto object-fill"
              />
            </li>
            <div className="py-2 text-center">
              <li>{item.productName}</li>
              {item.variants?.map((variant, vIndex) => (
                <li key={vIndex} className="font-light">
                  {variant.price} VND
                </li>
              ))}
              <li className="font-extralight">{item.retailerName}</li>
            </div>
          </ul>
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
