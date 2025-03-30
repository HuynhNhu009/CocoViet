import React, { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";
import ProductItem from "./ProductItem";
import ProductEdit from "./ProductEdit";
import { productApi } from "../../services/productService";
import SearchBar from "../Search/SearchBar";

const ProductList = ({ products, categories, fetchProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const productStatus = [
    {
      status: "ENABLE",
      statusName: "Đang bán",
    },
    {
      status: "DISABLE",
      statusName: "Chờ duyệt",
    },
    {
      status: "PAUSE",
      statusName: "Tạm ngừng",
    },
    {
      status: "BLOCK",
      statusName: "Vi phạm",
    },
  ];

  // useEffect(() => {
  //   setFilteredProducts(products);
  // }, [products]);

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

  const handleSelectProduct = async (productId) => {
    try {
      const response = await productApi.getProductById(productId);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      alert("Không thể tải chi tiết sản phẩm!");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

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

  const handleSaveOrCancel = async (updatedProduct) => {
    setIsEditing(false);
    if (updatedProduct) {
      try {
        const response = await productApi.getProductById(
          updatedProduct.id || updatedProduct.productId
        );
        setSelectedProduct(response.data);
        if (typeof fetchProducts === "function") fetchProducts();
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm sau khi lưu:", error);
        alert("Không thể tải sản phẩm đã chỉnh sửa!");
      }
    }
  };

  // Callback
  const handleFilterData = (filteredData) => {
    setFilteredProducts(filteredData);
  };

  return (
    <div className="flex flex-col gap-4 pb-2 min-h-[75vh]">
      {!isEditing &&
      <SearchBar
        data={products}
        onFilterData={handleFilterData} // Callback
        isDisplayfilterStatus={true}
        isFilterCategory={true}
        filerCategory={categories}
        filerStatus={productStatus}
      />}
      {isEditing ? (
        <div className="w-full">
          <ProductEdit
            product={selectedProduct}
            onSave={handleSaveOrCancel}
            onCancel={() => handleSaveOrCancel(null)}
          />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Danh sách sản phẩm */}
          {(!selectedProduct || window.innerWidth >= 768) && (
            <div
              className={
                selectedProduct
                  ? "w-full md:w-1/2 lg:w-2/5 min-h-[calc(100vh-100px)]"
                  : "w-full"
              }
            >
              <div
                className={
                  selectedProduct
                    ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
                    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                }
              >
                {filteredProducts.map((product) => (
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
          {/* Chi tiết sản phẩm */}
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
