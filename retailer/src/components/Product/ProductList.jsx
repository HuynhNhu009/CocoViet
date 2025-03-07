import React, { useState } from "react";
import ProductDetail from "./ProductDetail";
import ProductItem from "./ProductItem";

const ProductList = ({products, categories}) => {
  // const products = useSelector((state) => state.RetailerStore.products);
  // const categories = useSelector((state)=>state.RetailerStore.category);

  const [selectedProduct, setSelectedProduct] = useState(null);
  // console.log("CategoryID=====", categories);

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
    <div className="flex flex-col sm:pt-4 md:flex-row gap-4">
      {/* Left side - Product List - Hidden on mobile when product is selected */}
      {(!selectedProduct || window.innerWidth >= 768) && (
        <div className={selectedProduct ? "w-full md:w-1/2 lg:w-2/5" : "w-full"}>
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
        <div className="w-full md:w-1/2 lg:w-3/5">
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)}
            isEdit={false}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;