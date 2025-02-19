import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "../redux//customerSlice";


const store = configureStore({
    reducer: {
      customer: customerSlice,
    
    }
})

export default store;