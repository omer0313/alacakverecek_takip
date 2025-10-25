import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMonth } from './Slices/AppSlice';

const MonthSelector = () => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector(state => state.app.selectedMonth);

  const months = [];
  let year = 2025, month = 9;
  for (let i = 0; i < 12; i++) {
    months.push(`${year}-${String(month).padStart(2, '0')}`);
    month++; if (month > 12) { month = 1; year++; }
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <label>Ay Seç: </label>
      <select value={selectedMonth} onChange={e => dispatch(setMonth(e.target.value))}>
        {months.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
    </div>
  );
};

export default MonthSelector;
