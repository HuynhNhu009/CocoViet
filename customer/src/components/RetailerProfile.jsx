import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setProductDetail } from '../redux/productSlice';
import { productAPI } from '../services/productService';
import ProductItem from './Product/ProductItem';

const RetailerProfile = () => {
  const { retailerId } = useParams();  

  const retailerProfile = useSelector((state) => state.ProductStore.retailer);
  const productStore = useSelector((state) => state.ProductStore.productStore);
  const [retailer, setRetailer] = useState();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(retailerProfile){
      setRetailer(retailerProfile);

      const fetchProducts = async () => {
        try {
          const products = await productAPI.getProductByRetailerId(retailerProfile.retailerId);
          setProduct(products.data);
          
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      fetchProducts();
    }    

  }, [retailerProfile]);

  const handleNavigate = (productId) => {
      const findByProductId = productStore.find(
        (item) => item.productId === productId
      );
  
      if (findByProductId) {
        dispatch(setProductDetail({}));
        dispatch(setProductDetail(findByProductId));
        navigate(`/products/${productId}`);
      } else {
        console.log("Product not found!");
      }
    };

  return (
    <div className="max-w-6xl mx-auto p-5 font-sans">
      <section className="bg-gray-100 p-5 rounded-lg mb-8 flex items-start">
        <img
          src="https://th.bing.com/th/id/R.f862d274bfe60fa9a97d748874c13ee0?rik=0we5Fi9Bd8yRQw&pid=ImgRaw&r=0"
          alt="png"
          className="w-24 h-24 rounded-full mr-5 object-cover"
        />
        <div>
          <h1 className="text-3xl text-gray-800 font-bold mb-3">{retailer?.retailerName}</h1>
          <p className="text-base text-gray-600 mb-2">
            <strong>Địa chỉ:</strong> {retailer?.retailerAddress}
          </p>
          <p className="text-base text-gray-600 mb-2">
            <strong>Số điện thoại:</strong> {retailer?.phoneNumbers}
          </p>
          <p className="text-base text-gray-600 mb-2">
            <strong>Email:</strong> {retailer?.retailerEmail}
          </p>
        </div>
      </section>

      <div>
      <h2 className="text text-gray-600 uppercase ">Sản phẩm</h2>
      <hr className='mb-8'></hr>
      </div>
      <div className="productItem align-middle grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 m-0">
        {product.length > 0 ? (
          product.map((item, index) => (
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
      </div>
    </div>
  );
};

export default RetailerProfile;