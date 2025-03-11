import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { postId } = useParams();
  const postDetail = useSelector((state) => state.PostStore.postDetail);

  if (!postDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Bài viết không tồn tại!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 py-10 min-h-screen">
      <div className="lg:w-[70%] w-[90%] bg-white p-6 shadow-lg rounded-lg">
        {/* Tiêu đề */}
        <h2 className="text-3xl text-center font-extrabold text-gray-800 mb-4">
          {postDetail.postTitle} 
        </h2>

        <div className="flex justify-between text-gray-600 text-sm mb-4">
          <span className="font-semibold">
            Tác giả: {postDetail.authorPost}
          </span>
          <span>
            {postDetail.publishTime
              ?.split("T")[0]
              .split("-")
              .reverse()
              .join("/") || "N/A"}
          </span>
        </div>

        <img
          src="https://th.bing.com/th/id/R.21f948ddaf5ceb8af38722b6525f9576?rik=QXJDXfWA6c5bfw&riu=http%3a%2f%2fimua.com.vn%2fimages%2fAlbum%2fTrai-dua-tuoi-75.jpg&ehk=J0LhHGVtSH9w9QxAw%2fhxbidliOyBUiI6qjp8i2YcWJQ%3d&risl=&pid=ImgRaw&r=0"
          alt="Hình minh họa cho bài viết"
          className="w-full h-[400px] object-contain rounded-lg shadow-md"
        />

        <p className="text-lg text-gray-700 mt-6 leading-relaxed">
          {postDetail.postContent}
        </p>
      </div>
    </div>
  );
};

export default PostDetail;
