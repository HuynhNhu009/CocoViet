import {
  ArchiveBoxArrowDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import UploadImage from "../UpLoadImage";
import { postApi } from "../../services/PostService";

const PostEdit = ({ post, onSave, onCancel }) => {
  console.log("Post edit", post);

  const [postData, setPostData] = useState({});
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false); 
  const [preview, setPreview] = useState(null);
  const handleEditPost = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
    console.log(postData);
  };

  const getDisplayValue = (field) => {
    return postData[field] !== undefined ? postData[field] : post[field] || "";
  };

  const handleImageUpload = (selectedFile) => {
    setImage(selectedFile); 
  };

  const submitEditPost = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      console.log(postData);
      const response = await postApi.updatePostById(post.postId, postData, image);
      onSave(response.data);
      console.log("Update Post----", response.data);
    } catch (error) {
      console.log(error);
      onSave(post); 
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex flex-col mt-5">
      <p className="text-lg uppercase font-semibold underline text-gray-700">Sửa bài viết</p>
      <div className="flex flex-row">
        <div className="w-[800px] mr-5">
          <img
            className="w-full h-fit object-contain mt-2"
            src={preview || post.postImageUrl}
            alt=""
          />
          <UploadImage className={"mt-5"} onImageChange={handleImageUpload} setImagePreview={setPreview} isDisplay={false}/>
        </div>

        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col">
            <label className="text-lg">Tiêu đề:</label>
            <textarea
              name="postTitle"
              value={getDisplayValue("postTitle")}
              onChange={handleEditPost}
              type="text"
              className="p-2 text-xl focus:ring-0 border-1 rounded-sm focus:outline-none focus:border-green-300"
              disabled={isLoading}
              
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg">Nội dung:</label>
            <textarea
              name="postContent"
              value={getDisplayValue("postContent")}
              onChange={handleEditPost}
              type="text"
              className="min-h-80 p-2 text-xl focus:ring-0 border-1 rounded-sm focus:outline-none focus:border-green-300"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mx-auto mt-5">
        <button onClick={onCancel} disabled={isLoading}>
          <p className="w-25 flex items-center justify-center px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md cursor-pointer disabled:opacity-50">
            <XMarkIcon className="size-5 mr-2" />
            Hủy
          </p>
        </button>
        <button onClick={submitEditPost} disabled={isLoading}>
          <p className="w-25 flex items-center justify-center px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md cursor-pointer disabled:opacity-50">
            {isLoading ? (
              <span className="animate-pulse">Đang lưu...</span>
            ) : (
              <>
                <ArchiveBoxArrowDownIcon className="size-5 mr-2" />
                Lưu
              </>
            )}
          </p>
        </button>
      </div>
    </div>
  );
};

export default PostEdit;