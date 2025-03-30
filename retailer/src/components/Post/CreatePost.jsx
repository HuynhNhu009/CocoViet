import React, { useState } from "react";
import UploadImage from "../UpLoadImage";
import { postApi } from "../../services/PostService";

const CreatePost = ({ retailerId, onSave, onCancel }) => {
  const [newPost, setNewPost] = useState({
    postTitle: "",
    postContent: "",
    retailerId: retailerId,
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("Đang xử lý..."); // Thêm state cho thông điệp modal
  const [modalError, setModalError] = useState(false); // Thêm state cho trạng thái lỗi

  const handleSetFile = (file) => {
    setFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setModalMessage("Đang tạo bài viết...");
    setModalError(false);

    try {
      console.log("New post:", newPost);
      const response = await postApi.createPosts(newPost, file);
      console.log("Create response", response.data);
      setNewPost({ postTitle: "", postContent: "", retailerId: retailerId });
      onSave(newPost.postTitle);
    } catch (error) {
      console.error("Error creating post:", error);
      setModalMessage("Lỗi khi tạo bài viết!");
      setModalError(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } finally {
      if (!modalError) {
        setIsLoading(false); 
      }
    }
  };

  return (
    <div className="flex flex-col min-h-[100px] mt-10 pb-10 rounded-sm justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="postTitle"
          value={newPost.postTitle}
          onChange={handleInputChange}
          placeholder="Tiêu đề bài đăng"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-green-600"
          disabled={isLoading}
        />
        <textarea
          name="postContent"
          value={newPost.postContent}
          onChange={handleInputChange}
          placeholder="Nội dung"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-green-600"
          rows="10"
          disabled={isLoading}
        />

        <UploadImage onImageChange={handleSetFile} />

        <div className="flex justify-center space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-300 rounded-md hover:bg-amber-400 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Đang tạo..." : "Submit"}
          </button>
        </div>
      </form>

      {/* Loading Modal */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100/80">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <svg
              className="animate-spin h-16 w-16 text-green-600"
              viewBox="0 0 32 32"
            >
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                className="opacity-25"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="44 88"
                strokeDashoffset="0"
                fill="none"
                className="opacity-75"
              />
            </svg>
            <p
              className={`text-lg ${
                modalError ? "text-red-600" : "text-gray-800"
              }`}
            >
              {modalMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
