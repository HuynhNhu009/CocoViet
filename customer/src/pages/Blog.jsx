import React from "react";
import { useSelector } from "react-redux";
import PostList from "../components/Post/PostList";

const Blog = () => {
  
  return (
    <div className="w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-8">
      <PostList />
    </div>
  );
};

export default Blog;
