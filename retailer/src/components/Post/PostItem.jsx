import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

const PostItem = ({ post, isEdit, setPost, deletePost }) => {
  return (
    <div className="min-h-50 w-290 p-5 mt-2 mb-5 flex flex-row gap-2 border border-gray-200 rounded-sm shadow-md hover:shadow-lg transition-all ">
      <img
        className="w-60 h-fit mt-4 rounded-sm object-cover"
        src={post.postImageUrl}
        alt={post.postTitle || "post image"}
        onError={(e) => (e.target.src = "/fallback-image.jpg")}
      />
      <div className="flex flex-col gap-2 ml-4 flex-1 p-2">
        <p className="text-xl uppercase font-bold">{post.postTitle}</p>
        <div className="overflow-hidden">
          <p className="text-base text-justify ">{post.postContent}</p>{" "}
          {/* Allows 5 lines, then ellipsis */}
        </div>
        <div className="flex justify-end mt-auto gap-4">
          <button
            className="p-1 text-green-600 hover:text-green-800 transition-colors cursor-pointer"
            onClick={() => isEdit(post)}
            aria-label={`Edit ${post.postTitle}`}
          >
            <PencilSquareIcon className="size-5" />
          </button>
          <button
            className="p-1 text-red-600 hover:text-red-800 transition-colors cursor-pointer"
            onClick={() => deletePost(post.postId, post.postTitle)}
            aria-label={`Delete ${post.postTitle}`}
          >
            <TrashIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
