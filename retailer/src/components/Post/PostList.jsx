import React, { useState } from "react";
import CreatePost from "./CreatePost";
import PostItem from "./PostItem";
import { PlusIcon } from "@heroicons/react/24/outline";
import PostEdit from "./PostEdit";

const PostList = ({ retailer, posts }) => {
  const [isAddPost, setIsAddPost] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [isList, setIsList] = useState(true);
  const [post, setPost] = useState({});
  const handleAddPosts = () => {
    setIsAddPost(true);
    setIsList(false);
  };

  const handleCancelPosts = () => {
    setIsAddPost(false);
    setIsList(true);
    setIsEditPost(false);
  };

  const handleEditPost = (post) => {
    setPost(post); // Lưu bài viết đang chỉnh sửa
    setIsEditPost(true); // Hiển thị màn hình chỉnh sửa
    setIsAddPost(false);
    setIsList(false);
  };

  console.log("Post List", posts);

  return (
    <div className="min-h-screen px-6 flex flex-col gap-2">
      {/* Adjusted min-h and added padding */}

      {isEditPost && <PostEdit post={post} />}

      {isList ? (
        <div>
          <div className="flex justify-end w-full">
            <button
              onClick={handleAddPosts}
              className="px-3 py-1 w-10 flex justify-center items-center bg-gray-200 rounded-sm cursor-pointer hover:bg-gray-300 transition-colors"
            >
              <PlusIcon className="size-5" />
            </button>
          </div>
          <div className="flex-col">
            {posts.map((post) => (
              <PostItem
                key={post.postId}
                post={post}
                isEdit={handleEditPost}
                setPost={setPost}
              /> // Used postId as key
            ))}
          </div>
        </div>
      ) : (
        isAddPost && (
          <CreatePost
            retailerId={retailer?.retailerId}
            onCancel={handleCancelPosts}
          />
        )
      )}
    </div>
  );
};

export default PostList;
