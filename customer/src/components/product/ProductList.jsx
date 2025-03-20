import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsNav, setProductDetail } from "../../redux/productSlice";
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
    }else{
      setProducts([]);
    }
  }, [productSearch]);

  const handleNavigate = (productId) => {
      const findByProductId = ProductStore.find((item) => item.productId === productId);
    
      if(findByProductId){
      dispatch(setProductDetail({}));
      dispatch(setProductDetail(findByProductId));
      setProducts(findByProductId);
      navigate(`/products/${productId}`);

      }else{
        console.log("Product not found!");
      setProducts([]);
      }    
  };

  return (
    <div className="productItem align-middle grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 m-0">
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
        <p className="text-center col-12 text-gray-500">
          Không có sản phẩm .
        </p>
      )}
    </div>
  );
};

export default ProductList;
