import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const PostItem = ({ post, isEdit, deletePost, products }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="min-h-50 lg:w-full p-5 mt-2 mb-5 flex flex-row gap-2 border border-gray-200 rounded-sm shadow-md hover:shadow-lg transition-all">
      <img
        className="lg:w-70 w-20 h-fit mt-4 rounded-sm object-cover"
        src={post.postImageUrl}
        alt={post.postTitle || "post image"}
        onError={(e) => (e.target.src = "/fallback-image.jpg")}
      />
      <div className="flex flex-col gap-2 ml-4 flex-1 p-2">
        <p className="text-xl uppercase font-bold">{post.postTitle}</p>
        <p className="font-extralight text-sm h-4 pr-2">
          <span className="font-semibold">Ngày đăng: </span>
          {post?.publishTime?.split("T")[0].split("-").reverse().join("/") || "N/A"}
        </p>
        <div>
          {products && products.length > 0 ? (
            <div className="mt-2">
              <p className="font-semibold text-sm">Sản phẩm liên quan:</p>
              <div className="flex flex-row gap-2 mt-1">
                {products.map((product) => (
                  <div key={product.id} className="flex border border-green-600 rounded-sm items-center gap-2">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-10 h-10 object-cover rounded-sm"
                      onError={(e) => (e.target.src = "/fallback-image.jpg")}
                    />
                    <span className="text-sm p-2">{product.productName}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Không có sản phẩm liên quan.</p>
          )}
        </div>

        <div className="overflow-hidden pt-2">
          <p
            className="text-base text-justify"
            style={{
              whiteSpace: "pre-wrap",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: isExpanded ? "unset" : 2, // Giới hạn 2 dòng khi chưa mở rộng
              overflow: "hidden",
            }}
          >
            {post.postContent}
          </p>
          {post.postContent && post.postContent.split('\n').length > 2 && (
            <button
              onClick={toggleExpand}
              className="text-blue-600 hover:text-blue-800 text-sm mt-1"
            >
              {isExpanded ? "Thu gọn" : "Xem thêm"}
            </button>
          )}
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