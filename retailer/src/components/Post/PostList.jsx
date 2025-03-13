import React, { useState } from "react";
import CreatePost from "./CreatePost";
import PostItem from "./PostItem";

const PostList = ({ retailer, posts }) => {
  const [isAddPost, setIsAddPost] = useState(false);

  const handleAddPosts = () => {
    setIsAddPost(true);
  };

  const handleCancelPosts = () => {
    setIsAddPost(false);
  };

  console.log("Post List", posts);

  return (
    <div className="min-h-screen p-6"> {/* Adjusted min-h and added padding */}
      {!isAddPost && (
        <button
          onClick={handleAddPosts}
          className="px-3 py-1 bg-amber-300 rounded-2xl cursor-pointer hover:bg-amber-400 transition-colors mb-6"
        >
          Add
        </button>
      )}
      {!isAddPost ? (
        <div className=""> {/* 2-column grid */}
          {posts.map((post) => (
            <PostItem key={post.postId} post={post} /> // Used postId as key
          ))}
        </div>
      ) : (
        <CreatePost
          retailerId={retailer?.retailerId}
          onCancel={handleCancelPosts}
        />
      )}
    </div>
  );
};

export default PostList;