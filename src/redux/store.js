import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import orderReducer from './slices/orderSlice';
import currentIngredientReducer from './slices/currentIngredientSlice';
import constructorIngredientsReducer from './slices/constructorIngredientsSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  currentIngredient: currentIngredientReducer,
  constructorIngredients: constructorIngredientsReducer
})

export const store = configureStore({
  reducer: rootReducer
})