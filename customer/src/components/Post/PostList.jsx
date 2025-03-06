import { useSelector } from "react-redux";
import PostCard from "./PostCard";

const PostList = () => {

  const posts = useSelector((state) => state.PostStore.post);

  return (
    <div className="flex flex-col md:flex-row gap-4s">
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
