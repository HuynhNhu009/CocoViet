const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-100 pb-[20px] px-[20px] mx-[10px] my-[10px] shadow rounded-md cursor-pointer transition-transform duration-300 hover:scale-105">
      <div>
        <img
          src={
            post.postImageUrl
              ? post.postImageUrl
              : `https://api.dicebear.com/9.x/thumbs/svg`
          }
          alt="Người bán"
          className="w-full h-[200px] object-cover pt-5 rounded-tl-md rounded-tr-md"
        />
        <div className="mx-[10px]">
          <h3 className="text-lg font-bold truncate-text line-clamp-2 ">
            {post.postTitle}
          </h3>
          <div className="flex flex-col mt-[5px]">
            <h4 className="text-base text-gray-600 text-left truncate-text w-50 line-clamp-1 opacity-70">
              Tác giả: {post.authorPost}
            </h4>
            <h4 className="text-sm text-right w-full mt-[5px] mr-[2px] opacity-60">
              {post.publishTime?.split("T")[0].split("-").reverse().join("/") ||
                "N/A"}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
