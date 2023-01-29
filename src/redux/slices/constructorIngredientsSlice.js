import { createSlice } from "@reduxjs/toolkit";

export const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState: {
    constructorIngredients: {
      bun: null,
      stuffing: []
    }
  },
  reducers: {
    ADD_STUFFING_TO_CONSTRUCTOR: (state, action) => {
      state.constructorIngredients.stuffing.push(action.payload)
    },
    DELETE_STUFF_FROM_CONSTRUCTOR: (state, action) => {
      state.constructorIngredients.stuffing = state.constructorIngredients.stuffing.filter(el => el.key !== action.payload);
    },
    ADD_BUN_TO_CONSTRUCTOR: (state, action) => {
      state.constructorIngredients.bun = action.payload
    },
    SORT_STUFFING: (state, action) => {
      let prevState = state.constructorIngredients.stuffing;
      prevState.splice(action.payload.hoverIndex, 0, prevState.splice(action.payload.dragIndex, 1)[0]);
    }
  }
});

export const { 
  ADD_STUFFING_TO_CONSTRUCTOR,
  DELETE_STUFF_FROM_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  SORT_STUFFING
 } = constructorIngredientsSlice.actions;

export default constructorIngredientsSlice.reducer;