import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ingredientsURL } from '../../api/ingredientsAPI';

export const fetchIngredientsData = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, thunkAPI) => {
    try {
      const res = await fetch(ingredientsURL);
      const data = await res.json()
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [],
    isLoading: false,
    error: false
  },
  // reducers: {},
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