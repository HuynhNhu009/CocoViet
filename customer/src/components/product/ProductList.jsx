import { useEffect, useState } from "react";
import { productAPI } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProductDetail, setIsNav } from "../../redux/productSlice";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productCategory = useSelector(
    (state) => state.ProductStore.productCategory || []
  );

  const productSearch = useSelector(
    (state) => state.ProductStore.productSearch 
  );
  const ProductStore = useSelector(
    (state) => state.ProductStore.productStore
  );
  const isNav = useSelector(
    (state) => state.ProductStore.isNav
  );

  useEffect(() => {
    if (ProductStore.length > 0) {
      setProducts(ProductStore);      
    }
  }, [ProductStore]);

  useEffect(() => {
      setProducts(ProductStore);
      dispatch(setIsNav(null));
  }, [isNav]);

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

  const handleNavigate = (productId) => {
      const findByProductId = ProductStore.find((item) => item.productId === productId);
    
      if(findByProductId){
      dispatch(setProductDetail({}));
      dispatch(setProductDetail(findByProductId));
      setProducts(findByProductId);
      navigate(`/product/${productId}`);

      }else{
        console.log("Product not found!");
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
              productImage={item.productImage || []}
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
