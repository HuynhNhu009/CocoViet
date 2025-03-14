import React, { useState } from "react";
import ProductDetail from "./ProductDetail";
import ProductItem from "./ProductItem";
import ProductEdit from "./ProductEdit";
import { productApi } from "../../services/productService";

const ProductList = ({ products, categories, fetchProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  if (products == null) {
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

  // Khi nhấn vào ProductItem, gọi API để lấy chi tiết sản phẩm
  const handleSelectProduct = async (productId) => {
    try {
      const response = await productApi.getProductById(productId);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      alert("Không thể tải chi tiết sản phẩm!");
    }
  };

  // Chuyển sang chế độ chỉnh sửa
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Xóa sản phẩm
  const handleDelete = async (productId) => {
    try {
      await productApi.deleteProductById(productId);
      setSelectedProduct(null);
      if (typeof fetchProducts === "function") fetchProducts();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Xóa sản phẩm thất bại!");
    }
  };

  // Xử lý sau khi lưu hoặc hủy chỉnh sửa
  const handleSaveOrCancel = async (updatedProduct) => {
    setIsEditing(false);
    if (updatedProduct) {
      try {
        const response = await productApi.getProductById(
          updatedProduct.id || updatedProduct.productId
        );
        setSelectedProduct(response.data); // Cập nhật sản phẩm đã chỉnh sửa
        if (typeof fetchProducts === "function") fetchProducts();
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm sau khi lưu:", error);
        alert("Không thể tải sản phẩm đã chỉnh sửa!");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-2">
      {isEditing ? (
        // Khi chỉnh sửa, chỉ hiển thị ProductEdit
        <div className="w-full">
          <ProductEdit
            product={selectedProduct}
            onSave={handleSaveOrCancel}
            onCancel={() => handleSaveOrCancel(null)}
          />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Danh sách sản phẩm - Ẩn trên mobile khi có selectedProduct */}
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
                {products.map((product) => (
                  <div
                    key={product.id || product.productId}
                    onClick={() =>
                      handleSelectProduct(product.id || product.productId)
                    }
                  >
                    <ProductItem product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Hiển thị ProductDetail khi có sản phẩm được chọn */}
          {selectedProduct && (
            <div className="w-full md:w-1/2 lg:w-3/5">
              <ProductDetail
                product={selectedProduct}
                onBack={() => setSelectedProduct(null)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                fetchProducts={fetchProducts}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;