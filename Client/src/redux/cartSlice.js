import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const Index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (Index === -1) {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.products[Index].quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    removeProduct: (state, action) => {
      const Index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      state.total -=
        state.products[Index].quantity * state.products[Index].price;

      state.quantity = state.quantity > 0 ? state.quantity - 1 : state.quantity;
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    },
    addProductQuantity: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload
      );
      state.products[index].quantity += 1;
      state.total += state.products[index].price;
    },
    subProductQuantity: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload
      );
      if (state.products[index].quantity > 1) {
        state.products[index].quantity -= 1;
        state.total -= state.products[index].price;
      }
    },
    resetCart: (state, action) => {
      state.products = [];
      state.total = 0;
      state.quantity = 0;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  addProductQuantity,
  subProductQuantity,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
