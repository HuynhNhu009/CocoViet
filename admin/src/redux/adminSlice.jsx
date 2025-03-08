import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: "",
  categoryStore: [],
  categoryActive: null,
};

const adminSlice = createSlice({
  name: "AdminStore",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },

    setcategory: (state, action) => {
      state.categoryStore = action.payload;
    },
    setCategoryActive: (state, action) => {
      state.categoryActive = action.payload;
    },
  },
});

export const { setAdmin, setcategory, setCategoryActive } = adminSlice.actions;
export default adminSlice.reducer;
