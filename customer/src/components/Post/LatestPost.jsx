import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const LatestPost = () => {
    const posts = useSelector((state) => state.PostStore.post);
    const navigate = useNavigate();

    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestPost = sortedPosts[0];

    const handleClick = (id) => {
        navigate(`/post/${id}`); 
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
    };

    return (
        <div className="lg:w-[80%] w-[95%] mx-auto my-8">
            <h2 className="text-3xl font-bold text-center my-[20px]">Bài viết mới nhất</h2>
            <div
                onClick={() => handleClick(latestPost.id)}
                className="relative w-full h-[350px] lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
                <div className="block w-full h-full">
                    <img 
                        src="https://thumbs.dreamstime.com/b/coconuts-white-background-25912266.jpg"
                        alt={latestPost.title} 
                        className="w-full h-full object-contain brightness-75"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black"></div>
                    <div className="absolute bottom-5 left-5 text-white">
                        <h1 className="text-3xl text-white font-bold z-100">{latestPost.postTitle}</h1>
                        <p className="text-lg text-white">{latestPost.postAuthor} - {formatDate(latestPost.publishTime)}</p>
                    </div>
                
                </div>
            </div>
        </div>
    );
};

LatestPost.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })).isRequired,
};

export default LatestPost;