import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    list: [], // { id, name, contact }
  },
  reducers: {
    addCustomer: (state, action) => {
      state.list.push({ id: Date.now(), ...action.payload });
    },
  }
});

export const { addCustomer } = customerSlice.actions;
export default customerSlice.reducer;
