//import React from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PostDetail = () => {
   
    const { id } = useParams(); // Lấy id từ URL

    const posts = useSelector((state) => state.PostStore.post);

    const post = posts.find((b) => b.id === parseInt(id));

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
    };

    if (!post) {
        return (
            <div className="text-3xl font-bold opacity">
                Bài viết không tồn tại!
            </div>
        )
    
    }


    return (
        <div >
            <div className='lg:w-[80%] w-[90%] md:my-[30px] md:py-[30px] my-[30px] mx-[20px] px-[20px] bg-white border border-gray-300 shadow rounded'>
                <h2 className='flex flex-col lg:text-4xl md:text-3xl text-2xl font-bold mb-[10px]'>{post.postTitle}</h2>
                <div className='flex flex-row mb-[10px] opacity-70'>
                    <h3 className='lg:text-xl md:text-lg text-sm text-left  w-1/2 font-bold opacity-70'>Tác giả: {post.authorPost}</h3>
                    <h3 className='lg:text-xl md:text-lg text-sm text-right w-1/2 mr-[5px] opacity-50'>{formatDate(post.publishTime)}</h3>
                </div>
                <img
                    src= {post.postImageUrl}
                    alt="Hình minh hoạ cho bài viết"
                    className = "lg:w-full rounded aspect-video mb-[20px] shadow"
                ></img>
                <p className='whitespace-pre-line break-word lg:text-lg md:text-base text-sm mb-[10px]'>
                    {post.postContent}
                </p>
            </div>
        </div>
    );
};

export default PostDetail;
