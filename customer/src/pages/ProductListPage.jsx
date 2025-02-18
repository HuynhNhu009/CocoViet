import React from "react";
import { useProducts } from "../hooks/useProducts"; // Import hook useProducts
import ProductCard from "../components/ProductCard";

const ProductListPage = () => {
  const { products, loading, error } = useProducts(); // Sử dụng hook ở đây

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Có lỗi xảy ra!</p>;
  console.log(products);

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      {Array.isArray(products) &&
        products.map((customer) => (
          <ProductCard key={customer.customerId} product={customer} /> // Truyền khách hàng vào component ProductCard
        ))}
    </div>
  );
};

export default ProductListPage;
