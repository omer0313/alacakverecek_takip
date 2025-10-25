import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Components/Slices/CartSlice';
import customerReducer from './Components/Slices/CustomerSlice';
import appReducer from './Components/Slices/AppSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    customers: customerReducer,
    app: appReducer,
  },
});
