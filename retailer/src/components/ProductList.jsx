import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ProductItem from "./ProductItem";
import ProductDetail from "./ProductDetail";

const ProductList = () => {
  const products = useSelector((state) => state.RetailerStore.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log(products);

  if (!products) {
    return (
      <div className="text-center py-4 text-gray-600">Đang tải sản phẩm...</div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-4 text-gray-600">
        Chưa có sản phẩm nào.
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Left side - Product List - Hidden on mobile when product is selected */}
      {(!selectedProduct || window.innerWidth >= 768) && (
        <div className={selectedProduct ? "w-full md:w-1/2 lg:w-1/3" : "w-full"}>
          <div
            className={
              selectedProduct
                ? "grid grid-cols-1 md:grid-cols-2 gap-2"
                : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5 gap-2"
            }
          >
            {products.map((product) => (
              <div key={product.id} onClick={() => setSelectedProduct(product)}>
                <ProductItem product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Right side - Product Detail */}
      {selectedProduct && (
        <div className="w-full md:w-1/2 lg:w-2/3">
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;