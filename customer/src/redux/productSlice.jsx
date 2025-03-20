import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "ProductStore",
  initialState: {
    productStore: [],
    productDetail: {},
    productCategory: [],
    productSearch: [],
    active: null,
    isNav: null, 

    retailerStore:[],
    retailer:[],

  },

  reducers: {
    setProductStore: (state, action) => {
      state.productStore = action.payload;
    },

    setRetailer: (state, action) => {
      state.retailerStore = action.payload;
    },
    setRetailerProfile: (state, action) => {
      state.retailer = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setIsNav: (state, action) => {
      state.isNav = action.payload;
    },

    setProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },

    setProductCategory: (state, action) => {
      state.productCategory = action.payload;
    },

    setProductSearch: (state, action) => {
      state.productSearch = action.payload;
    },

    setISClickProductNav: (state, action) => {
      state.isClickProductNav = action.payload;
    },
  },
});

export const {
  setActive,
  setProductStore,
  setRetailerProfile,
  setProductCategory,
  setRetailer,
  setProductSearch,
  setProductDetail,
  setISClickProductNav,
  setIsNav,
} = productSlice.actions;

// export const getInitialState = (state) => state.ProductStore.initialState;

export default productSlice.reducer;
