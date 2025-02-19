import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice ({
    name: "Customer",
    initialState:{
       product: [],
       customer: {},
       cart: [],
    },

    reducers: {
        setProduct : (state, action) => {
            state.product = action.payload;
        },
       

        resetNim: state => {
            return {
                ...state,
               
            
            }
        }
    }
})

export const {
    setProduct,
    setPlayer2,
    
} = customerSlice.actions;

export const getInitialState = (state) => state.Customer.initialState;

export default customerSlice.reducer;