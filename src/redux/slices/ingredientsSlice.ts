import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IngredientsAPI } from '../../api/ingredientsAPI';
import request from '../../utils/request';

const { ingredientsURL } = IngredientsAPI;

export const fetchIngredientsData:any = createAsyncThunk(
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
      });
  },
  reducers: {}
});

export default ingredientsSlice.reducer;