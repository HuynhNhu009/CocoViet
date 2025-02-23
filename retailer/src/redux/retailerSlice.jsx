import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ratailer: null,
  isRetailerLogin: false,
};

const retailerSlice = createSlice({
  name: "RetailerStore",
  initialState,
  reducers: {},
});
