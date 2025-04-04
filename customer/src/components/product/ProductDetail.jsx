import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setCreateOrder } from "../../redux/orderSlice";
import { setRetailerProfile } from "../../redux/productSlice";
import { orderAPI } from "../../services/orderService";
import { productAPI } from "../../services/productService";
import ProductItem from "./ProductItem";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.CustomerStore.isLogin);
  const sellingProduct = useSelector((state) => state.OrderStore.sellingProduct);
  const productStore = useSelector((state) => state.ProductStore.productStore || []);
  const retailerStore = useSelector((state) => state.ProductStore.retailerStore);
  const customer = useSelector((state) => state.CustomerStore.customer);
  const posts = useSelector((state) => state.PostStore.post);

  const [product, setProducts] = useState(null); 
  const [selectVariant, setSelectVariant] = useState(null); 
  const [countSellingProduct, setCountSellingProduct] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const orderRequest = {
    customerId: "",
    receiptDetailRequests: [{ productVariantId: "", quantity: "" }],
  };

  const relatedPosts = posts.filter(
    (post) =>
      post.productIds &&
      Array.isArray(post.productIds) &&
      post.productIds.includes(productId)
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true); // Bắt đầu tải dữ liệu
        const response = await productAPI.getByProductId(productId);
        if (response.data) {
          const fetchedProduct = response.data;
          setProducts(fetchedProduct);

          const availableVariant = fetchedProduct.variants?.find(
            (variant) => variant.stock > 0
          );
          setSelectVariant(availableVariant || fetchedProduct.variants[0]);

          // Tính số lượng đã bán
          if (sellingProduct.length > 0 && fetchedProduct.variants?.length > 0) {
            const variantId = fetchedProduct.variants[0].variantId; 
            const count = sellingProduct.filter(
              (item) => item.productVariant.variantId === variantId
            );
            setCountSellingProduct(count.length > 0 ? count[0].totalSold : 0);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      } finally {
        setIsLoading(false); // Kết thúc tải dữ liệu, bất kể thành công hay thất bại
      }
    };

    fetchProduct();
  }, [dispatch, productId, sellingProduct]); 

  const handleChangeQuantity = (e) => {
    let value = e.target.value.trim();
    if (value === "") {
      setQuantity("");
      return;
    }
    let num = parseInt(value, 10);
    if (selectVariant?.stock === 0) {
      setQuantity(0);
    }
    if (!isNaN(num) && num >= 1 && num <= 999) {
      setQuantity(num);
    }
  };

  const buyProduct = async () => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/login");
      return;
    }

    orderRequest.customerId = customer.customerId;
    orderRequest.receiptDetailRequests = [
      { productVariantId: selectVariant.variantId, quantity: quantity },
    ];

    if (quantity > selectVariant?.stock) {
      toast.error("Không đủ số lượng thêm vào giỏ hàng!", {
        position: "top-center",
        autoClose: 1500,
      });
    } else {
      await orderAPI.addOrder(orderRequest);
      dispatch(setCreateOrder(true));
      toast.success("Thêm sản phẩm vào giỏ thành công!", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  const handleNavigate = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleRetailerProfile = async () => {
    const getRetailer = retailerStore?.find(
      (item) =>
        item.retailerName.toLowerCase().trim() ===
        product?.retailerName.toLowerCase().trim()
    );
    if (getRetailer) {
      await dispatch(setRetailerProfile(getRetailer));
      navigate(`/retailer/${getRetailer.retailerId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Không tìm thấy sản phẩm!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center align-middle font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-8">
      <div className="text-sm">
        <h2 className="text-white text-right ml-auto bg-green-600 w-40 px-5">
          Chi tiết sản phẩm
        </h2>
        <hr className="text-green-600" />
      </div>

      <div className="section-2 mx-auto my-10 w-[85%] flex justify-center flex-row space-x-10 flex-wrap">
        <div className="box-image shadow-md w-[40%] border-2 rounded-xl border-green-600">
          <img
            src={product.productImage}
            className="w-full object-cover aspect-square p-2 rounded-2xl"
            alt={product.productName}
          />
        </div>

        <div className="box-content flex flex-col justify-between w-[52%]">
          <div>
            <h2 className="font-bold text-3xl mb-3">{product.productName}</h2>
            <div className="mb-3">
              <span>ĐÃ BÁN: </span>
              <span className="font-light">{countSellingProduct}</span>
            </div>
            <div className="mb-4">
              <span>XUẤT XỨ: </span>
              <span className="font-light">{product.productOrigin}</span>
            </div>
            <hr className="mb-2 text-green-600" />
          </div>

          <div>
            <p className="text-green-600 font-bold text-3xl mb-8">
              ₫{new Intl.NumberFormat("vi-VN").format(selectVariant?.price)}
            </p>
            <div className="mb-5">
              <span className="pr-2">LOẠI: </span>
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
            <div className="mb-5">
              <span>CÒN LẠI: </span>
              <span className="font-light">{selectVariant?.stock}</span>
            </div>
            <div className="mb-5">
              <span className="pr-3">SỐ LƯỢNG: </span>
              <input
                type="number"
                className={`border-1 px-2 rounded-sm w-15 ${
                  selectVariant?.stock === 0 ? "border-none" : ""
                }`}
                id="quantity"
                onChange={handleChangeQuantity}
                onBlur={() => quantity === "" && setQuantity(1)}
                value={selectVariant?.stock === 0 ? 0 : quantity}
              />
            </div>
            {selectVariant?.stock > 0 ? (
              <button
                onClick={buyProduct}
                className="cursor-pointer uppercase w-full bg-green-600 shadow-sm shadow-gray-400 p-3 rounded-2xl text-white text-base"
              >
                Thêm vào giỏ hàng
              </button>
            ) : (
              <button className="bg-red-600 w-full shadow-sm shadow-gray-400 p-2 text-white text-base">
                HIỆN TẠI HẾT HÀNG
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto my-10 w-[85%]">
        <div>
          <p
            onClick={handleRetailerProfile}
            title="Đến cửa hàng"
            className="text-xl hover:text-green-600 transition-all duration-300 ease-out flex cursor-pointer font-bold"
          >
            <BuildingStorefrontIcon className="h-7 w-7 mr-2" />
            {product.retailerName}
          </p>
          <hr className="my-2" />
        </div>

        <div className="section-3 justify-center space-x-8 flex-wrap mb-3">
          <h2>MÔ TẢ:</h2>
          <p className="font-light mx-auto" style={{ whiteSpace: "pre-wrap" }}>
            {product.productDesc}
          </p>
        </div>

        {relatedPosts.length > 0 && (
          <div className="my-5">
            <h2 className="uppercase pt-10">Bài viết liên quan:</h2>
            {relatedPosts.map((post) => (
              <div
                className="flex items-center max-w-100 gap-4 cursor-pointer p-3 rounded-lg shadow hover:border hover:border-green-300"
                key={post.postId}
                onClick={() => navigate(`/posts/${post.postId}`)}
              >
                <img
                  src={post.postImageUrl}
                  alt={post.postTitle}
                  className="w-20 h-20 object-cover rounded-sm"
                  onError={(e) => (e.target.src = "/fallback-image.jpg")}
                />
                <div>
                  <p className="text-gray-800 font-semibold">{post.postTitle}</p>
                  <p className="text-gray-600 text-sm line-clamp-3">{post.postContent}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="section-4 justify-center space-x-8 flex-wrap mb-3">
          <h2>LOẠI SẢN PHẨM:</h2>
          {Array.isArray(product.categoryName) &&
            product.categoryName.map((item, index) => (
              <p key={index} className="font-light mx-auto">
                {item}
              </p>
            ))}
        </div>
      </div>

      <div className="section-5">
        <h2 className="text-xl text-green-600">XEM THÊM</h2>
        <hr className="mb-5 text-green-600" />
        <div className="productItem align-middle grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 m-0">
          {productStore.slice(0, 5).map((item) => (
            <div key={item.productId} onClick={() => handleNavigate(item.productId)}>
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