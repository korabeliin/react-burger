import { createSlice } from "@reduxjs/toolkit";

export const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState: {
    currentIngredient: null
  },
  reducers: {
    CURRENT_INGREDIENT: (state, action) => {
      state.currentIngredient = action.payload
    }
  }
});

export const { CURRENT_INGREDIENT } = currentIngredientSlice.actions;

export default currentIngredientSlice.reducer;