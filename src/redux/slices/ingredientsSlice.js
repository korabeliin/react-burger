import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import URL from '../../api/ingredientsAPI';

export const fetchIngredientsData = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, thunkAPI) => {
    try {
      const res = await fetch(URL);
      const data = await res.json()
      //console.log(data)
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
    constructorIngredients: {
      bun: {},
      stuffing: []
    },
    currentIngredient: {},
    order: {
      id: 560 
    },
    isLoading: false,
    error: false
  },
  reducers: {
    CURRENT_INGREDIENT: (state, action) => {
      state.currentIngredient = action.payload
    },
    NEW_ORDER: (state) => {
      state.order.id = Math.floor(Math.random() * 10000)
    },
    ADD_STUFFING_TO_CONSTRUCTOR: (state, action) => {
      state.constructorIngredients.stuffing.push(action.payload)
    },
    DELETE_STUFF_FROM_CONSTRUCTOR: (state, action) => {
      // console.log(action)
      state.constructorIngredients.stuffing = state.constructorIngredients.stuffing.filter(el => el.key !== action.payload);
    },
    ADD_BUN_TO_CONSTRUCTOR: (state, action) => {
      state.constructorIngredients.bun = action.payload
    },
    SORT_STUFFING: (state, action) => {
      let prevState = state.constructorIngredients.stuffing;
      prevState.splice(action.payload.hoverIndex, 0, prevState.splice(action.payload.dragIndex, 1)[0]);
    }
  },

  extraReducers: (builder) => {
    // console.log(builder)
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchIngredientsData.pending, (state) => {
      // Add user to the state array
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchIngredientsData.fulfilled, (state, action) => {
      // Add user to the state array
        state.ingredients = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchIngredientsData.rejected, (state) => {
      // Add user to the state array
        state.isLoading = false;
        state.error = true;
      })
  }
});

export const { 
  CURRENT_INGREDIENT, 
  NEW_ORDER, 
  ADD_STUFFING_TO_CONSTRUCTOR,
  DELETE_STUFF_FROM_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  SORT_STUFFING
 } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;