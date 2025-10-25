import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: { selectedMonth: '2025-09' },
  reducers: {
    setMonth: (state, action) => { state.selectedMonth = action.payload; }
  }
});

export const { setMonth } = appSlice.actions;
export default appSlice.reducer;
