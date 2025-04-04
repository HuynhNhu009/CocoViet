import React, { useState, useEffect } from "react";
import Title from "../ui/Title";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPostDetail } from "../../redux/postSlice";

const HomeBlog = () => {
  const posts = useSelector((state) => state.PostStore.post);
  const postAbout = posts.slice(0, 3);
  const [isPortrait, setIsPortrait] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Kiểm tra hướng của ảnh chính
  useEffect(() => {
    if (postAbout[0]?.postImageUrl) {
      const img = new Image();
      img.src = postAbout[0].postImageUrl;
      img.onload = () => {
        setIsPortrait(img.height > img.width);
      };
    }
  }, [postAbout]);

  const handleClick = (postId) => {

      navigate(`/posts/${postId}`);

  };

  return (
    <div className="relative flex flex-col lg:flex-row items-center gap-6 pt-5 pb-5 sm:pt-20 px-4 sm:px-[5vw] lg:px-[7vw] min-h-[500px] sm:min-h-[830px]">
      {isPortrait ? (
        // Layout cho ảnh dọc: ảnh trên, tiêu đề và nội dung dưới
        <div className="flex flex-col w-full">
          {postAbout[0] && (
            <div className="w-full">
              <img
                src={postAbout[0].postImageUrl}
                className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover transition-transform duration-300 hover:scale-105"
                alt={postAbout[0].postTitle || "Blog post"}
                onError={(e) => (e.target.src = "/fallback-image.jpg")}
              />
              <div className="text-center mt-4">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                  {postAbout[0].postTitle}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mt-2">
                  {postAbout[0].postContent}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Nội dung tổng quan */}
          <div className="w-full lg:w-2/5 px-4 sm:text-left">
            <Title text1={"Bài viết"} color1={"lg:mb-5 lg:pl-5 text-left text-xl text-black"} />
            <p className="mt-2  lg:pr-10 sm:mb-10 text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl text-justify leading-relaxed  sm:text-left">
              Đây là nơi bạn có thể khám phá vô số mẹo hay, công thức nấu ăn, bí
              quyết làm đẹp và những ứng dụng thú vị của dừa trong cuộc sống. Từ
              những món ăn thơm ngon đến cách tận dụng dừa trong chăm sóc sức
              khỏe và làm đồ thủ công, chúng tôi mang đến cho bạn những chia sẻ
              hữu ích và dễ áp dụng. Hãy cùng khám phá và biến dừa thành người bạn đồng hành trong cuộc sống hàng ngày! 
            </p>
          </div>

          {/* Hình ảnh - dọc trên mobile, ngang trên desktop */}
          <div className="w-full lg:w-2/3 flex flex-col lg:flex-row gap-4 h-auto lg:h-[460px] sm:h-[400px] md:h-[600px]">
            {/* Hình lớn */}
            {postAbout[0] && (
              <div
                className="w-full lg:w-1/2 h-[150px] sm:h-[300px] lg:h-full flex flex-col relative overflow-hidden group cursor-pointer"
                onClick={() => handleClick(postAbout[0].postId)}
              >
                <img
                  src={postAbout[0].postImageUrl}
                  className="w-full h-full object-cover object-left transition-transform duration-300 group-hover:scale-105"
                  alt={postAbout[0].postTitle || "Blog post"}
                  onError={(e) => (e.target.src = "/fallback-image.jpg")}
                />
                <div className="absolute bottom-0 p-2 pb-4 w-full bg-black/40">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white pb-2 group-hover:underline">
                    {postAbout[0].postTitle}
                  </h3>
                  <p className="text-white text-xs sm:text-sm md:text-base text-justify line-clamp-3">
                    {postAbout[0].postContent}
                  </p>
                </div>
              </div>
            )}

            {/* Hai hình nhỏ */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              {postAbout[1] && (
                <div
                  onClick={() => handleClick(postAbout[1].postId)}
                  className="w-full h-[150px] sm:h-[200px] lg:h-1/2 relative overflow-hidden group cursor-pointer"
                >
                  <img
                    src={postAbout[1].postImageUrl}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
                    alt={postAbout[1].postTitle || "Blog post"}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-400" />
                  <div className="absolute bottom-0 p-2 pb-4 w-full">
                    <p className="text-base sm:text-lg md:text-xl font-semibold text-white pb-2 transition-all group-hover:underline">
                      {postAbout[1].postTitle}
                    </p>
                    <p className="text-xs sm:text-sm md:text-base text-white line-clamp-3">
                      {postAbout[1].postContent}
                    </p>
                  </div>
                </div>
              )}
              {postAbout[2] && (
                <div
                  onClick={() => handleClick(postAbout[2].postId)}
                  className="w-full h-[150px] sm:h-[200px] lg:h-1/2 relative overflow-hidden group cursor-pointer"
                >
                  <img
                    src={postAbout[2].postImageUrl}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
                    alt={postAbout[2].postTitle || "Blog post"}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-400" />
                  <div className="absolute bottom-0 p-2 pb-4 w-full">
                    <p className="text-base sm:text-lg md:text-xl font-semibold text-white pb-2 group-hover:underline">
                      {postAbout[2].postTitle}
                    </p>
                    <p className="text-xs sm:text-sm md:text-base text-white line-clamp-3">
                      {postAbout[2].postContent}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeBlog;
