import { useSelector } from "react-redux";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";

const PostList = () => {
//   const [listPost, setListPost] = useState([]);

  const posts = useSelector((state) => state.PostStore.post);

  console.log(posts);
  

// console.log("Post at PostList ============",posts.length);

  
//   useEffect(() => {
//       console.log("Post at  ============", posts);
//     if (posts.length > 0) {
//       setListPost(posts);
//       console.log("Post at IFFF ============", posts);
//     }
//   }, [posts]);

//   console.log("Post at PostList ============", listPost);

  return (
    <>
      {posts != null ? (
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
    </>
  );
};

export default PostList;
