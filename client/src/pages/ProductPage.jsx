import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { ShoppingCart, User, Search, Package, CreditCard, MapPin, Phone, Mail, Trash2, Plus, Minus } from 'lucide-react';
import axios from "axios";

const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('online');
    const {selectedProduct, setView, addToCart,} = useContext(AppContext)

    if (!selectedProduct) return null;

    const handleBuyNow = () => {
        addToCart(selectedProduct, quantity);
        setView('checkout');
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <button
                onClick={() => setView('home')}
                className="mb-4 text-blue-600 hover:underline text-sm sm:text-base"
            >
                ← Back to Products
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                <div>
                    <div className="text-6xl h-100 sm:text-9xl text-center mb-4 overflow-hidden"><img className='rounded-xl w-full h-full object-cover' src={selectedProduct.image} alt="" /></div>
                    <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                        <p className="text-xs sm:text-sm text-gray-600">Category: {selectedProduct.category}</p>
                        <p className="text-xs sm:text-sm text-gray-600">In Stock: {selectedProduct.stock} units</p>
                    </div>
                </div>

                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{selectedProduct.name}</h1>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{selectedProduct.description}</p>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4 sm:mb-6">₹{selectedProduct.price}</div>

                    <div className="mb-4 sm:mb-6">
                        <label className="block text-xs sm:text-sm font-medium mb-2">Quantity</label>
                        <div className="flex items-center gap-3 sm:gap-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-2 border rounded-lg hover:bg-gray-100"
                            >
                                <Minus size={18} className="sm:w-5 sm:h-5" />
                            </button>
                            <span className="text-lg sm:text-xl font-semibold min-w-[2rem] text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                                className="p-2 border rounded-lg hover:bg-gray-100"
                            >
                                <Plus size={18} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="mb-4 sm:mb-6">
                        <label className="block text-xs sm:text-sm font-medium mb-2">Payment Method</label>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 p-2 sm:p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="online"
                                    checked={paymentMethod === 'online'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <CreditCard size={18} className="sm:w-5 sm:h-5" />
                                <span className="text-sm sm:text-base">Online Payment</span>
                            </label>
                            <label className="flex items-center gap-2 p-2 sm:p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <Package size={18} className="sm:w-5 sm:h-5" />
                                <span className="text-sm sm:text-base">Cash on Delivery</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            onClick={() => { addToCart(selectedProduct, quantity); alert('Added to cart!'); }}
                            className="flex-1 bg-gray-200 text-gray-800 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm sm:text-base"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
