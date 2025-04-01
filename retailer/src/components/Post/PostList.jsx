import React, { useState, useCallback } from "react";
import CreatePost from "./CreatePost";
import PostItem from "./PostItem";
import { PlusIcon } from "@heroicons/react/24/outline";
import PostEdit from "./PostEdit";
import { postApi } from "../../services/PostService";

const PostList = ({ retailer, posts, fetchPosts, products = [], fetchProducts }) => {
  const [viewState, setViewState] = useState({
    mode: "list",
    error: null,
    success: null,
  });
  const [selectedPost, setSelectedPost] = useState(null);

  const clearMessages = useCallback(() => {
    setTimeout(() => {
      setViewState((prev) => ({ ...prev, error: null, success: null }));
    }, 3000); // 3 seconds
  }, []);

  const handleAddPosts = useCallback(() => {
    console.log("handleAddPosts called!");
    fetchProducts(); // Gọi fetchProducts để cập nhật danh sách sản phẩm
    setViewState({ mode: "add", error: null, success: null });
    setSelectedPost(null);
  }, [fetchProducts]);

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
      clearMessages();
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
        clearMessages();
      } else {
        setViewState({ mode: "list", error: null, success: null });
      }
    },
    [fetchPosts, clearMessages]
  );

  const handleDeletePost = useCallback(
    async (postId, postTitle) => {
      try {
        await postApi.deletePostById(postId);
        fetchPosts();
        setViewState({
          mode: "list",
          error: null,
          success: `Bài viết ${postTitle} đã xóa thành công!!`,
        });
        clearMessages();
      } catch (error) {
        console.error("Delete error:", error);
        setViewState({
          mode: "list",
          error: "Failed to delete post: " + error.message,
          success: null,
        });
        clearMessages();
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

  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = a.publishTime ? new Date(a.publishTime) : new Date(0);
    const dateB = b.publishTime ? new Date(b.publishTime) : new Date(0);
    return dateB - dateA;
  });

  // Hàm lọc sản phẩm liên quan đến bài viết
  const getRelatedProducts = (productIds) => {
    if (!productIds || !products || products.length === 0) return [];
    return products.filter((product) => productIds.includes(product.id));
  };

  return (
    <div className="min-h-[85vh] flex flex-col gap-2">
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
            {sortedPosts.length > 0 ? (
              sortedPosts.map((post) => (
                <PostItem
                  key={post.postId}
                  post={post}
                  isEdit={handleEditPost}
                  setPost={setSelectedPost}
                  deletePost={(postId) => handleDeletePost(postId, post.postTitle)}
                  products={getRelatedProducts(post.productIds)} // Truyền sản phẩm liên quan
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                Bạn chưa có bài viết nào!!
              </p>
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
            products={products}
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
            products={products}
          />
        </>
      )}
    </div>
  );
};

export default PostList;