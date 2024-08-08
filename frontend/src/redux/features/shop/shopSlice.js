import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorires: [],
  products: [],
  checked: [],
  radio: [],
  brandCheckboxes: {},
  checkedBrands: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,

  reducers: {
    setCategories: (state, action) => {
      state.categorires = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setRadio: (state, action) => {
      state.radio = action.payload;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrands;
      action.payload;
    },
    resetFilter: (state) => {
      return initialState
    },
  },
});

export const {
  setCategories,
  setChecked,
  setRadio,
  setProducts,
  setSelectedBrand,
  resetFilter,
} = shopSlice.actions;
export default shopSlice.reducer;
