import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: {}, // Chứa thông tin khách hàng
  isLogin: false,
  token: "", // Chứa JWT token
};

const customerSlice = createSlice({
  name: "CustomerStore",
  initialState,

  reducers: {
    setLogin: (state, action) => {
      const { token, data } = action.payload;
      // Lấy dữ liệu từ API trả về
      state.isLogin = true;
      state.customer = data; // Lưu thông tin khách hàng
      state.token = token; // Lưu token vào Redux
      console.log("Redux -- Token", token);

      localStorage.setItem("token", token); // Lưu token vào localStorage để sử dụng sau này
    },
    logout: (state) => {
      state.customer = {};
      state.isLogin = false;
      state.token = "";
      localStorage.removeItem("token"); // Xóa token khi logout
    },
  },
});

export const { setLogin, logout } = customerSlice.actions;

export const getInitialState = (state) => state.CustomerStore.initialState;

export default customerSlice.reducer;
