import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../redux/customerSlice";
import productReducer from "../redux/productSlice"


const store = configureStore({
    reducer: {
      CustomerStore: customerReducer,
      ProductStore:productReducer,
    
    }
})

export default store;