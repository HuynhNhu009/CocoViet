import {
  ArchiveBoxArrowDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import UploadImage from "../UpLoadImage";
import { postApi } from "../../services/PostService";

const PostEdit = ({ post }) => {
  console.log("Post edit", post);

  const [postData, setPostData] = useState({});
  const [image, setImage] = useState();

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

  const  submitEditPost = async (e)=>{
    e.preventDefault();
    try{
        console.log(postData)
        const response = await postApi.updatePostById(post.postId, postData, image);
        console.log("Update Post----", response.data);
    }catch(error){
        console.log(error);
    }
  }

  return (
    <div className="flex flex-col mt-5">
      <div className="flex flex-row">
        <div>
          <img
            className="w-fit h-[80%] object-cover mt-5"
            src={post.postImageUrl}
            alt=""
          />

          <UploadImage className={"mt-5"} onImageChange={handleImageUpload} />
        </div>

        <div className="flex flex-col w-full ml-10 gap-4">
          <div className="flex flex-col">
            <label htmlFor="postTitle">Post Title</label>
            <input
              name="postTitle"
              value={getDisplayValue("postTitle")}
              onChange={handleEditPost}
              type="text"
              className="p-2 text-xl focus:ring-0 border-1 rounded-sm focus:outline-none focus:border-green-300 "
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="postTitle">Post Content</label>
            <textarea
              name="postContent"
              value={getDisplayValue("postContent")}
              onChange={handleEditPost}
              type="text"
              className="min-h-80 p-2 text-xl focus:ring-0 border-1 rounded-sm focus:outline-none focus:border-green-300 "
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mx-auto mt-5">
        <button>
          <p className="w-25 flex items-center justify-center px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md cursor-pointer">
            <XMarkIcon className="size-5 mr-2" />
            Hủy
          </p>
        </button>
        <button onClick={submitEditPost}>
          <p
           className=" w-25 flex items-center justify-center px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md cursor-pointer">
            <ArchiveBoxArrowDownIcon className="size-5 mr-2" />
            Lưu
          </p>
        </button>
      </div>
    </div>
  );
};

export default PostEdit;
