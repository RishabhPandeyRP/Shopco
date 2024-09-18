import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderId: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Action to add a new order
    addOrder: (state, action) => {
      state.orderId = (action.payload);
    },
    // Action to update the status of an order
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((order) => order.orderId === orderId);
      if (order) {
        order.status = status;
      }
    },
    // Action to clear all orders (e.g., for logout or reset)
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

// Exporting the actions to use in components
export const { addOrder, updateOrderStatus, clearOrders } = ordersSlice.actions;

// Exporting the reducer to be used in the store configuration
export default ordersSlice.reducer;
