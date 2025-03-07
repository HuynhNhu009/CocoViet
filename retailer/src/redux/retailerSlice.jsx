import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  retailer: null,
  isRetailerLogin: false,
  products: [],
  category: [],
  orderStore: [],
  revenueStore: {},
  statusStore: [],
  orderStatus: [],
  statusActive: null,
  statusName: null,
  countOrder:0,
  loadOrder: false,
  loading: false,
};

const retailerSlice = createSlice({
  name: "RetailerStore",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isRetailerLogin = true;
      state.retailer = action.payload;
    },

    setCountOrder: (state, action) => {
      state.countOrder = action.payload;
    },

    setRevenue: (state, action) => {
      state.revenueStore = action.payload;
    },


    setOrder: (state, action) => {
      state.orderStore = action.payload;
    },

    setLoadOrder: (state, action) => {
      state.loadOrder = action.payload;
    },

    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },

    setStatusActive: (state, action) => {
      state.statusActive = action.payload;
    },

    setStatusName: (state, action) => {
      state.statusName = action.payload;
    },

    setStatus: (state, action) => {
      state.statusStore = action.payload;
    },

    logout: (state) => {
      state.isRetailerLogin = false;
      state.retailer = null;
      state.products = [];
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const {
  setLogin,
  setOrderStatus,
  setLoadOrder,
  setRevenue,
  setStatusActive,
  setStatus,
  setOrder,
  setCountOrder,
  logout,
  setProducts,
  setStatusName,
  setLoading,
} = retailerSlice.actions;
export default retailerSlice.reducer;
