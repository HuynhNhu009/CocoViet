//import React from 'react';
import PostCard from './PostCard';

const PostList = () => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:w-[80%] w-[90%] mx-auto md:my-[20px]'>
            {[1, 2, 3, 5, 6, 7].map((index) => (
            <PostCard 
                key={index} 
                imageLink="https://images.unsplash.com/photo-1740773075965-76a9a54c5f42?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                title="Đây là cái tiêu đề blog dài ơi là dài, tới mức không thể hiển thị hết trên thẻ được." 
                author="Tên của tác giả dài ngoằn ngoèo, đọc xong muốn đứt hơi, méo hết cái mỏ" 
                date="24/01/2025"
            ></PostCard>
              
            ))}
        </div>
    );
};

export default PostList;