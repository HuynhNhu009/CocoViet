import React, { useState } from "react";
import UploadImage from "../UpLoadImage";
import { postApi } from "../../services/PostService";

const CreatePost = ({retailerId, onCancel }) => {
  const [newPost, setNewPost] = useState({
    postTitle: "",
    postContent: "",
    retailerId: retailerId,
  });

  const [file, setFile] = useState(null);

  const handleSetFile = (file)=>{
    setFile(file);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("New post:", newPost);
    const response = await postApi.createPosts(newPost, file);

    console.log("Update response", response.data);

    setNewPost({ title: "", content: "" });
    onCancel();
  };

  return (
    <div className="flex flex-col min-h-[100px] mt-10 pb-10 rounded-sm justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="postTitle"
          value={newPost.title}
          onChange={handleInputChange}
          placeholder="Tiêu đề bài đăng."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-green-600"
        />
        <textarea
          name="postContent"
          value={newPost.content}
          onChange={handleInputChange}
          placeholder="Nội dung."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-green-600"
          rows="10"
        />

        <UploadImage onImageChange={handleSetFile} />

        
        <div className="flex justify-center space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-300 rounded-md hover:bg-amber-400 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;