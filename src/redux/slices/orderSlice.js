import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {
      id: null,
      isOrderModalOpen: false
    }
  },
  reducers: {
    ORDER_MODAL_STATE: (state, action) => {
      if(action.payload) {
        state.order.id = Math.floor(Math.random() * 10000)
      }
      state.order.isOrderModalOpen = action.payload
    }
  }
});

export const { ORDER_MODAL_STATE } = orderSlice.actions;

export default orderSlice.reducer;