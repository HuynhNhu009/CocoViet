import { useSelector } from "react-redux";
import PostCard from "./PostCard";

const PostList = () => {

  const posts = useSelector((state) => state.PostStore.post);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:w-[80%] w-[90%] mx-auto md:my-[20px]">
      {posts.length>0 ? (
        posts.map((item) => (
          <div key={item.postTitle}>
            <PostCard post={item}></PostCard>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          Không có sản phẩm nào trong danh mục này.
        </p>
      )}
    </div>
  );
};

export default PostList;
