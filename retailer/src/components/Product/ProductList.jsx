import React, { useState } from "react";
import ProductDetail from "./ProductDetail";
import ProductItem from "./ProductItem";
import ProductEdit from "./ProductEdit";
import { productApi } from "../../services/productService";

const ProductList = ({ products, categories, fetchProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState(products);

  if (!productData) {
    return (
      <div className="text-center py-4 text-gray-600">Đang tải sản phẩm...</div>
    );
  }

  if (!productData.length) {
    return (
      <div className="text-center py-4 text-gray-600">
        Chưa có sản phẩm nào.
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async(productId) => {
    setSelectedProduct(null);
    console.log("dele pproductid", productId)
    const response = await productApi.deleteProductById(productId);
    console.log("Data dele pproductid", response.data)

    setProductData(response.data)
    fetchProducts(); 
    // setProductData(products) 
  }

  const handleSaveOrCancel = (updatedProduct) => {
    setIsEditing(false);
    if (updatedProduct) {
      setSelectedProduct(updatedProduct); // Cập nhật selectedProduct với dữ liệu mới
      fetchProducts(); // Gọi lại danh sách sản phẩm nếu cần
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-2">
      {isEditing ? (
        <div className="w-full">
          <ProductEdit
            product={selectedProduct}
            onSave={handleSaveOrCancel} // Truyền hàm mới
            onCancel={() => handleSaveOrCancel(null)} // Không cập nhật nếu hủy
          />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left side - Product List - Hidden on mobile when product is selected */}
          {(!selectedProduct || window.innerWidth >= 768) && (
            <div
              className={
                selectedProduct ? "w-full md:w-1/2 lg:w-2/5" : "w-full"
              }
            >
              <div
                className={
                  selectedProduct
                    ? "grid grid-cols-1 md:grid-cols-2 gap-2"
                    : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5 gap-2"
                }
              >
                {productData.map((product) => (
                  <div
                    key={product.id || product.productId}
                    onClick={() => setSelectedProduct(product)}
                  >
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
                onProductSave={setSelectedProduct}
                onBack={() => setSelectedProduct(null)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;