import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: "",
  categoryStore: [],
  categoryActive: null,
  productStore:[],
  productSearch:[],
  customerSearch:[],
  retailerSearch:[],
  productCategory:[],
  activeSearch: null,
  customerStore: [],
  retailerStore: [],

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
    setRetailer:(state, action) => {
      state.retailerStore = action.payload;
    },
    setCustomerSearch:(state, action) => {
      state.customerSearch = action.payload;
    },
    setRetailerSearch:(state, action) => {
      state.retailerSearch = action.payload;
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
export const { setAdmin,setActive, setRetailerSearch, setRetailer, setCustomerSearch, setCustomer, setPoductCategory, setPoductSearch, setcategory,setProduct, setCategoryActive } = adminSlice.actions;
export default adminSlice.reducer;
