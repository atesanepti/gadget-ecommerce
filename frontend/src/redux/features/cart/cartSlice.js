import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../utils/cart.js";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      paymentMethod: "paypal",
      shippingAddress: {},
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { rating, numReviws, reviews, ...item } = action.payload;

      const itemExist = state.cartItems.find((i) => i._id == item._id);
      if (itemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i._id == itemExist._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id != action.payload
      );
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state, action) => {
      state.cartItems = [];
      const updateState = updateCart(state);
      localStorage.setItem("cart", JSON.stringify(updateState));
      return updateState;
    },

    resetCart: (state) => (state = initialState),
  },
});
export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  resetCart,
  clearCart,
} = cartSlice.actions;
