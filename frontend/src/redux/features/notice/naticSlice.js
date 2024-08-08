import { createSlice } from "@reduxjs/toolkit";
import { ERROR } from "../../constants";

const initialState = {
  variant: "",
  value: "",
};

const noficeSlice = createSlice({
  name: "notic",
  initialState,
  reducers: {
    addAction: (state, action) => {
      state.variant = action.payload.variant;
      state.value = action.payload.value;
      return state;
    },
    clearState: (state, action) => {
      state.variant = "";
      state.value = "";
    },
  },
});

export const { addAction, clearState } = noficeSlice.actions;

export default noficeSlice.reducer;
