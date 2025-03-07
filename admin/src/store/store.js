import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../redux/adminSlice";

const store = configureStore({
  reducer: {
    AdminStore: adminReducer, 
  },
});

export default store;
