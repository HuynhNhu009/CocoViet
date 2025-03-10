import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: "",
  categoryStore: [],
  categoryActive: null,
  productStore:[],
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

    setProduct: (state, action) => {
      state.productStore = action.payload;
    },

    setCategoryActive: (state, action) => {
      state.categoryActive = action.payload;
    },
  },
});
export const { setAdmin, setcategory,setProduct, setCategoryActive } = adminSlice.actions;
export default adminSlice.reducer;
