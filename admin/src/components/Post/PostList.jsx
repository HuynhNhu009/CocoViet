import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActive, setPostSearch } from "../../redux/adminSlice";
import SearchBar from "../SearchBar";
import FilterPostByRetailer from "./FilterPostByRetailer";
import ProductItem from "./PostItem";

const ProductList = () => {
  const postStore = useSelector((state) => state.AdminStore.postStore);
  const postSearch = useSelector((state) => state.AdminStore.postSearch);
  const postFilter = useSelector((state) => state.AdminStore.postFilter);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postStore.length > 0) {
      setPosts(postStore);
    }
  }, [postStore]);

  useEffect(() => {
    if (postSearch.length > 0) {
      setPosts(postSearch);
    }
  }, [postSearch]);

  useEffect(() => {
    if (postFilter) {
      setPosts(postFilter);
    } else {
      setPosts([]);
    }
  }, [postFilter]);

  return (
    <div className="px-2 sm:px-4 md:px-6">
      {/* Header: Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filter */}
        <div className="w-full sm:w-auto">
          <FilterPostByRetailer />
        </div>
        {/* Search Bar */}
        <div className="w-full sm:flex-1 sm:mr-3">
          <SearchBar
            placeholder="Search for products..."
            dataList={postStore}
            parameter1={"postTitle"}
            parameter2={"postContent"}
            dispatchFunction={(data) => dispatch(setPostSearch(data))}
            setActive={(value) => dispatch(setActive(value))}
            navigateTo="/posts"
          />
        </div>
      </div>

      {/* Posts List */}
      <div className="mt-5">
        {posts.length > 0 ? (
          <ProductItem posts={posts} />
        ) : (
          <p className="text-center text-gray-600">Không có bài viết nào.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;