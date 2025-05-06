import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "./cartTypes";

const initialState: Cart = {
  discountedTotal: 0,
  id: 0,
  products: [],
  total: 0,
  totalProducts: 0,
  totalQuantity: 0,
  userId: 1,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      return {
        ...state,
        id: action.payload.id,
        discountedTotal: state.discountedTotal + action.payload.discountedTotal,
        total: state.total + action.payload.total,
        totalProducts: state.totalProducts + action.payload.totalProducts,
        totalQuantity: state.totalQuantity + action.payload.totalQuantity,
        products: state.products.concat(action.payload.products),
      };
    },
  },
});

export const { addCart } = cartSlice.actions;
