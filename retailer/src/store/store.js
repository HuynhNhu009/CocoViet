import { configureStore } from "@reduxjs/toolkit";
import retailerReducer from "../redux/retailerSlice";

const store = configureStore({
  reducer: {
    RetailerStore: retailerReducer, // Sửa typo từ "RestailerStore" thành "RetailerStore"
  },
});

export default store;
