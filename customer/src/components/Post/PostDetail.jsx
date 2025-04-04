import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setPostDetail } from "../../redux/postSlice";
import { postApi } from "../../services/postService";

const PostDetail = () => {
  const { postId } = useParams();
  const postDetail = useSelector((state) => state.PostStore.postDetail);
  const products = useSelector((state) => state.ProductStore.productStore);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!postDetail || Object.keys(postDetail).length === 0) {
      const fetchPost = async () => {
        try {
          const response = await postApi.getByPostId(postId);
          console.log(response.data)
          dispatch(setPostDetail(response.data));
        } catch (error) {
          console.error("Lỗi khi lấy thông tin bài viết:", error);
        }
      };
      fetchPost();
    }
  }, [postDetail, postId, dispatch]);

  const filteredProducts = products.filter(product => 
    postDetail?.productIds?.includes(product.productId)
  );


  console.log(filteredProducts)

  if (!postDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700 font-semibold">Bài viết không tồn tại!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 sm:px-[5vw] lg:px-[7vw] py-5 sm:py-10 items-center bg-gray-100 py-8 min-h-screen">
      <div className="w-full min-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột bài viết */}
        <div className="md:col-span-2 bg-white p-6 sm:p-10 shadow-lg rounded-lg">
          {isLoading ? (
            <div className="text-center text-gray-600 text-lg font-semibold animate-pulse">
              Đang tải bài viết...
            </div>
          ) : (
            <>
              <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
                {postDetail.postTitle}
              </h2>
              <div className="flex flex-col sm:flex-row justify-between text-gray-600 text-sm mb-6">
                <p
                  className="font-semibold cursor-pointer hover:text-blue-600"
                  onClick={() => navigate(`/retailer/${postDetail.authorId}`)}
                >
                  Tác giả: {postDetail.authorPost}
                </p>
                <p>
                  Ngày đăng: {postDetail.publishTime?.split("T")[0].split("-").reverse().join("/") || "N/A"}
                </p>
              </div>
              <div className="flex items-center justify-center mb-6">
                <img
                  src={postDetail.postImageUrl}
                  alt="Hình minh họa bài viết"
                  className="w-full  object-cover rounded-lg shadow-md"
                />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {postDetail.postContent}
              </p>
            </>
          )}
        </div>
        
        {/* Cột sản phẩm */}
        <div className="bg-white h-fit p-6 shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sản phẩm liên quan</h3>
          <div className="space-y-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.productId} onClick={()=> navigate(`/products/${product.productId}`)} className="flex items-center gap-4 cursor-pointer p-3 rounded-lg shadow hover:border hover:border-green-300">
                  <img src={product.productImage} alt={product.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <p className="text-gray-800 font-semibold">{product.productName}</p>
                    <p className="text-gray-600 text-sm line-clamp-3">Giá: {product.productDesc}đ</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">Không có sản phẩm liên quan</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
