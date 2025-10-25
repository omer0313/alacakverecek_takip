import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OrderForm from './OrderForm';
import { addPayment } from './Slices/CartSlice';

const CustomerPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const customer = useSelector(state => state.customers.list.find(c => c.id === Number(id)));
  const orders = useSelector(state => state.cart.carts[id] || []);
  const selectedMonth = useSelector(state => state.app.selectedMonth);

  if (!customer) return <div>Müşteri bulunamadı</div>;

  const handlePay = (orderIndex) => {
    const amount = prompt("Ödenecek miktarı girin (₺):");
    if (!amount || isNaN(amount)) return;
    dispatch(addPayment({ customerId: id, orderIndex, month: selectedMonth, amount: Number(amount) }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{customer.name} - {customer.contact}</h2>
      <OrderForm customerId={id} />
      <h3>{selectedMonth} Aylık Siparişler</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Ürün</th>
            <th>Özellikler</th>
            <th>Toplam Adet</th>
            <th>Ödenen Adet</th>
            <th>Kalan Adet</th>
            <th>O Ay Fiyatı</th>
            <th>Kalan Borç</th>
            <th>Ödeme</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => {
            const price = o.priceHistory[selectedMonth] || 0;
            const paidQty = o.payments.reduce((sum, p) => sum + p.paidQty, 0);
            const kalanBorç = o.remainingQty * price;
            return (
              <tr key={i}>
                <td>{o.name}</td>
                <td>{o.features.join(', ')}</td>
                <td>{o.quantity}</td>
                <td>{paidQty.toFixed(2)}</td>
                <td>{o.remainingQty.toFixed(2)}</td>
                <td>{price.toFixed(2)}</td>
                <td>{kalanBorç.toFixed(2)}</td>
                <td><button onClick={() => handlePay(i)}>Öde</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerPage;
