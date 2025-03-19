import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: "",
  categoryStore: [],
  categoryActive: null,

  productStore: [],
  productSearch: [],
  productCategory: [],
  productStatusActive: null,
  productStatus:[],

  postFilter: [],
  postSearch: [],
  postStore: [],
  postRetailerActive: null,

  customerSearch: [],
  customerStore: [],

  retailerSearch: [],
  retailerStore: [],
  retailerProduct: [],
  retailerActive:null,

  activeSearch: null,

  orderStore: [],
  orderChart: [],
  orderByRetailer: [],

  revenueList: [],
  revenueListRetailer: {},
  revenueRetailerActive: null,

  statusStore: [],

  update: false,

  loadingAPI:false,
};

const adminSlice = createSlice({
  name: "AdminStore",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },

    setRevenueRetailerActive: (state, action) => {
      state.revenueRetailerActive = action.payload;
    },
    setProductStatusActive: (state, action) => {
      state.productStatusActive = action.payload;
    },

    setLoadingAPI: (state, action) => {
      state.loadingAPI = action.payload;
    },

    setRetailerActive: (state, action) => {
      state.retailerActive = action.payload;
    },

    setUpdate: (state, action) => {
      state.update = action.payload;
    },

    setOrderByRetailer: (state, action) => {
      state.orderByRetailer = action.payload;
    },
    setProductStatus: (state, action) => {
      state.productStatus = action.payload;
    },
    setOrderChart: (state, action) => {
      state.orderChart = action.payload;
    },
    setCustomer: (state, action) => {
      state.customerStore = action.payload;
    },
    setOrder: (state, action) => {
      state.orderStore = action.payload;
    },
    setRevenueListRetailer: (state, action) => {
      state.revenueListRetailer = action.payload;
    },

    setStatus: (state, action) => {
      state.statusStore = action.payload;
    },
    setRevenueList: (state, action) => {
      state.revenueList = action.payload;
    },
    setRetailerProduct: (state, action) => {
      state.retailerProduct = action.payload;
    },
    setPostRetailerActive: (state, action) => {
      state.postRetailerActive = action.payload;
    },
    setPostSearch: (state, action) => {
      state.postSearch = action.payload;
    },
    setPostFilter: (state, action) => {
      state.postFilter = action.payload;
    },
    setRetailer: (state, action) => {
      state.retailerStore = action.payload;
    },
    setCustomerSearch: (state, action) => {
      state.customerSearch = action.payload;
    },
    setRetailerSearch: (state, action) => {
      state.retailerSearch = action.payload;
    },
    setPost: (state, action) => {
      state.postStore = action.payload;
    },
    setPoductSearch: (state, action) => {
      state.productSearch = action.payload;
    },
    setPoductCategory: (state, action) => {
      state.productCategory = action.payload;
    },
    setActive: (state, action) => {
      state.activeSearch = action.payload;
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
export const {
  setAdmin,
  setRetailerActive,
  setUpdate,
  setLoadingAPI,
  setProductStatusActive,
  setOrderChart,
  setOrderByRetailer,
  setRevenueRetailerActive,
  setRevenueListRetailer,
  setStatus,
  setProductStatus,
  setRetailerProduct,
  setRevenueList,
  setOrder,
  setPostRetailerActive,
  setActive,
  setPostFilter,
  setPostSearch,
  setPost,
  setRetailerSearch,
  setRetailer,
  setCustomerSearch,
  setCustomer,
  setPoductCategory,
  setPoductSearch,
  setcategory,
  setProduct,
  setCategoryActive,
} = adminSlice.actions;
export default adminSlice.reducer;
