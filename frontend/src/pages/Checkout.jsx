import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { ShoppingCart, User, Search, Package, CreditCard, MapPin, Phone, Mail, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';


const Checkout = () => {
  const { productId } = useParams();
  const q = Number(new URLSearchParams(location.search).get("q")) || 1;
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cart, setCart, user, getCartProducts, setUser, products, } = useContext(AppContext);
  const navigate = useNavigate();

  const cartItems = productId ? getCartProducts(products, [{ id: productId, q }]) : getCartProducts(products, cart);

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const verifyPayment = async (paymentResponse, orderId) => {
    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders/verify", {
        ...paymentResponse,
        orderId
      });

      // console.log("Payment verification : ", res.data);

      // alert("Payment successful 🎉");
      localStorage.removeItem("cartData");
      setCart([])
      toast.success("Order placed successfully " + res.data.orderId);
      navigate("/");
    } catch (err) {
      toast.error("Order failed");
      navigate("/checkout/" + productId);

    }
  };

  const openRazorpayCheckout = (razorpayOrder, order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // PUBLIC KEY ONLY
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "Your Store Name",
      description: "Order Payment",
      order_id: razorpayOrder.id,

      handler: async function (response) {
        // console.log("Payment Success:", response);

        // OPTIONAL but IMPORTANT
        await verifyPayment(response, order._id);
      },

      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone
      },

      theme: {
        color: "#4f46e5"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleOnlinePayment = async (e) => {
    if (!user.name || !user.phone || !user.address) {
      alert("Please fill the required fields");
      return;
    }

    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders/place", { customer: user, items: productId ? [{ id: productId, q: 1 }] : cart });

      const { razorpayOrder, order } = res.data;

      openRazorpayCheckout(razorpayOrder, order);
    } catch (err) {
      console.error("Online payment failed : ", err);
      alert("Order creation failed");
    }
  };

  const handleCOD = async (e) => {
    e.preventDefault()
    if (!user.name || !user.phone || !user.address) {
      alert("Please fill the required fields");
      return;
    }
    if (!cartItems) {
      alert("Cart is empty!");
    }

    const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders/cod", { customer: user, items: productId ? [{ id: productId, q: 1 }] : cart });
    console.log(res);
    if (res.data.success) {
      localStorage.removeItem("cartData");
      toast.success("Order placed successfully " + res.data.order._id);
      navigate("/");
    } else {
      toast.error("Order failed");
      navigate("/checkout/" + productId);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex justify-start text-blue-600 hover:underline text-sm sm:text-base font-semibold"
            >
              ← Back
            </button>
            Checkout</h2>

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
              onClick={paymentMethod === "cod" ? handleCOD : handleOnlinePayment}
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
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between text-xs sm:text-sm">
                <span className="truncate pr-2">{item.name} x{item.quantity}</span>
                <span className="whitespace-nowrap">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 sm:pt-4 space-y-2">
            <div className="flex justify-between text-sm sm:text-base">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between font-bold text-base sm:text-lg border-t pt-2">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
