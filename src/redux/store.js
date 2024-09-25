import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import filteredProductReducer from "./filteredProductRedux";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filteredProduct: filteredProductReducer
  } 
});
