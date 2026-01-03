import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import { Eye } from 'lucide-react';
import axios from "axios"


const OrdersView = () => {

    const [filterStatus, setFilterStatus] = useState('all');

    const { orders, setOrders, backendUrl, fetchOrders } = useContext(AppContext)
    const filteredOrders = orders.filter(o =>
        filterStatus === 'all' || o.status === filterStatus
    );

    const updateOrderStatus = async (orderId, newStatus) => {
        if (!orderId || !newStatus) {
            alert("Invalid order or status");
            return;
        }

        try {
            const response = await axios.put(
                `${backendUrl}/api/orders/update-status`,
                {
                    orderId,
                    status: newStatus, // ✅ match backend
                }
            );

            if (response.data.success) {
                alert("Status updated");
                await fetchOrders();
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };


    return (
        <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Orders Management</h2>

            <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 mb-4 sm:mb-6">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    <button
                        onClick={() => setFilterStatus('all')}
                        className={`whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                    >
                        All Orders
                    </button>
                    <button
                        onClick={() => setFilterStatus('pending')}
                        className={`whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${filterStatus === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100'}`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setFilterStatus('shipped')}
                        className={`whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${filterStatus === 'shipped' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                    >
                        Shipped
                    </button>
                    <button
                        onClick={() => setFilterStatus('delivered')}
                        className={`whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${filterStatus === 'delivered' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
                    >
                        Delivered
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
                <table className="w-full min-w-[640px]">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredOrders.map(order => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm">#{order._id}</td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{order.customer}</td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm">{order.date}</td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{order.items} items</td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-xs sm:text-sm">₹{order.total}</td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${order.payment === 'online' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {order.payment === 'online' ? 'Online' : 'COD'}
                                    </span>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                        className={`px-2 py-1 rounded text-xs border-0 cursor-pointer ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                    <button className="text-blue-600 hover:text-blue-800">
                                        <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrdersView
