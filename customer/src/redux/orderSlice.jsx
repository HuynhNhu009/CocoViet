import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "OrderStore",
  initialState: {
    status:[],
    statusActive:null,
    orderList:[],
    orderStatus:[],
  },

  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;      
    },
    setStatusActive: (state, action) => {
      state.statusActive = action.payload;      
    },

    setOrderList: (state, action) => {
      state.orderList = action.payload;      
    },

    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload;      
    },

    resetOrderState: () => ({
      statusActive: null,

    }),
  },
});

export const {
  setStatus,
  setStatusActive,
  setOrderList,
  setOrderStatus,
  resetOrderState
} = orderSlice.actions;

// export const getInitialState = (state) => state.ProductStore.statusActive;


export default orderSlice.reducer;
