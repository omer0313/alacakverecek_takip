import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from './Slices/CartSlice';

const baseProducts = [
  { id: 1, name: 'TORRY', price: 39.2 },
  { id: 2, name: 'REDGUARD', price: 41.4 },
  { id: 3, name: 'VERTY', price: 51 },
];

const generateYearlyPrices = basePrice => {
  const prices = {};
  let year = 2025, month = 9, currentPrice = basePrice;
  for (let i = 0; i < 12; i++) {
    prices[`${year}-${String(month).padStart(2, '0')}`] = Number(currentPrice.toFixed(2));
    currentPrice *= 1.04;
    month++; if (month>12) { month=1; year++; }
  }
  return prices;
}

const OrderForm = ({ customerId }) => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector(state => state.app.selectedMonth);
  const [selectedProduct, setSelectedProduct] = useState(baseProducts[0].id);
  const [quantity, setQuantity] = useState(1);
  const [features, setFeatures] = useState('');

  const handleAdd = () => {
    const product = baseProducts.find(p => p.id === Number(selectedProduct));
    dispatch(addOrder({
      customerId,
      order: {
        productId: product.id,
        name: product.name,
        features: features ? features.split(',').map(f=>f.trim()) : [],
        quantity: Number(quantity),
        priceHistory: generateYearlyPrices(product.price),
        payments: []
      }
    }));
    setQuantity(1); setFeatures('');
  };

  return (
    <div style={{ marginTop: 10 }}>
      <select value={selectedProduct} onChange={e=>setSelectedProduct(e.target.value)}>
        {baseProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <input type="number" min={1} value={quantity} onChange={e=>setQuantity(e.target.value)} placeholder="Adet"/>
      <input value={features} onChange={e=>setFeatures(e.target.value)} placeholder="Özellikler (virgülle)"/>
      <button onClick={handleAdd}>Sipariş Ekle</button>
    </div>
  )
}

export default OrderForm;
