import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
  postDetail:{},
};

const PostSlice = createSlice({
  name: "PostStore",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setPostDetail: (state, action) => {
      state.postDetail = action.payload;
    },
  },
});


export const { setPost, setPostDetail } = PostSlice.actions;
export default PostSlice.reducer;
