import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

const PostList = () => {
  const posts = useSelector((state) => state.PostStore.post);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/post/${id}`); // Chuyển đến trang chi tiết bài viết
  };

  return (
    <div
      onClick={() => handleClick(posts.id)} 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:w-[80%] w-[90%] mx-auto md:my-[20px]">
      {posts.length > 0 ? (
        posts.map((item) => (
          <div key={item.postTitle}>
            <PostCard post={item}></PostCard>
          </div>
        ))
      ) : (
        <p className="lg:w-[80%] w-full mx-auto ">
          <img
            src="https://img.freepik.com/premium-vector/error-404-page-found-banner-linear-style-vector-icon_399089-17761.jpg"
            alt="Không tìm thấy bất kỳ bài viết nào" 
            className="w-full aspect-video"
          />
        </p>
      )}
    </div>
  );
};

export default PostList;
