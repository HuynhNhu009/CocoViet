import ProductSearch from "./ProductSearch";
import ProductItem from "./ProductsItem";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Products = () => {
  const [product, setProducts] = useState([]);
  const response = useSelector((state) => state.ProductStore.productItem || []);

  const { productId } = useParams();

  useEffect(() => {
    if (response != {}) {
      setProducts(response);
    }
  }, [response]);

  return (
    <div className="  flex flex-col justify-center align-middle font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-8">
      <div className=" section-1">
        <ProductSearch />
      </div>

      <div className="section-2 mb-10 w-full flex justify-evenly- flex-row space-x-8 flex-wrap b-10">
        <div className="box-image shadow-md w-[35%] border-3 rounded-2xl border-green-600">
          <img
            src="https://www.sunnzfood.co.nz/wp-content/uploads/2016/11/Coconut-Products-3.jpg"
            className="w-full object-center p-5 rounded-3xl"
          />
        </div>

        <div className="box-content flex flex-col justify-between w-[62%]">
          <h2 className="font-bold text-4xl mb-0">{product.productName}</h2>
          <p className="text-2xl">
            Cửa hàng: <b>{product.retailerName}</b>
          </p>
          {product.variants?.map((variant, vIndex) => (
            <div key={vIndex}>
              <p className="text-green-600 font-bold text-4xl mb-5">
                {variant.price} VND
              </p>
              <p className="text-lg font-extralight mb-5">
                Còn lại: {variant.stock} sản phẩm
              </p>

              <div className="border-2 border-green-600 rounded-2xl">
                <div className=" text-lg inner-content p-5">
                  <p className="mb-1">Thông tin sản phẩm</p>
                  <hr className="mb-5 text-green-600"></hr>
                  <p className="font-extralight">Thể tích: 500ml</p>
                  <p className="font-extralight">Xuất xứ: Bến Tre</p>
                </div>
              </div>
            </div>
          ))}

          <button className=" cursor-pointer bg-green-600 shadow-sm shadow-gray-400 p-3 rounded-2xl text-white text-base">
            MUA NGAY
          </button>
        </div>
      </div>
      <div className="section-3flex justify-center space-x-8 flex-wrap mb-8 ">
        <h2>GIỚI THIỆU</h2>
        <hr className=""></hr>
        <p className="font-light mx-auto text-center">{product.productDesc}</p>
      </div>
      <div className="section-4 ">
        <h2>XEM THÊM</h2>
        <hr className="mb-5"></hr>
        <div className=" productItem flex align-middle grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 m-0">
          <ProductItem />
        </div>
      </div>
    </div>
  );
};

export default Products;
