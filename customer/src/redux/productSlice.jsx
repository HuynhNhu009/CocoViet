import { createSlice } from "@reduxjs/toolkit";



const productSlice = createSlice({
  name: "ProductStore",
  initialState: {
    productStore: [],
    
  },

  reducers: {
    setProductStore: (state, action) => {
      // state.productStore=[
      //   {
      //     productId: action.payload.productId,
      //     productName: action.payload.productName,
      //     productDesc: action.payload.productDesc,
      //     productOrigin:action.payload.productOrigin,
      //     categoryName: action.payload.categoryName,
      //     retailerName: action.payload.retailerName,
      //     variants:[
      //       {
      //         // initStock: action.payload.variants.initStock,
      //         price:action.payload.price,
      //         // stock:action.payload.variants.stock,
      //         // unitName:action.payload.variants.unitName,
      //         // value:action.payload.variants.value,
      //         // variantId:action.payload.variants.variantId,
      //       }
      //     ]
      //   }
      // ]
      
      state.productStore = action.payload;
      
    },
    
  },
});



export const { 
  setProductStore 

} = productSlice.actions;

export const getInitialState = (state) => state.ProductStore.initialState;

export default productSlice.reducer;
