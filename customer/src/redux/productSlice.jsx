import { createSlice } from "@reduxjs/toolkit";



const productSlice = createSlice({
  name: "ProductStore",
  initialState: {
    productStore: [],
    productItem:{}
    
  },

  reducers: {
    setProductStore: (state, action) => {    
      state.productStore = action.payload;
      
    },
    
    setProductItem: (state, action) => {
      state.productItem = action.payload;
    }
  },
});



export const { 
  setProductStore,
  setProductItem

} = productSlice.actions;

export const getInitialState = (state) => state.ProductStore.initialState;

export default productSlice.reducer;
