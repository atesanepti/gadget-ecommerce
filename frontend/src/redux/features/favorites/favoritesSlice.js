import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorits",
  initialState: [],

  reducers: {
    addFavorites: (state, action) => {
      if (!state.some((p) => p?._id === action.payload.product._id)) {
        const newState = [...state, action.payload.product];
        return newState
      }
      return state;
    },
    removeFavorites: (state, action) => {
      return state.filter((p) => p?._id !== action.payload.product._id);
    },
    setFavoritesInLocalStorage: (state) => {
      return state;
    },
  },
});

export const { addFavorites, removeFavorites, setFavoritesInLocalStorage } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
