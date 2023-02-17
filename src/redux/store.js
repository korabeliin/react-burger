import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import orderReducer from './slices/orderSlice';
import currentIngredientReducer from './slices/currentIngredientSlice';
import constructorIngredientsReducer from './slices/constructorIngredientsSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  currentIngredient: currentIngredientReducer,
  constructorIngredients: constructorIngredientsReducer,
  user: userReducer
})

export const store = configureStore({
  reducer: rootReducer
})