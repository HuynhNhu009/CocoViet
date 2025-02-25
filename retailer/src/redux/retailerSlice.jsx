// src/redux/retailerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  retailer: null,
  isRetailerLogin: false,
  products: [],
  loading: false, // Thêm trạng thái loading
};

const retailerSlice = createSlice({
  name: "RetailerStore",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isRetailerLogin = true;
      state.retailer = action.payload;
    },
    logout: (state) => {
      state.isRetailerLogin = false;
      state.retailer = null;
      state.products = [];
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false; // Khi nhận được dữ liệu, tắt loading
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Bật/tắt loading
    },
  },
});

export const { setLogin, logout, setProducts, setLoading } =
  retailerSlice.actions;
export default retailerSlice.reducer;
