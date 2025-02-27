import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "OrderStore",
  initialState: {
    status:[],
    statusActive:null,
    orderList:[],
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
  },
});

export const {
  setStatus,
  setStatusActive,
  setOrderList
} = orderSlice.actions;


export default orderSlice.reducer;
