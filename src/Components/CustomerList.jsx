import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderForm from './OrderForm';
import { addPayment } from './Slices/CartSlice';

const CustomerList = () => {
  const customers = useSelector(state => state.customers.list);
  const carts = useSelector(state => state.cart.carts);
  const selectedMonth = useSelector(state => state.app.selectedMonth);
  const dispatch = useDispatch();
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  return (
    <div>
      {customers.map(c => (
        <div key={c.id} style={{ border:'1px solid #ccc', margin:5, padding:5 }}>
          <h3 onClick={()=>setSelectedCustomerId(c.id)} style={{ cursor:'pointer' }}>{c.name}</h3>

          {selectedCustomerId === c.id && <OrderForm customerId={c.id}/>}

          <ul>
            {(carts[c.id] || []).filter(o=>o.quantity>0).map((o,i)=>{
              const price = o.priceHistory[selectedMonth] || 0;
              const total = price * o.quantity;
              const paid = o.payments.filter(p=>p.month===selectedMonth).reduce((a,b)=>a+b.paid,0);
              const remaining = total - paid;
              return (
                <li key={i}>
                  {o.name} ({o.features.join(', ')}) x{o.quantity} - {price}₺ / Toplam: {total.toFixed(2)}₺
                  <br/>
                  Ödenen: {paid.toFixed(2)}₺ | Kalan: {remaining.toFixed(2)}₺
                  <button onClick={()=>{ const amount = remaining; dispatch(addPayment({customerId:c.id, orderIndex:i, month:selectedMonth, amount}))}}>Öde</button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
};

export default CustomerList;
