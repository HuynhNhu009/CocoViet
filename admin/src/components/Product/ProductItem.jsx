import React, { useState } from "react";

const ProductItem = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleRowClick = (productId) => {
    setSelectedProduct(productId === selectedProduct ? null : productId);
  };  
  

  return (
    <>
      <table className="w-full border-collapse ">
        <thead>
          <tr className="text-center bg-black text-white uppercase">
            <th className="p-3 text-sm">STT</th>
            <th className="p-3 text-sm">Sản phẩm</th>
            <th className="p-3 text-sm">Cửa hàng</th>
            <th className="p-3 text-sm">Mô tả</th>
            <th className="p-3 text-sm">Hành động</th>
          </tr>
        </thead>
        <tbody>
        {products.length > 0 ? (
          products?.map((product, index) => (
            <React.Fragment key={product.productId}>
              <tr
                className={`cursor-pointer hover:bg-gray-100 mb-4 ${selectedProduct === product.productId ? "bg-gray-100" : ""}`}
                onClick={() => handleRowClick(product.productId)}
              >
                <td className="p-1 text-center">{index + 1}</td>
                <td className="flex items-center gap-2">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-26 h-26 object-cover p-2 rounded-xl"
                  />
                  <span className=" text-center truncate max-w-xs overflow-hidden">
                    {product.productName}
                  </span>
                </td>
                <td className="p-1 text-center ">{product.retailerName}</td>
                <td className="p-3 truncate max-w-xs overflow-hidden ">
                  {product.productDesc}
                </td>
                <td className="p-3 text-center">
                  <button className="bg-red-500 text-white px-3 py-1 ml-2 rounded-md">
                    Xóa
                  </button>
                </td>
              </tr>
              {selectedProduct === product.productId && (
                <tr className="bg-gray-100  mb-4">
                  <td colSpan={5} className="p-3 text-gray-700 px-18">
                    <p className="bg-gray-200 font-bold text-center">Chi tiết sản phẩm:</p>
                    {/* <hr className="pb-2" ></hr> */}
                    <div>
                    <span>Nguồn gốc: </span>
                    <span className="font-light">
                      {product.productOrigin}
                    </span>
                    </div>
                    <div>
                      <span>Danh mục: </span>
                      {Array.isArray(product.categoryName) &&
                        product.categoryName.map((item, index) => (
                          <p key={index} className="font-light pl-2">
                            - {item}
                          </p>
                        ))}
                    </div>
                    <div>
                      <span>Mô tả: </span>
                      <span className="font-light">{product.productDesc}</span>
                    </div>
                    <div>
                      <p>Loại: </p>
                      {product.variants?.map((variant, vIndex) => (
                        <p
                          key={vIndex}
                          className={`cursor-pointer pl-2 font-light`}
                        >
                          - {variant.value}
                          {variant.unitName}: {variant.price} VND
                        </p>                        
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))
        ) : (
          <tr >
            <td colSpan={5} className="p-3 text-center text-gray-500">
            Không có sản phẩm nào.
            </td>
          </tr>
        )}
          
        </tbody>
      </table>
    </>
  );
};

export default ProductItem;
