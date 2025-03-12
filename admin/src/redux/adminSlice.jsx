import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: "",
  categoryStore: [],
  categoryActive: null,
  productStore:[],
  productSearch:[],
  postSearch:[],
  customerSearch:[],
  retailerSearch:[],
  productCategory:[],
  postFilter:[],
  activeSearch: null,
  customerStore: [],
  retailerStore: [],
  postStore: [],
  postRetailerActive:null,

};

const adminSlice = createSlice({
  name: "AdminStore",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setCustomer:(state, action) => {
      state.customerStore = action.payload;
    },

    setPostRetailerActive:(state, action) => {
      state.postRetailerActive = action.payload;
    },
    setPostSearch:(state, action) => {
      state.postSearch = action.payload;
    },
    setPostFilter:(state, action) => {
      state.postFilter = action.payload;
    },
    setRetailer:(state, action) => {
      state.retailerStore = action.payload;
    },
    setCustomerSearch:(state, action) => {
      state.customerSearch = action.payload;
    },
    setRetailerSearch:(state, action) => {
      state.retailerSearch = action.payload;
    },
    setPost:(state, action) => {
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
export const { setAdmin, setPostRetailerActive, setActive, setPostFilter, setPostSearch, setPost, setRetailerSearch, setRetailer, setCustomerSearch, setCustomer, setPoductCategory, setPoductSearch, setcategory,setProduct, setCategoryActive } = adminSlice.actions;
export default adminSlice.reducer;
