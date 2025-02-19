import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../redux/customerSlice";


const store = configureStore({
    reducer: {
      CustomerStore: customerReducer,
    
    }
})

export default store;