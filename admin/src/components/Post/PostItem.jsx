import React, { useState } from "react";

const PostItem = ({ posts }) => {
  const [selectedpost, setSelectedpost] = useState(null);
  const handleRowClick = (postId) => {
    setSelectedpost(postId === selectedpost ? null : postId);
  };

  return (
    <>
      <table className="w-full border-collapse ">
        <thead>
          <tr className="text-center bg-black text-white uppercase">
            <th className="p-3 text-sm">STT</th>
            <th className="p-3 text-sm">Tiêu đề</th>
            <th className="p-3 text-sm">Tác giả</th>
            <th className="p-3 text-sm">Nội dung</th>
            <th className="p-3 text-sm">Ngày đăng</th>
            <th className="p-3 text-sm">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts?.map((post, index) => (
              <React.Fragment key={post.postId}>
                <tr
                  className={`cursor-pointer hover:bg-gray-100 mb-4 ${
                    selectedpost === post.postId ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleRowClick(post.postId)}
                >
                  <td className="p-1 text-center">{index + 1}</td>
                  <td className="flex items-center gap-2">
                    <img
                      src={post.postImageUrl}
                      alt={post.postTitle}
                      className="w-26 h-26 object-cover p-2 rounded-xl"
                    />
                    <span className=" text-center truncate max-w-xs overflow-hidden">
                      {post.postTitle}
                    </span>
                  </td>
                  {/* <td className="p-1 text-center ">{post.retailerName}</td> */}
                  <td className="p-3 max-w-xs text-center overflow-hidden ">
                    {post.authorPost}
                  </td>
                  <td className="p-3 truncate max-w-xs overflow-hidden ">
                    {post.postContent}
                  </td>
                  <td className="p-3 text-center max-w-xs overflow-hidden ">
                    {post.publishTime
                      ?.split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/") || "N/A"}
                  </td>
                  <td className="p-3 text-center">
                    <button className="bg-red-500 text-white px-3 py-1 ml-2 rounded-md">
                      Xóa
                    </button>
                  </td>
                </tr>
                {selectedpost === post.postId && (
                  <tr className="bg-gray-100 w-full mb-4">
                    <td colSpan={6} className="p-3 text-gray-700 px-18">
                      <p className="bg-gray-200 font-bold text-center">
                        Chi tiết bài đăng:
                      </p>
                      <p className="font-bold text-2xl">{post.postTitle} </p>
                      <p>
                        {post.publishTime
                          ?.split("T")[0]
                          .split("-")
                          .reverse()
                          .join("/") || "N/A"}{" "}
                      </p>

                      <div className="flex justify-center">
                        <img
                          src={post.postImageUrl}
                          alt={post.postTitle}
                          className="w-fit aspect-video object-cover p-2 rounded-xl"
                        />
                      </div>
                      <p>{post.postContent}</p>
                      <span className="font-light">{post.postDesc}</span>
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
    </>
  );
};

export default PostItem;
