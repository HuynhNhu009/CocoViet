import { useEffect, useState } from "react";
import { productAPI } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setProductStore,
  setProductDetail,
} from "../../redux/productSlice";
import ProductItem from "./ProductsItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [toStore, setToStore] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productCategory = useSelector(
    (state) => state.ProductStore.productCategory || []
  );
  const navProduct = useSelector(
    (state) => state.ProductStore.navProduct || []
  );
  const productSearch = useSelector(
    (state) => state.ProductStore.productSearch || []
  );


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await productAPI.getAllProducts();
        if (productResponse && productResponse.data) {
          setProducts(productResponse.data);
          dispatch(setProductStore(productResponse.data));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();  
  }, []);

  
  useEffect(() => {
    if (productCategory.length > 0) {
      setProducts(productCategory);
    }
  }, [productCategory]);

  useEffect(() => {
    if (productSearch.length > 0) {
      setProducts(productSearch);
    }
  }, [productSearch]);

  useEffect(() => {
    if (navProduct.length > 0) {
      setProducts(navProduct);
      setToStore([...navProduct]);
      dispatch(setProductStore(toStore));
    }
  }, [navProduct]);

  const handleNavigate = async (productId) => {
    try {

      navigate(`/product/${productId}`);
      const findByProductId = await productAPI.getByProductId(productId);

      dispatch(setProductDetail({}));
      dispatch(setProductDetail(findByProductId.data));
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
          <div key={index} onClick={() => handleNavigate(item.productId)}>
            <ProductItem
              productId={item.productId}
              productName={item.productName}
              retailerName={item.retailerName}
              variants={item.variants || []}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          Không có sản phẩm nào trong danh mục này.
        </p>
      )}
    </>
  );
};

export default ProductList;
