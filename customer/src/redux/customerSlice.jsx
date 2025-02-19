import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "CustomerStore",
  initialState: {
    customer: {},
    cart: [],
    login: null,
  },

  reducers: {
    setLogin: (state, action) => {
      state.login ={
        email: action.payload.email,
        password : action.payload.password
      }
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

export const { 
  setLogin
  
 } = customerSlice.actions;

export const getInitialState = (state) => state.CustomerStore.initialState;

export default customerSlice.reducer;
