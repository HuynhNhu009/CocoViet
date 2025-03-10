import React, { useEffect, useState } from "react";

const ProductItem = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
//   const [products, setSelectedProduct] = useState(null);



  const handleRowClick = (product) => {
    setSelectedProduct(product === selectedProduct ? null : product);
  };

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-center bg-black text-white uppercase">
            <th className="p-3 text-sm">STT</th>
            <th className="p-3 text-sm">Sản phẩm</th>
            <th className="p-3 text-sm">Cửa hàng</th>
            <th className="p-3 text-sm">Mô tả</th>
            {/* <th className="p-3 text-sm">Giá</th> */}
            <th className="p-3 text-sm">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <React.Fragment key={index}>
              <tr
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(product)}
              >
                <td className="p-1 text-center">{index + 1}</td>
                <td className="flex items-center gap-2">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-25 h-25 object-cover rounded-md"
                  />
                  <span className=" text-center truncate max-w-xs overflow-hidden">{product.productName}</span>
                </td>
                <td className="p-1 text-center ">{product.retailerName}</td>
                <td className="p-3 truncate max-w-xs overflow-hidden ">{product.productDesc}</td>
                <td className="p-3 text-center">

                  <button className="bg-red-500 text-white px-3 py-1 ml-2 rounded-md">
                    Xóa
                  </button>
                </td>
              </tr>
              {selectedProduct === product && (
                <tr className="bg-gray-50">
                  <td colSpan={5} className="p-3 text-gray-700">
                    <strong>Chi tiết sản phẩm:</strong>
                    <p>Tên: {product.name}</p>
                    <p>Mô tả: {product.description}</p>
                    <p>Giá: {product.price} VND</p>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductItem;
