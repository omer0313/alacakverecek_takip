import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomer } from './Slices/CustomerSlice';

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!name) return;
    dispatch(addCustomer({ name, contact }));
    setName(''); setContact('');
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input placeholder="İsim" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="İletişim" value={contact} onChange={e => setContact(e.target.value)} />
      <button onClick={handleAdd}>Müşteri Ekle</button>
    </div>
  );
};

export default CustomerForm;
