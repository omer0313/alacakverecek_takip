import React from 'react';
import MonthSelector from './Components/MonthSelector';
import CustomerForm from './Components/CustomerForm';
import CustomerList from './Components/CustomerList';

function App() {
  return (
    <div style={{ padding: 20, fontFamily:'sans-serif' }}>
      <h1>Fide / Ürün Abonelik Sistemi</h1>
      <MonthSelector/>
      <CustomerForm/>
      <CustomerList/>
    </div>
  )
}

export default App;
