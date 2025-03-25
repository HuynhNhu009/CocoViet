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
    <div className="shadow rounded-md cursor-pointer transition-transform duration-300 hover:scale-105">
      <ul
        className="h-72 transition-opacity duration-700
        text-black flex flex-col bg-gray-50 hover:border-green-500 hover:border-1 group"
      >
        <li className="h-48 w-full">
          <img
            src={post?.postImageUrl}
            alt={`Product ${55}`}
            className="w-full h-full object-cover"
          />
        </li>
        <div className="p-2 h-25">
          <p className="h-10 sm:text-sm text-sm font-semibold max-w-full line-clamp-2 group-hover:text-green-600">
            {post?.postTitle}
          </p>
          <p className="font-light h-5 text-sm mt-2">{post?.authorPost}</p>
          <p className="font-extralight text-xs h-4 text-right pr-2">
            {post?.publishTime?.split("T")[0].split("-").reverse().join("/") ||
              "N/A"}
          </p>
        </div>
      </ul>
    </div>
  );
};

export default PostCard;
