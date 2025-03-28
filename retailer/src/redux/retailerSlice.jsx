import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  retailer: null,
  isRetailerLogin: false,
  allRetailer: [],

  products: [],

  productAdd: {
    newProduct: {
      productName: "",
      productDesc: "",
      retailerId: "",
      productImage: "",
      productOrigin: "",
      variants: [],
      categoryId: [],
    },
    newVariant: {
      unitId: "",
      value: "",
      price: "",
      initStock: "",
    },
  },

  category: [],

  units: [],

  statusStore: [],
  statusActive: null,
  statusName: null,

  countOrder: 0,
  loadOrder: false,
  orderStatus: [],
  orderStore: [],
  revenueStore: {},

  loading: false,
  posts: [],
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

    setAllRetailer: (state, action) => {
      state.allRetailer = action.payload;
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
      state.productAdd = initialState.productAdd;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },

    setNewProduct: (state, action) => {
      state.productAdd.newProduct = {
        ...state.productAdd.newProduct,
        ...action.payload,
      };
    },

    setNewVariant: (state, action) => {
      state.productAdd.newVariant = {
        ...state.productAdd.newVariant,
        ...action.payload,
      };
    },

    addVariant: (state, action) => {
      state.productAdd.newProduct.variants.push(action.payload);
      state.productAdd.newVariant = initialState.productAdd.newVariant; // Reset newVariant
    },
    deleteVariant: (state, action) => {
      state.productAdd.newProduct.variants =
        state.productAdd.newProduct.variants.filter(
          (_, index) => index !== action.payload
        );
    },
    resetProductAdd: (state) => {
      state.productAdd = initialState.productAdd;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setUnits: (state, action) => {
      state.units = action.payload;
    },

    setPosts: (state, action) => {
      state.posts = action.payload;
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
  setCategory,
  setAllRetailer,
  setCountOrder,
  logout,
  setProducts,
  setStatusName,
  setLoading,
  setUnits,
  setPosts,
  setNewProduct,
  setNewVariant,
  addVariant,
  deleteVariant,
  resetProductAdd,
} = retailerSlice.actions;
export default retailerSlice.reducer;
