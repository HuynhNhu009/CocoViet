import ProductSearch from "./ProductSearch";
import ProductItem from "./ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setProductDetail } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { orderAPI } from "../../services/orderService";
import { setCreateOrder } from "../../redux/orderSlice";
import Swal from 'sweetalert2'

const ProductDetail = () => {
  //api
  const { productId } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => !!state.CustomerStore.isLogin);

  const [product, setProducts] = useState([]);
  const orderRequest = {
    customerId:"",
    receiptDetailRequests:[
      {
        productVariantId:"",
        quantity:""
      }
    ]
  }
  const dispatch = useDispatch();

  const productDetail = useSelector(
    (state) => state.ProductStore.productDetail || []
  );
  const productStore = useSelector(
    (state) => state.ProductStore.productStore || []
  );

  const customer = useSelector(
    (state) => state.CustomerStore.customer || []
  );

  useEffect(() => {
    if (productDetail != {}) {
      setProducts(productDetail);      
    }
  }, [productDetail]);

  const [selectVariant, setSelectVariant] = useState(productDetail.variants[0]);

  //quantity
  const [quantity, setQuantity] = useState(1); 

  const handleChangeQuantity = (e) => {
    let value = e.target.value.trim(); 
  
    if (value === "") {
      setQuantity(""); 
      return;
    }
  
    let num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1) {
      setQuantity(num);
    }
  };

  //buy product
  const buyProduct = async() => {
    if(isLoggedIn){
       orderRequest.customerId = customer.customerId;
      orderRequest.receiptDetailRequests = [{
         productVariantId: selectVariant.variantId,
         quantity: quantity
      }]
      
      await orderAPI.addOrder(orderRequest);
      dispatch(setCreateOrder(true));
      Swal.fire({
        title: "Thêm sản phẩm vào giỏ thành công!",
        icon: "success",
        showConfirmButton: false,
        timer:1000 
      });
    }else{
      navigate("/login")
    }
  }

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
    } else {
      console.log("Product not found!");
      setProducts([]);
    }
  };

  console.log("productDetail", product);
  


  return (
    <div className="  flex flex-col justify-center align-middle font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-8">
      <div className="mb-5 text-sm ">
        <h2 className=" text-white text-right ml-auto  bg-green-600 w-40 px-5">
          Chi tiết sản phẩm
        </h2>
        <hr className="text-green-600"></hr>
      </div>
      <div className="section-2 mb-10 w-full flex justify-evenly- flex-row space-x-8 flex-wrap b-10">
        <div className="box-image shadow-md w-[35%] border-3 rounded-2xl border-green-600">
          <img
            src="https://th.bing.com/th/id/R.21f948ddaf5ceb8af38722b6525f9576?rik=QXJDXfWA6c5bfw&riu=http%3a%2f%2fimua.com.vn%2fimages%2fAlbum%2fTrai-dua-tuoi-75.jpg&ehk=J0LhHGVtSH9w9QxAw%2fhxbidliOyBUiI6qjp8i2YcWJQ%3d&risl=&pid=ImgRaw&r=0"
            className="w-full object-center p-5 rounded-3xl"
          />
        </div>

        <div className="box-content flex flex-col justify-between w-[62%]">
          <h2 className="font-bold text-4xl mb-0">{product.productName}</h2>
          <p className="text-2xl flex  font-bold">
            <BuildingStorefrontIcon class="h-7 w-7 mr-2" />
            {product.retailerName}
          </p>
          <p className="font-extralight">Xuất xứ: {product.productOrigin}</p>
          <div>
            <p className=" mb-1 text-green-600 font-bold">Thông tin sản phẩm</p>
            <hr className="mb-2 text-green-600"></hr>
          </div>
          <div className="">
            <span className="pr-3">Thể tích: </span>
            {product.variants?.map((variant, vIndex) => (
              <span
                onClick={() => setSelectVariant(variant)}
                key={vIndex}
                className={`cursor-pointer mr-2 px-2 py-1 rounded-sm border 
                  ${selectVariant === variant ? "bg-green-500 text-white" : "hover:bg-green-500"}`}
              >
                {variant.value}
                {variant.unitName}
              </span>
            ))}
          </div>
          <p className="text-green-600 font-bold text-4xl ">{selectVariant.price}.000 VND</p>
          <div>
            <span>Số lượng: </span>
            <input
            type="number"
            className=" border-1 px-2 rounded-sm w-15"
            id="quantity"
            onChange={handleChangeQuantity}
            onBlur={() => quantity === "" && setQuantity(1)}
            value={quantity}
          />
          </div>
          <button onClick={buyProduct} className=" cursor-pointer bg-green-600 shadow-sm shadow-gray-400 p-3 rounded-2xl text-white text-base">
            ĐẶT HÀNG
          </button>
        </div>
      </div>
      <div className="section-3flex justify-center space-x-8 flex-wrap mb-8 ">
        <h2>GIỚI THIỆU</h2>
        <hr className=""></hr>
        <p className="font-light mx-auto text-center">{product.productDesc}</p>
      </div>
      <div className="section-3flex justify-center space-x-8 flex-wrap mb-8 ">
        <h2>LOẠI SẢN PHẨM</h2>
        <hr className=""></hr>
        {Array.isArray(product.categoryName) && product.categoryName.map((item, index) => (
          <p key={index} className="font-light mx-auto">{item}</p>
        ))}

      </div>
      <div className="section-4 ">
        <h2>XEM THÊM</h2>
        <hr className="mb-5"></hr>
        <div className=" productItem flex align-middle grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 m-0">
          {productStore.slice(0, 4).map((item) => (
            <div
              key={item.productId}
              onClick={() => handleNavigate(item.productId)}
            >
              <ProductItem
                productId={item.productId}
                productName={item.productName}
                retailerName={item.retailerName}
                variants={item.variants || []}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
