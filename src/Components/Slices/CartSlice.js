import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: {} // { customerId: [ { productId, name, features, quantity, remainingQty, priceHistory, payments } ] }
  },
  reducers: {
    addOrder: (state, action) => {
      const { customerId, order } = action.payload;
      if (!state.carts[customerId]) state.carts[customerId] = [];
      state.carts[customerId].push({
        ...order,
        remainingQty: order.quantity,
        payments: []
      });
    },
    addPayment: (state, action) => {
      const { customerId, orderIndex, month, amount } = action.payload;
      const order = state.carts[customerId][orderIndex];
      const price = order.priceHistory[month] || 0;

      if (price <= 0) return;

      const paidQty = amount / price;

      order.payments.push({ month, amount, paidQty });

      // Kalan adet güncelle
      const totalPaidQty = order.payments.reduce((sum, p) => sum + p.paidQty, 0);
      order.remainingQty = Math.max(order.quantity - totalPaidQty, 0);
    }
  }
});

export const { addOrder, addPayment } = cartSlice.actions;
export default cartSlice.re

