import { createSlice, current } from "@reduxjs/toolkit";
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

    addItemToCart: (state, action) => {
      const rawStateProducts = current(state.products);

      const newStateProducts = rawStateProducts.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            quantity: product.quantity + action.payload.quantity,
            total: product.total + action.payload.total,
          };
        }
        return product;
      });

      return {
        ...state,
        id: action.payload.id,
        total: state.total + action.payload.total,
        products: newStateProducts,
      };
    },

    removeItemToCart: (state, action) => {
      const rawStateProducts = current(state.products);

      const newStateProducts = rawStateProducts
        .map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              quantity: product.quantity - action.payload.quantity,
              total: product.total - action.payload.total,
            };
          }
          return product;
        })
        .filter((p) => p.quantity > 0);

      return {
        ...state,
        id: action.payload.id,
        total: state.total - action.payload.total,
        products: newStateProducts,
      };
    },

    deleteCart: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { addCart, addItemToCart, removeItemToCart, deleteCart } =
  cartSlice.actions;
