/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/order/userOrders', {}, { headers: { token } });
      setOrders(response?.data?.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const handleTrackOrder = (orderId) => {
    console.log(`Tracking order ${orderId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching orders: {error.message}</div>;
  }

  return (
    <div className="orders-container">
      <h1>All Your Orders</h1>
      {orders?.length === 0 ? (
        <p>You have no previous orders.</p>
      ) : (
        <ul className="orders-list">
          {orders?.map((order, index) => (
            <li key={index} className="order-item">
              <div className="order-header">
                <h2>Order {index + 1}</h2>
                <p>{new Date(order?.date).toLocaleDateString()}</p>
              </div>
              <ul className="order-details">
                {order?.items.map((item, index) => (
                  <li key={index} className="order-detail-item">
                    <p>{item?.name} x{item?.quantity}</p>
                    <p>Price: ${item?.price.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
              <div className="order-footer">
                <p className="order-total">Total: ${order?.amount?.toFixed(2)}</p>
                <p className="order-status">Status: {order?.status || 'Food Processing'}</p>
                <button className="track-order-button" onClick={() => handleTrackOrder(order?._id)}>Track Order</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
