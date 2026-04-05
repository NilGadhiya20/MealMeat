import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchOrder } from '../api';

const statusSteps = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder(id)
      .then(({ data }) => setOrder(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <main className="page"><div className="loading-spinner">Loading order...</div></main>;
  if (!order) return <main className="page"><p>Order not found.</p><Link to="/">← Home</Link></main>;

  const stepIndex = statusSteps.indexOf(order.status);

  return (
    <main className="page order-detail-page">
      <div className="order-success-banner">
        <span>🎉</span>
        <h1>Order Placed Successfully!</h1>
        <p>Order ID: <strong>#{order._id.slice(-8).toUpperCase()}</strong></p>
      </div>

      {/* Order Tracker */}
      <div className="order-tracker">
        {statusSteps.map((step, i) => (
          <div key={step} className={`tracker-step ${i <= stepIndex ? 'done' : ''} ${i === stepIndex ? 'active' : ''}`}>
            <div className="tracker-dot"></div>
            <span>{step.replace('_', ' ')}</span>
          </div>
        ))}
      </div>

      {/* Order Info */}
      <div className="order-info-grid">
        <div className="order-info-card">
          <h3>🏪 Restaurant</h3>
          <p>{order.restaurant?.name}</p>
        </div>
        <div className="order-info-card">
          <h3>📍 Delivery Address</h3>
          <p>{order.deliveryAddress}</p>
        </div>
        <div className="order-info-card">
          <h3>💳 Payment</h3>
          <p>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'} — {order.paymentStatus}</p>
        </div>
        <div className="order-info-card">
          <h3>📅 Ordered At</h3>
          <p>{new Date(order.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Items */}
      <div className="order-items">
        <h3>🍽️ Items Ordered</h3>
        {order.items.map((item, i) => (
          <div className="order-item-row" key={i}>
            <span>{item.name} × {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="order-total-row">
          <strong>Total</strong>
          <strong>₹{order.totalAmount.toFixed(2)}</strong>
        </div>
      </div>

      <Link to="/" className="btn-primary">← Continue Ordering</Link>
    </main>
  );
};

export default OrderDetail;
