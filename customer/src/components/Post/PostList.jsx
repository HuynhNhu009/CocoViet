import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

const PostList = () => {
  const posts = useSelector((state) => state.PostStore.post);
  const navigate = useNavigate();

  const handleClick = (postId) => {
    const findByPostId = posts.find((item) => item.postId === postId);

    if (findByPostId) {

      navigate(`/posts/${postId}`);
    } else {
      console.log("Post not found!");
    }
  };

  return (
    posts.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:w-[80%] w-[90%] mx-auto md:my-[20px]">
        {posts.map((item) => (
          <div key={item.postId} onClick={() => handleClick(item.postId)}>
            <PostCard post={item} />
          </div>
        ))}
      </div>
    ) : (
      <div className="w-full flex items-center justify-center min-h-[200px]">
        <p className="text-center px-4 py-2 rounded-md">
          Chưa có bài viết nào.
        </p>
      </div>
    )
  );
}  

export default PostList;
