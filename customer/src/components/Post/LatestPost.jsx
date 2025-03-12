import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { setPostDetail } from "../../redux/postSlice";

const LatestPost = () => {
  const posts = useSelector((state) => state.PostStore.post);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const latestPost = posts.reduce(
    (latest, post) =>
      new Date(post.publishTime) > new Date(latest.publishTime) ? post : latest,
    posts[0]
  );

   const handleClick = (postId) => {
      const findByPostId = posts.find((item) => item.postId === postId);
  
      if (findByPostId) {
        dispatch(setPostDetail({}));
        dispatch(setPostDetail(findByPostId));
        navigate(`/blog/${postId}`);
      } else {
        console.log("Post not found!");
      }
    };

  return (
    <div className="lg:w-[78%] w-[80%] mx-auto mb-8">
      <div
        onClick={() => handleClick(latestPost.postId)}
        className="relative w-full h-[320px] lg:h-[320px] rounded-lg overflow-hidden shadow-lg"
      >
        <div className=" align-middle justify-center  w-full h-full">
          <img
            src={latestPost.postImageUrl}
            alt={latestPost.postTitle}
            className="w-full aspect-video object-cover brightness-75"
          />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black transition-transform duration-100 hover:to-gray-600 cursor-pointer"></div>
          <div className="absolute bottom-5 left-5 text-white">
            <h1 className="text-3xl text-white font-bold z-100">
              {latestPost.postTitle}
            </h1>
            <p className="text-lg text-white">
              {latestPost.authorPost} -{" "}
              {latestPost.publishTime
                ?.split("T")[0]
                .split("-")
                .reverse()
                .join("/") || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

LatestPost.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LatestPost;
