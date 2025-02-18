import React from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const ProductCard = ({ product }) => {
  return (
    <div>
      <Card className="p-4 shadow-lg rounded-2xl">
        <img
          src={product.customerAvatar || "default-avatar.jpg"} // Hiển thị avatar của khách hàng
          alt={product.customerName}
          className="w-full h-48 object-cover rounded-md"
        />
        <CardContent>
          <h3 className="text-lg font-bold">{product.customerName}</h3>{" "}
          {/* Hiển thị tên khách hàng */}
          <p className="text-sm text-gray-500">{product.customerEmail}</p>{" "}
          {/* Hiển thị email */}
          <p className="text-sm">{product.phoneNumbers}</p>{" "}
          {/* Hiển thị số điện thoại */}
          <p className="text-sm font-semibold">
            Địa chỉ: {product.customerAddress}
          </p>
          <p className="text-xs text-gray-400">
            Ngày tạo: {new Date(product.createdAt).toLocaleDateString()}{" "}
            {/* Hiển thị ngày tạo */}
          </p>
          <div className="mt-2">
            {/* Nếu bạn muốn thêm các hành động như "Mua ngay", bạn có thể sử dụng Button */}
            <Button className="mt-3 w-full">Liên hệ</Button>{" "}
            {/* Thay "Mua ngay" thành "Liên hệ" */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
