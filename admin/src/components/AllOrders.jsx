// src/components/AllOrders.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/order/allOrders');
            // Sort orders based on status: Food Processing -> Out for Delivery -> Delivered -> Cancelled
            const sortedOrders = response.data.data.sort((a, b) => {
                const statusOrder = {
                    'Food Processing': 0,
                    'Out for Delivery': 1,
                    'Delivered': 2,
                    'Cancelled': 3,
                };
                return statusOrder[a.status] - statusOrder[b.status];
            });
            setOrders(sortedOrders);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:4000/api/order/statusChange`, { orderId, status: newStatus });
            fetchOrders();
        } catch (err) {
            console.error('Error updating status:', err);
            setError('Failed to update order status.');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error fetching orders: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-8 bg-orange-200">
            <h1 className="text-3xl font-bold mb-8 text-center text-orange-700">All Orders</h1>
            <div className="grid gap-8">
                {orders.map((order, index) => (
                    <div key={order._id} className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-lg font-semibold text-blue-800">Order ID: {index + 1}</h2>
                            <span className={`px-2 py-1 text-sm font-semibold ${getStatusColor(order.status)} rounded-md`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-blue-800 text-sm font-semibold">Customer: {order.address.firstName} {order.address.lastName}</h3>
                            <p className="text-blue-800 text-sm">{order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zip_code}</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-blue-800 text-sm font-semibold">Items:</h3>
                            <ul className="list-disc list-inside">
                                {order.items.map((item) => (
                                    <li key={item._id} className="text-blue-800">{item.name} x{item.quantity}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-blue-800 text-sm font-semibold">Amount: ${order.amount.toFixed(2)}</h3>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-blue-800 text-sm font-semibold">Date: {new Date(order.date).toLocaleDateString()}</h3>
                        </div>
                        <div className="flex justify-end">
                            <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 bg-orange-500 text-blue-800 focus:outline-none"
                            >
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Food Processing':
            return 'bg-yellow-200 text-yellow-800';
        case 'Out for Delivery':
            return 'bg-blue-200 text-blue-800';
        case 'Delivered':
            return 'bg-green-200 text-green-800';
        case 'Cancelled':
            return 'bg-red-200 text-red-800';
        default:
            return 'bg-gray-200 text-gray-800';
    }
};

export default AllOrders;
