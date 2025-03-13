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
  const [isLoading, setIsLoading] = useState(false); // Loading state for modal

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
    setIsLoading(true); // Show modal
    try {
      console.log("New post:", newPost);
      const response = await postApi.createPosts(newPost, file);
      console.log("Update response", response.data);
      setNewPost({ postTitle: "", postContent: "", retailerId: retailerId }); // Reset form
      onSave(newPost.postTitle); // Close form on success
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false); // Hide modal
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
          placeholder="Tiêu đề bài đăng."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-green-600"
          disabled={isLoading} // Disable input during loading
        />
        <textarea
          name="postContent"
          value={newPost.postContent}
          onChange={handleInputChange}
          placeholder="Nội dung."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-green-600"
          rows="10"
          disabled={isLoading} // Disable textarea during loading
        />

        <UploadImage onImageChange={handleSetFile} />

        <div className="flex justify-center space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
            disabled={isLoading} // Disable cancel button during loading
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-300 rounded-md hover:bg-amber-400 transition-colors disabled:opacity-50"
            disabled={isLoading} // Disable submit button during loading
          >
            {isLoading ? "Đang tạo..." : "Submit"}
          </button>
        </div>
      </form>

      {/* Loading Modal */}
      {isLoading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            <p className="mt-4 text-gray-700">Đang xử lý...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;