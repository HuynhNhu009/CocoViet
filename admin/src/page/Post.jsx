import React from "react";
import PostList from "../components/Post/PostList"
import { motion } from "framer-motion";

const Post = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-4"
      >
        <PostList />
      </motion.div>
    </>
  );
};

export default Post;
