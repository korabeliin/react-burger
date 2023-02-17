import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ingredientsURL } from '../../api/ingredientsAPI';
import request from './../../utils/request';

export const fetchIngredientsData = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const data = request(ingredientsURL)
    return data
  }
)

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [],
    isLoading: false,
    error: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsData.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchIngredientsData.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchIngredientsData.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
  }
});

export default ingredientsSlice.reducer;