import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "Customer",
  initialState: {
    customer: {},
    cart: [],
    login: {
      email: null,
      password: null,
    },
  },

  reducers: {
    setLogin: (state, action) => {
      state.login.email = action.payload;
      state.login.password = action.payload;
    },

    resetCustomer: (state) => {
      return {
        ...state,
        customer: {},
        cart: {},
        login: {
          email: null,
          password: null,
        },
      };
    },
  },
});

export const { setLogin } = customerSlice.actions;

export const getInitialState = (state) => state.Customer.initialState;

export default customerSlice.reducer;
