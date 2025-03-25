import React, { useEffect, useState } from "react";

const PostItem = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [savePosts, setSavePosts] = useState([]);

  const handleRowClick = (postId) => {
    setSelectedPost(postId === selectedPost ? null : postId);
  };

  useEffect(() => {
    if (posts) {
      const timeout = setTimeout(() => {
        setSavePosts(posts);
      }, 200);
  
      return () => clearTimeout(timeout); 
    }
  }, [posts]);
  
  return (
    <div className="w-full overflow-x-auto">
      {/* Mobile/Tablet View */}
      <div className="block md:hidden">
        {savePosts?.length > 0 ? (
          savePosts?.map((post, index) => (
            <div 
              key={post.postId} 
              className="bg-white shadow-md rounded-lg mb-4 p-4 border"
            >
              <div className="flex items-center mb-4">
                <img
                  src={post.postImageUrl}
                  alt={post.postTitle}
                  className="w-20 h-20 object-cover rounded-xl mr-4"
                />
                <div>
                  <h3 className="font-bold text-sm truncate max-w-[200px]">
                    {post.postTitle}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {post.authorPost}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Ngày đăng</p>
                  <p className="text-sm">
                    {post.publishTime
                      ?.split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/") || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Hành động</p>
                  <button className="w-full bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                    Xóa
                  </button>
                </div>
              </div>

              <div 
                onClick={() => handleRowClick(post.postId)}
                className="text-center bg-blue-50 py-2 rounded-md cursor-pointer"
              >
                {selectedPost === post.postId ? "Ẩn chi tiết" : "Xem chi tiết"}
              </div>

              {selectedPost === post.postId && (
                <div className="mt-4 bg-gray-100 p-3 rounded-md text-sm">
                  <p className="font-bold text-center mb-2">Chi tiết bài đăng:</p>
                  
                  <div className="flex justify-center mb-2">
                    <img
                      src={post.postImageUrl}
                      alt={post.postTitle}
                      className="w-fit aspect-video object-cover rounded-xl"
                    />
                  </div>
                  
                  <div className="mb-2">
                    <span className="font-semibold">Tiêu đề: </span>
                    <span>{post.postTitle}</span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="font-semibold">Nội dung: </span>
                    <span>{post.postContent}</span>
                  </div>
                  
                  <div>
                    <span className="font-semibold">Mô tả: </span>
                    <span>{post.postDesc}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 p-4">
            Không có bài viết nào.
          </div>
        )}
      </div>

      {/* Desktop View */}
      <table
        className="w-full border-collapse table-fixed min-w-full hidden md:table"
        title="Xem chi tiết"
      >
        <thead>
          <tr className="text-center bg-black text-white uppercase">
            <th className="p-3 text-sm w-12">STT</th>
            <th className="p-3 text-sm">Tiêu đề</th>
            <th className="p-3 text-sm">Tác giả</th>
            <th className="p-3 text-sm">Nội dung</th>
            <th className="p-3 text-sm">Ngày đăng</th>
            <th className="p-3 text-sm">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {savePosts?.length > 0 ? (
            savePosts?.map((post, index) => (
              <React.Fragment key={post.postId}>
                <tr
                  className={`cursor-pointer hover:bg-gray-100 mb-4 ${
                    selectedPost === post.postId ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleRowClick(post.postId)}
                >
                  <td className="p-1 text-center">{index + 1}</td>
                  <td className="flex pl-5 items-center text-center gap-2">
                    <img
                      src={post.postImageUrl}
                      alt={post.postTitle}
                      className="w-26 h-26 object-cover p-2 rounded-xl"
                    />
                    <span className="text-center truncate max-w-xs overflow-hidden">
                      {post.postTitle}
                    </span>
                  </td>
                  <td className="p-1 text-center">{post.authorPost}</td>
                  <td className="p-3 truncate max-w-xs overflow-hidden">
                    {post.postContent}
                  </td>
                  <td className="text-center">
                    {post.publishTime
                      ?.split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/") || "N/A"}
                  </td>
                  <td className="p-3 text-center">
                    <button 
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
                {selectedPost === post.postId && (
                  <tr className="bg-gray-100 mb-4">
                    <td colSpan={6} className="p-3 text-gray-700 px-18">
                      <p className="bg-gray-200 font-bold text-center mb-2">
                        Chi tiết bài đăng:
                      </p>
                      <div className="flex justify-center mb-2">
                        <img
                          src={post.postImageUrl}
                          alt={post.postTitle}
                          className="w-fit aspect-video object-cover rounded-xl"
                        />
                      </div>
                      <div className="mb-2">
                        <span className="font-semibold">Tiêu đề: </span>
                        <span className="font-light">{post.postTitle}</span>
                      </div>
                      <div className="mb-2">
                        <span className="font-semibold">Nội dung: </span>
                        <span className="font-light">{post.postContent}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Mô tả: </span>
                        <span className="font-light">{post.postDesc}</span>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-3 text-center text-gray-500">
                Không có bài viết nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostItem;