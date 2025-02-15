import React, { useState, useEffect } from "react";
import { loadProducts } from "../controllers/ProductControllerTest";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts(setProducts);
  }, []);

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li
              key={product.productId}
              style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
            >
              <h3>{product.productName}</h3>
              <p>
                <strong>Mô tả:</strong>{" "}
                {product.productDesc || "Không có mô tả"}
              </p>
              <p>
                <strong>Xuất xứ:</strong> {product.productOrigin || "Không rõ"}
              </p>
              <p>
                <strong>Nhà bán lẻ:</strong>{" "}
                {product.retailerName || "Không rõ"}
              </p>
              <p>
                <strong>Thời gian tạo:</strong>{" "}
                {product.createdAt
                  ? new Date(product.createdAt).toLocaleString()
                  : "Không có thông tin"}
              </p>

              {/* Hiển thị danh mục sản phẩm */}
              <p>
                <strong>Danh mục:</strong>{" "}
                {product.categoryName && product.categoryName.length > 0
                  ? product.categoryName.join(", ")
                  : "Không có danh mục"}
              </p>

              {/* Hiển thị danh sách biến thể sản phẩm */}
              {product.variants && product.variants.length > 0 ? (
                <div>
                  <strong>Biến thể:</strong>
                  <ul>
                    {product.variants.map((variant) => (
                      <li key={variant.variantId}>
                        <p>
                          <strong>Giá:</strong> {variant.price} VNĐ
                        </p>
                        <p>
                          <strong>Kho hàng:</strong> {variant.stock}{" "}
                          {variant.unitName}
                        </p>
                        <p>
                          <strong>Giá trị:</strong> {variant.value}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>
                  <strong>Biến thể:</strong> Không có
                </p>
              )}

              {/* Hiển thị hình ảnh */}
              {product.productImage && product.productImage !== "abc" ? (
                <div>
                  <strong>Hình ảnh:</strong>
                  <br />
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
              ) : (
                <p>
                  <strong>Hình ảnh:</strong> Không có
                </p>
              )}
            </li>
          ))
        ) : (
          <p>Không có sản phẩm nào.</p>
        )}
      </ul>
    </div>
  );
}

export default ProductList;
