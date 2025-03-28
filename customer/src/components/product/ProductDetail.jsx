import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {  toast } from 'react-toastify';
import { setCreateOrder } from "../../redux/orderSlice";
import { setProductDetail, setRetailerProfile } from "../../redux/productSlice";
import { orderAPI } from "../../services/orderService";
import { productAPI } from "../../services/productService";
import ProductItem from "./ProductItem";

const ProductDetail = () => {
  //api
  const { productId } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => !!state.CustomerStore.isLogin);
  const sellingProduct = useSelector(
    (state) => state.OrderStore.sellingProduct
  );
  const dispatch = useDispatch();
  const productDetail = useSelector(
    (state) => state.ProductStore.productDetail
  );
  const productStore = useSelector(
    (state) => state.ProductStore.productStore || []
  );
  const retailerStore = useSelector(
    (state) => state.ProductStore.retailerStore
  );
  const customer = useSelector((state) => state.CustomerStore.customer);

  const [selectVariant, setSelectVariant] = useState([]);
  const [countSellingProduct, setCountSellingProduct] = useState(0);

  const [product, setProducts] = useState([]);
  const orderRequest = {
    customerId: "",
    receiptDetailRequests: [
      {
        productVariantId: "",
        quantity: "",
      },
    ],
  };

  useEffect(() => {
    if (
      sellingProduct.length > 0 &&
      productDetail &&
      productDetail.variants?.length > 0
    ) {
      let variantId = selectVariant.variantId;

      if (variantId) {
        const count = sellingProduct.filter(
          (item) => item.productVariant.variantId === variantId
        );
        if (count.length > 0) {
          setCountSellingProduct(count[0].totalSold);
        } else {
          setCountSellingProduct(0);
        }
      }
    }
  }, [sellingProduct, productDetail, selectVariant]);

  useEffect(() => {
    if (!productDetail || Object.keys(productDetail).length === 0) {
      const fetchProduct = async () => {
        try {
          const response = await productAPI.getByProductId(productId);
          setProducts(response.data);
          dispatch(setProductDetail(response.data));
        } catch (error) {
          console.error("Lỗi khi lấy thông tin sản phẩm:", error);
        }
      };
      fetchProduct();
    } else {
      setProducts(productDetail);
      setSelectVariant(productDetail.variants[0]);
    }
  }, [productDetail, dispatch, productId, retailerStore]);

  //quantity
  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (e) => {
    let value = e.target.value.trim();

    if (value === "") {
      setQuantity("");
      return;
    }
    let num = parseInt(value, 10);
    if (selectVariant.stock === 0) {
      setQuantity(0);
    }
    if (!isNaN(num) && num >= 1 && num <= selectVariant.stock) {
      setQuantity(num);
    }
  };

  //buy product
  const buyProduct = async () => {
    if (isLoggedIn) {
      orderRequest.customerId = customer.customerId;
      orderRequest.receiptDetailRequests = [
        {
          productVariantId: selectVariant.variantId,
          quantity: quantity,
        },
      ];

      await orderAPI.addOrder(orderRequest);
      dispatch(setCreateOrder(true));
  
      toast.success("Thêm sản phẩm vào giỏ thành công!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: false, 
        theme: "light",
      });
      
    } else {
      //current path
      const currentPath = window.location.pathname;
      localStorage.setItem("redirectAfterLogin", currentPath);
      navigate("/login");
    }
  };

  //detail
  const handleNavigate = (productId) => {
    const findByProductId = productStore.find(
      (item) => item.productId === productId
    );

    if (findByProductId) {
      dispatch(setProductDetail({}));
      dispatch(setProductDetail(findByProductId));
      setProducts(findByProductId);
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(`/products/${productId}`);
    } else {
      console.log("Product not found!");
      setProducts([]);
    }
  };

  const handleRetailerProfile = async () => {
    const getRetailer = retailerStore?.find(
      (item) =>
        item.retailerName.toLowerCase().trim() ===
        productDetail.retailerName.toLowerCase().trim()
    );
    if (getRetailer) {
      await dispatch(setRetailerProfile(getRetailer));
    }
    navigate(`/retailer/${getRetailer.retailerId}`);
  };

  return (
    <div className="  flex flex-col justify-center align-middle font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-8">
      <div className=" text-sm ">
        <h2 className=" text-white text-right ml-auto  bg-green-600 w-40 px-5">
          Chi tiết sản phẩm
        </h2>
        <hr className="text-green-600"></hr>
      </div>

      <div className="section-2 mx-auto my-10 w-[85%] flex justify-center flex-row space-x-10 flex-wrap ">
        <div className="box-image shadow-md w-[40%] border-2 rounded-xl border-green-600">
          <img
            src={product.productImage}
            className="w-full object-cover aspect-square p-2 rounded-2xl"
          />
        </div>

        <div className="box-content flex flex-col justify-between w-[52%]">
          <div className="">
            <h2 className="font-bold text-3xl mb-3">{product.productName}</h2>

            <div className=" mb-3">
              <span>ĐÃ BÁN: </span>
              <span className="font-light">{countSellingProduct}</span>
            </div>

            <div className=" mb-4">
              <span className="">XUẤT XỨ: </span>
              <span className="font-light">{product.productOrigin}</span>
            </div>
            <hr className="mb-2 text-green-600"></hr>
          </div>

          <div>
            <p className="text-green-600 font-bold text-3xl mb-8">
              ₫{new Intl.NumberFormat("vi-VN").format(selectVariant?.price)}{" "}
            </p>
            <div className=" mb-5">
              <span className="pr-2 ">LOẠI: </span>

              {product.variants?.map((variant, vIndex) => (
                <span
                  onClick={() => {
                    setSelectVariant(variant);
                    setQuantity(1);
                  }}
                  key={vIndex}
                  className={`cursor-pointer mr-2 px-2 py-1 rounded-sm border-green-600 border-1 
                  ${
                    selectVariant === variant
                      ? "bg-green-500 text-white"
                      : "hover:bg-green-500 hover:text-white"
                  }`}
                >
                  {variant.value} {"("}
                  {variant.unitName} 
                  {")"}
                </span>
              ))}
            </div>

            <div className=" mb-5">
              <span>KHO: </span>
              <span className="font-light">{selectVariant?.stock}</span>
            </div>
            <div className=" mb-5">
              <span className="pr-3">SỐ LƯỢNG: </span>
              <input
                type="number"
                className={` border-1 px-2 rounded-sm w-15 ${
                  selectVariant?.stock === 0 ? "border-none" : ""
                } `}
                id="quantity"
                onChange={handleChangeQuantity}
                onBlur={() => quantity === "" && setQuantity(1)}
                value={selectVariant?.stock === 0 ? 0 : quantity}
              />
              {quantity === selectVariant.stock && (
                <span className="text-red-600 text-sm font-medium">
                  {" "}
                  Số lượng tối đa!
                </span>
              )}
            </div>
            {selectVariant?.stock > 0 ? (
              <button
                onClick={buyProduct}
                className=" cursor-pointer uppercase w-full bg-green-600 shadow-sm shadow-gray-400 p-3 rounded-2xl text-white text-base"
              >
                Thêm vào giỏ hàng
              </button>
            ) : (
              <button className=" bg-red-600 w-full shadow-sm shadow-gray-400 p-2  text-white text-base">
                HIỆN TẠI HẾT HÀNG
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto my-10 w-[85%] ">
        <div className="">
          <p
            onClick={() => handleRetailerProfile()}
            title="Đến cửa hàng"
            className="text-xl hover:text-green-600 transition-all duration-300 ease-out  flex cursor-pointer font-bold"
          >
            <BuildingStorefrontIcon class="h-7 w-7 mr-2" />
            {product.retailerName}
          </p>
          <hr className="my-2"></hr>
          <div className="mb-3"></div>
        </div>

        <div className="section-3  justify-center space-x-8 flex-wrap mb-3 ">
          <h2>MÔ TẢ:</h2>

          {/* <hr className="mr-0"></hr> */}
          <p className="font-light mx-auto" style={{ whiteSpace: "pre-wrap" }}>
            {product.productDesc}
          </p>
        </div>

        <div className="section-4  justify-center space-x-8 flex-wrap mb-3 ">
          <h2>LOẠI SẢN PHẨM:</h2>
          {/* <hr className="m-0"></hr> */}
          {Array.isArray(product.categoryName) &&
            product.categoryName.map((item, index) => (
              <p key={index} className="font-light mx-auto">
                {item}
              </p>
            ))}
        </div>
      </div>
      <div className="section-5 ">
        <h2 className="text-xl text-green-600">XEM THÊM</h2>
        <hr className="mb-5 text-green-600"></hr>
        <div className="productItem align-middle grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 m-0">
          {productStore.slice(0, 5).map((item) => (
            <div
              key={item.productId}
              onClick={() => handleNavigate(item.productId)}
            >
              <ProductItem
                productId={item.productId}
                productName={item.productName}
                retailerName={item.retailerName}
                variants={item.variants || []}
                productImage={item.productImage || []}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
