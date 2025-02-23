import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: null,
  isLogin: false,
};

const customerSlice = createSlice({
  name: "CustomerStore",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = true;
      state.customer = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.customer = null;
    },
  },
});

export const { setLogin, logout } = customerSlice.actions;
export default customerSlice.reducer;
