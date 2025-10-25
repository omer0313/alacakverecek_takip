import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: {} // { customerId: [ { productId, name, features, quantity, priceHistory, payments } ] }
  },
  reducers: {
    addOrder: (state, action) => {
      const { customerId, order } = action.payload;
      if (!state.carts[customerId]) state.carts[customerId] = [];
      state.carts[customerId].push(order);
    },
    addPayment: (state, action) => {
      const { customerId, orderIndex, month, amount } = action.payload;
      const order = state.carts[customerId][orderIndex];
      if (!order.payments) order.payments = [];
      order.payments.push({ month, paid: amount });
    },
  }
});

export const { addOrder, addPayment } = cartSlice.actions;
export default cartSlice.reducer;

