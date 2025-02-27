import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../redux/customerSlice";
import productReducer from "../redux/productSlice"
import orderReducer from "../redux/orderSlice"


const store = configureStore({
    reducer: {
      CustomerStore: customerReducer,
      ProductStore:productReducer,
      OrderStore: orderReducer,
    
    }
})

export default store;