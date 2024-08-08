import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice.js";
import authSlice from "./features/auth/authSlice.js";
import favoritesSlice from "./features/favorites/favoritesSlice.js";
import cartSlice from "./features/cart/cartSlice.js";
import shopSlice from "./features/shop/shopSlice.js";
import noficeSlice from "./features/notice/naticSlice.js";
import { getAllFavProductsLocalStorage } from "./../utils/localstorage.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    favorites: favoritesSlice,
    carts: cartSlice,
    shop: shopSlice,
    notice: noficeSlice,
  },

  preloadedState: {
    favorites: getAllFavProductsLocalStorage(),
  },

  middleware: (getDefaultMeddleware) =>
    getDefaultMeddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
