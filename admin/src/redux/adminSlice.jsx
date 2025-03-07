import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: "",
  
};

const adminSlice = createSlice({
  name: "AdminStore",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },

  },
});

export const {
  setAdmin,
} = adminSlice.actions;
export default adminSlice.reducer;
