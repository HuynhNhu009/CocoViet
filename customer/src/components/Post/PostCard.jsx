//import React from 'react';
import PropTypes from 'prop-types';


const PostCard = ({ imageLink, title, author, date }) => {
    
    return (
        <div>
            <div className="bg-gray-100 pb-[20px] px[20px] mx-[10px] my-[10px] shadow rounded-md cursor-pointer hover:scale-105">
                <div>
                    <img 
                        src={imageLink} 
                        alt="Người bán" 
                        className='rounded-tl-md rounded-tr-md h-1/2'>
                    </img>
                    <div className='mx-[10px] '>
                        <h3 className="text-lg font-bold truncate-text line-clamp-2 ">{title}</h3>
                        <div className="flex flex-col mt-[5px]">
                            <h4 className="text-base text-gray text-left  truncate-text w-50 line-clamp-1 opacity-70">Tác giả: {author}</h4>
                            <h4 className="text-sm text-right w-full mt-[5px] mr-[2px] opacity-60">{date}</h4>
                        </div>
                    </div>
              </div>
            </div>
        </div>
    );

};

PostCard.propTypes = {
    imageLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

export default PostCard;