import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const customers = useSelector(state => state.customers.list);

  return (
    <div>
      <h2>Müşteriler</h2>
      <ul>
        {customers.map(c => (
          <li key={c.id}>
            {c.name} - {c.contact} 
            <Link to={`/customer/${c.id}`} style={{ marginLeft: 10 }}>Detaylar</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CustomerList;

