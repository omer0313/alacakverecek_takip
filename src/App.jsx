import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomerForm from './Components/CustomerForm';
import CustomerList from './Components/CustomerList';
import CustomerPage from './Components/CustomerPage';
import MonthSelector from './Components/MonthSelector';

function App() {
  return (
    <Router>
      <div style={{ padding: 20, fontFamily:'sans-serif' }}>
        <h1>Fide / Ürün Abonelik Sistemi</h1>
        <MonthSelector />
        <CustomerForm />
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/customer/:id" element={<CustomerPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
