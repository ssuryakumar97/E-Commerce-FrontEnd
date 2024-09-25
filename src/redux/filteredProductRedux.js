import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: "filteredProduct",
    initialState: {
        products:[],
        filteredProducts: [],
        filterStatus: false
    },
    reducers:{
        initialProduct: (state, action) => {
            state.filterStatus = false
            state.products = [...action.payload]
         }, 
        filteredProduct: (state, action) => {
            state.filterStatus = true
           state.filteredProducts = [...action.payload]
        }, 
    },
});

export const { initialProduct, filteredProduct } = productSlice.actions;
export default productSlice.reducer;

