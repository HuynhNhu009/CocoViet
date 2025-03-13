import React, { useState, useCallback } from "react";
import CreatePost from "./CreatePost";
import PostItem from "./PostItem";
import { PlusIcon } from "@heroicons/react/24/outline";
import PostEdit from "./PostEdit";
import { postApi } from "../../services/PostService";

const PostList = ({ retailer, posts, fetchPosts }) => {
  const [viewState, setViewState] = useState({
    mode: "list", // "list" | "add" | "edit"
    error: null,
    success: null,
  });
  const [selectedPost, setSelectedPost] = useState(null);

  // Helper function to clear messages after 3 seconds
  const clearMessages = useCallback(() => {
    setTimeout(() => {
      setViewState((prev) => ({ ...prev, error: null, success: null }));
    }, 3000); // 3 seconds
  }, []);

  const handleAddPosts = useCallback(() => {
    setViewState({ mode: "add", error: null, success: null });
    setSelectedPost(null);
  }, []);

  const handleCancel = useCallback(() => {
    setViewState({ mode: "list", error: null, success: null });
    setSelectedPost(null);
  }, []);

  const handleEditPost = useCallback((post) => {
    setSelectedPost(post);
    setViewState({ mode: "edit", error: null, success: null });
  }, []);

  const handleSaveAdd = useCallback(
    (postTitle) => {
      setViewState({
        mode: "list",
        error: null,
        success: `Đã thêm bài đăng ${postTitle}!`,
      });
      fetchPosts();
      clearMessages(); // Clear message after 3 seconds
    },
    [fetchPosts, clearMessages]
  );

  const handleSaveUpdate = useCallback(
    (updatedPost) => {
      if (updatedPost) {
        setSelectedPost(updatedPost);
        fetchPosts();
        setViewState({
          mode: "list",
          error: null,
          success: `Đã sửa bài đăng ${updatedPost.postTitle}!`,
        });
        clearMessages(); // Clear message after 3 seconds
      } else {
        setViewState({ mode: "list", error: null, success: null });
      }
    },
    [fetchPosts, clearMessages]
  );

  const handleDeletePost = useCallback(
    async (postId, postTitle) => {
      try {
        const response = await postApi.deletePostById(postId);
        fetchPosts();
        setViewState({
          mode: "list",
          error: null,
          success: `Bài viết ${postTitle} đã xóa thành công!!`,
        });
        clearMessages(); // Clear message after 3 seconds
      } catch (error) {
        console.error("Delete error:", error);
        setViewState({
          mode: "list",
          error: "Failed to delete post: " + error.message,
          success: null,
        });
        clearMessages(); // Clear error message after 3 seconds
      }
    },
    [fetchPosts, clearMessages]
  );

  const ErrorMessage = ({ message }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-sm my-2">
      {message}
    </div>
  );

  const SuccessMessage = ({ message }) => (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-sm my-2">
      {message}
    </div>
  );

  return (
    <div className="min-h-screen px-6 flex flex-col gap-2">
      {viewState.mode === "list" && (
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
            {viewState.error && <ErrorMessage message={viewState.error} />}
            {viewState.success && <SuccessMessage message={viewState.success} />}
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostItem
                  key={post.postId}
                  post={post}
                  isEdit={handleEditPost}
                  setPost={setSelectedPost}
                  deletePost={(postId) => handleDeletePost(postId, post.postTitle)} // Pass postTitle
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                Bạn chưa có bài viết nào!!</p>
            )}
          </div>
        </div>
      )}

      {viewState.mode === "add" && (
        <>
          {viewState.error && <ErrorMessage message={viewState.error} />}
          {viewState.success && <SuccessMessage message={viewState.success} />}
          <CreatePost
            retailerId={retailer?.retailerId}
            onCancel={handleCancel}
            onSave={handleSaveAdd}
          />
        </>
      )}

      {viewState.mode === "edit" && selectedPost && (
        <>
          {viewState.error && <ErrorMessage message={viewState.error} />}
          {viewState.success && <SuccessMessage message={viewState.success} />}
          <PostEdit
            post={selectedPost}
            onSave={handleSaveUpdate}
            onCancel={handleCancel}
          />
        </>
      )}
    </div>
  );
};

export default PostList;