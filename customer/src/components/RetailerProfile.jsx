import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setProductDetail } from "../redux/productSlice";
import { productAPI } from "../services/productService";
import ProductItem from "./Product/ProductItem";

const RetailerProfile = () => {
  const { retailerId } = useParams();

  const retailerProfile = useSelector((state) => state.ProductStore.retailer);
  const productStore = useSelector((state) => state.ProductStore.productStore);
  const [retailer, setRetailer] = useState();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (retailerProfile) {
      setRetailer(retailerProfile);

      const fetchProducts = async () => {
        try {
          const products = await productAPI.getProductByRetailerId(
            retailerProfile.retailerId
          );
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
      <section className="bg-gradient-to-br from-black/300 via-green-700/100 to-transparent backdrop-blur-lg p-6 shadow-md rounded-lg mb-8 flex items-start gap-6">
  <div className="w-32 h-32 mt-2 flex-shrink-0 flex items-center justify-center">
    <img
      src="https://img.freepik.com/premium-vector/young-coconut-design-premium-logo_187482-677.jpg"
      alt="Retailer"
      className="w-full h-full object-cover rounded-sm shadow-sm"
    /> 
  </div>

  <div className="flex-1 text-white">
    <h1 className="text-2xl md:text-3xl font-bold mb-4">
      {retailer?.retailerName || "Tên nhà bán lẻ"}
    </h1>
    <div className="flex  justify-between">
      {/* Cột trái */}
      <div>
        <p className="text-sm md:text-base  mb-2">
          <strong>Địa chỉ:</strong>{" "}
          {retailer?.retailerAddress || "Chưa có thông tin"}
        </p>
        <p className="text-sm md:text-base  mb-2">
          <strong>Số điện thoại:</strong>{" "}
          {retailer?.phoneNumbers || "Chưa có thông tin"}
        </p>
        <p className="text-sm md:text-base mb-2">
          <strong>Email:</strong>{" "}
          {retailer?.retailerEmail || "Chưa có thông tin"}
        </p>
      </div>

      <div>
        <p className="text-sm md:text-base mb-2">
          <strong>Tham gia:</strong>{" "}
          {retailer?.createdAt
            ?.split("T")[0]
            .split("-")
            .reverse()
            .join("/") || "N/A"}
        </p>
        <p className="text-sm md:text-base  mb-2">
          <strong>Tổng sản phẩm:</strong> {product?.length || 0}
        </p>
      </div>
    </div>
  </div>
</section>

      <div>
        <h2 className="text text-green-700 uppercase ">Sản phẩm</h2>
        <hr className="mb-8 border-green-700"></hr>
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
