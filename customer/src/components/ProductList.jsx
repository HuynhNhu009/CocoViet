// import React from "react";
// import useProducts from "../hooks/useProducts";
// import ProductCard from "../components/ProductCard";

// const ProductList = () => {
//   const { products, loading, error } = useProducts();
//   console.log("Products from useProducts:", products);

//   if (loading) return <p className="text-center text-gray-600">Đang tải...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//       {products.map((product) => (
//         <ProductCard key={product.productId} product={product} />
//       ))}
//     </div>
//   );
// };

// export default ProductList;
