import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addProduct: (state, action) => {
            state.quantity += 1;
           state.products.push(action.payload)
        }, 
        updateProduct: (state, action) =>{
            state.products = action.payload
        },
        removeProduct: (state) => {
            state.quantity -= 1
        },
        deleteProduct: (state) => {
            state.products = []
            state.quantity = 0
        }
    },
});

export const { addProduct,updateProduct, removeProduct,deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;

