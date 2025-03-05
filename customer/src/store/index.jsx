import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../redux/customerSlice";
import productReducer from "../redux/productSlice"
import orderReducer from "../redux/orderSlice"
import postReducer from "../redux/postSlice";

const store = configureStore({
    reducer: {
      CustomerStore: customerReducer,
      ProductStore:productReducer,
      OrderStore: orderReducer,
      PostStore: postReducer,
    }
})

export default store;