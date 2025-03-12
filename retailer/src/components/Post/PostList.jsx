import React, { useState } from "react";
import CreatePost from "./CreatePost";

const PostList = ({retailer}) => {
  const [isAddPost, setIsAddPost] = useState(false);

  const handleAddPosts = () => {
    setIsAddPost(true);
  };

  const handleCancelPosts = () => {
    setIsAddPost(false);
  };

  return (
    <div>
      {!isAddPost ? (
        <button
          onClick={handleAddPosts}
          className="px-3 py-1 bg-amber-300 rounded-2xl cursor-pointer hover:bg-amber-400 transition-colors"
        >
          Add
        </button>
      ) : (
        <CreatePost retailerId={retailer?.retailerId} onCancel={handleCancelPosts} />
      )}
    </div>
  );
};

export default PostList;