import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "OrderStore",
  initialState: {
    status:[],
    statusActive:null,
    orderList:[],
    orderStatus:[],
    createOrder:false,
    cartCount:0,
  },

  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;      
    },

    setCartCount: (state, action) => {
      state.cartCount = action.payload;      
    },

    setStatusActive: (state, action) => {
      state.statusActive = action.payload;      
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
  setCartCount
} = orderSlice.actions;

// export const getInitialState = (state) => state.ProductStore.statusActive;


export default orderSlice.reducer;
