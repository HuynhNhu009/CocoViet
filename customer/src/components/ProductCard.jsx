import React from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const ProductCard = ({ product }) => {
  return (
    <div>
      <Card className="p-4 shadow-lg rounded-2xl">
        <img
          src={product.productImage || "default.jpg"}
          alt={product.productName}
          className="w-full h-48 object-cover rounded-md"
        />
        <CardContent>
          <h3 className="text-lg font-bold">{product.productName}</h3>
          <p className="text-sm text-gray-500">{product.productDesc}</p>
          <p className="text-sm font-semibold">
            Xuất xứ: {product.productOrigin}
          </p>
          <p className="text-sm font-semibold">
            Danh mục: {product.categoryName.join(", ")}
          </p>
          <p className="text-sm">Nhà bán: {product.retailerName}</p>
          <p className="text-xs text-gray-400">
            Ngày tạo: {new Date(product.createdAt).toLocaleDateString()}
          </p>
          <div className="mt-2">
            {product.variants.map((variant) => (
              <div
                key={variant.variantId}
                className="flex justify-between items-center border-t pt-2"
              >
                <span>
                  {variant.value} {variant.unitName}
                </span>
                <span className="font-bold text-red-500">
                  {variant.price.toLocaleString()} đ
                </span>
              </div>
            ))}
          </div>
          <Button className="mt-3 w-full">Mua ngay</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
