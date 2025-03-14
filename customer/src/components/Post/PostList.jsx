import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import { setPostDetail } from "../../redux/postSlice";

const PostList = () => {
  const posts = useSelector((state) => state.PostStore.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (postId) => {
    const findByPostId = posts.find((item) => item.postId === postId);

    if (findByPostId) {
      dispatch(setPostDetail({}));
      dispatch(setPostDetail(findByPostId));
      navigate(`/blog/${postId}`);
    } else {
      console.log("Post not found!");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:w-[80%] w-[90%] mx-auto md:my-[20px]">
      {posts.length > 0 ? (
        posts.map((item) => (
          <div key={item.postId} onClick={() => handleClick(item.postId)}>
            <PostCard post={item} />
          </div>
        ))
      ) : (
        <p className="lg:w-[80%] w-full mx-auto ">
          {/* <img
            src="https://img.freepik.com/premium-vector/error-404-page-found-banner-linear-style-vector-icon_399089-17761.jpg"
            alt="Không tìm thấy bất kỳ bài viết nào"
            className="w-full aspect-video"
          /> */}
          Chưa có bài viết nào.
        </p>
      )}
    </div>
  );
};

export default PostList;
