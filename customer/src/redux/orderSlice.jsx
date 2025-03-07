import { createSlice } from "@reduxjs/toolkit";
import { paymentAPI } from "../services/paymentService";

const orderSlice = createSlice({
  name: "OrderStore",
  initialState: {
    status:[],
    statusActive:null,
    statusName:null,
    orderList:[],
    orderStatus:[],
    createOrder:false,
    cartCount:0,
    payment: []
  },

  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;      
    },
    setPayment: (state, action) => {
      state.payment = action.payload;      
    },

    setCartCount: (state, action) => {
      state.cartCount = action.payload;      
    },

    setStatusActive: (state, action) => {
      state.statusActive = action.payload;      
    },
    setStatusName: (state, action) => {
      state.statusName = action.payload;      
    },

    setCreateOrder:(state, action) => {
      state.createOrder = action.payload;      
    },

    setOrderList: (state, action) => {
      state.orderList = action.payload;      
    },

    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload;      
    },


  },
});

export const {
  setStatus,
  setStatusActive,
  setOrderList,
  setOrderStatus,
  setCreateOrder,
  setCartCount,
  setStatusName,
  setPayment
} = orderSlice.actions;

export default orderSlice.reducer;
