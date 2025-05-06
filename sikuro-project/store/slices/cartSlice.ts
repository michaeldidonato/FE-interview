import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "./cartTypes";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {} as Cart,
  reducers: {
    addCart: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
