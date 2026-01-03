import React, { useContext, useState } from 'react'
import { ShoppingCart, User, Search, Package, CreditCard, MapPin, Phone, Mail, Trash2, Plus, Minus } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';


const CheckoutPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const { cart, cartTotal, user, setUser, setView, setCart, backendUrl } = useContext(AppContext);


    const handlePlaceOrder = async () => {
        if (!user.name || !user.phone || !user.address) {
            alert('Please fill in all required fields');
            return;
        }
        setOrderPlaced(true);
        try {
            const response = await axios.post(`${backendUrl}/api/orders/place`, { user, cart })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
        setTimeout(() => {
            console.log({ user: user, cart: cart })
            setCart([]);
            setView('home');
            setOrderPlaced(false);
        }, 3000);
    };

    if (orderPlaced) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 text-center">
                <div className="text-5xl sm:text-6xl mb-4">✅</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
                <p className="text-gray-600 text-sm sm:text-base">Thank you for your purchase. You will receive a confirmation email shortly.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Checkout</h2>

                    <div>
                        <div className="mb-4 sm:mb-6">
                            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                                <User size={18} className="sm:w-5 sm:h-5" />
                                Contact Information
                            </h3>
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium mb-1">Full Name *</label>
                                    <input
                                        type="text"
                                        value={user.name}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                        className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium mb-1">Phone Number *</label>
                                    <input
                                        type="tel"
                                        value={user.phone}
                                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                        className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 sm:mb-6">
                            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                                <MapPin size={18} className="sm:w-5 sm:h-5" />
                                Delivery Address
                            </h3>
                            <textarea
                                value={user.address}
                                onChange={(e) => setUser({ ...user, address: e.target.value })}
                                rows="4"
                                className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                placeholder="Enter your complete delivery address"
                            />
                        </div>

                        <div className="mb-4 sm:mb-6">
                            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                                <CreditCard size={18} className="sm:w-5 sm:h-5" />
                                Payment Method
                            </h3>
                            <div className="space-y-2 sm:space-y-3">
                                <label className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="online"
                                        checked={paymentMethod === 'online'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <div>
                                        <div className="font-medium text-sm sm:text-base">Online Payment</div>
                                        <div className="text-xs sm:text-sm text-gray-600">Pay using Card, UPI, Net Banking</div>
                                    </div>
                                </label>
                                <label className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <div>
                                        <div className="font-medium text-sm sm:text-base">Cash on Delivery</div>
                                        <div className="text-xs sm:text-sm text-gray-600">Pay when you receive the product</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 text-sm sm:text-base"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:sticky lg:top-4">
                    <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Order Summary</h3>
                    <div className="space-y-2 sm:space-y-3 mb-4">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between text-xs sm:text-sm">
                                <span className="truncate pr-2">{item.name} x{item.quantity}</span>
                                <span className="whitespace-nowrap">₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-3 sm:pt-4 space-y-2">
                        <div className="flex justify-between text-sm sm:text-base">
                            <span>Subtotal</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base">
                            <span>Shipping</span>
                            <span className="text-green-600">FREE</span>
                        </div>
                        <div className="flex justify-between font-bold text-base sm:text-lg border-t pt-2">
                            <span>Total</span>
                            <span>₹{cartTotal}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage
