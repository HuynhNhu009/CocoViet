import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setPostDetail } from "../../redux/postSlice";
import { postApi } from "../../services/postService";

const PostDetail = () => {
  const { postId } = useParams();
  const postDetail = useSelector((state) => state.PostStore.postDetail);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

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
          dispatch(setPostDetail(response.data));
        } catch (error) {
          console.error("Lỗi khi lấy thông tin bai viet:", error);
        }
      };
      fetchPost();
    }
  }, [postDetail, postId]);

  if (!postDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Bài viết không tồn tại!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 py-6 min-h-screen">
      <div className="lg:w-[70%] w-[90%] bg-white p-6 shadow-lg rounded-lg">
        {isLoading ? (
          <div className="text-center text-gray-600 text-lg font-semibold">
            Đang tải bài viết...
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-3xl text-center font-extrabold text-gray-800 mb-5">
                {postDetail.postTitle}
              </h2>

              <div className=" justify-between text-gray-600 text-sm mb-5">
                <span className="font-semibold">
                  Tác giả: {postDetail.authorPost}
                </span>
                <p>
                  {" "}
                  Ngày đăng:{" "}
                  {postDetail.publishTime
                    ?.split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/") || "N/A"}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <img
                  src={postDetail.postImageUrl}
                  alt="Hình minh họa cho bài viết"
                  className="w-fit h-120 aspect-video items-center self-center object-cover rounded-lg shadow-md"
                />
              </div>

              <p className="text-lg text-gray-700 mt-6 leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>
                {postDetail.postContent}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
