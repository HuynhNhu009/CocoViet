import React from 'react';
import LatestPost from '../components/Post/LatestPost';
import PostList from '../components/Post/PostList';

const Posts = () => {
    return (
        <div>
            <LatestPost/>
            <PostList/>
        </div>
    );
};

export default Posts;