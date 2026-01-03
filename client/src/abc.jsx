import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Package, CreditCard, MapPin, Phone, Mail, Trash2, Plus, Minus } from 'lucide-react';

// Mock product data
const mockProducts = [
  { id: 1, name: 'Wireless Headphones', price: 2999, image: '🎧', category: 'Electronics', description: 'Premium wireless headphones with noise cancellation', stock: 15 },
  { id: 2, name: 'Smart Watch', price: 4999, image: '⌚', category: 'Electronics', description: 'Fitness tracking smart watch with heart rate monitor', stock: 20 },
  { id: 3, name: 'Laptop Backpack', price: 1499, image: '🎒', category: 'Accessories', description: 'Waterproof laptop backpack with multiple compartments', stock: 30 },
  { id: 4, name: 'Bluetooth Speaker', price: 1999, image: '🔊', category: 'Electronics', description: 'Portable bluetooth speaker with 12hr battery life', stock: 25 },
  { id: 5, name: 'Running Shoes', price: 3499, image: '👟', category: 'Fashion', description: 'Comfortable running shoes with cushioned sole', stock: 18 },
  { id: 6, name: 'Coffee Maker', price: 2499, image: '☕', category: 'Home', description: 'Automatic coffee maker with programmable timer', stock: 12 }
];

function App() {
  const [view, setView] = useState('home');
  const [products, setProducts] = useState(mockProducts);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState({ name: '', email: '', phone: '', address: '' });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product, quantity = 1) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const ProductCard = ({ product }) => (
    <div 
      onClick={() => { setSelectedProduct(product); setView('product'); }}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="text-6xl text-center mb-3">{product.image}</div>
      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.category}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-blue-600">₹{product.price}</span>
        <span className="text-sm text-gray-500">Stock: {product.stock}</span>
      </div>
    </div>
  );

  const HomePage = () => (
    <div>
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

  const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('online');

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
            <div className="text-6xl sm:text-9xl text-center mb-4">{selectedProduct.image}</div>
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
    );
  };

  const CartPage = () => (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <ShoppingCart size={48} className="sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-sm sm:text-base">Your cart is empty</p>
          <button 
            onClick={() => setView('home')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-2 sm:gap-4 border-b pb-4">
                <div className="text-2xl sm:text-4xl">{item.image}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base truncate">{item.name}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Minus size={14} className="sm:w-4 sm:h-4" />
                  </button>
                  <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Plus size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
                <div className="font-semibold text-sm sm:text-base">₹{item.price * item.quantity}</div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              <span>Total:</span>
              <span>₹{cartTotal}</span>
            </div>
            <button 
              onClick={() => setView('checkout')}
              className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 text-sm sm:text-base"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );

  const CheckoutPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
      if (!user.name || !user.phone || !user.address) {
        alert('Please fill in all required fields');
        return;
      }
      setOrderPlaced(true);
      setTimeout(() => {
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
                      onChange={(e) => setUser({...user, name: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({...user, email: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={user.phone}
                      onChange={(e) => setUser({...user, phone: e.target.value})}
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
                  onChange={(e) => setUser({...user, address: e.target.value})}
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
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
          <h1 
            onClick={() => setView('home')}
            className="text-xl sm:text-2xl font-bold text-blue-600 cursor-pointer"
          >
            ShopEase
          </h1>
          <div className="flex gap-2 sm:gap-4 items-center">
            <button 
              onClick={() => setView('home')}
              className="text-sm sm:text-base hover:text-blue-600 transition-colors"
            >
              Products
            </button>
            <button 
              onClick={() => setView('cart')}
              className="relative hover:text-blue-600 transition-colors"
            >
              <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {view === 'home' && <HomePage />}
        {view === 'product' && <ProductPage />}
        {view === 'cart' && <CartPage />}
        {view === 'checkout' && <CheckoutPage />}
      </main>

      <footer className="bg-gray-800 text-white py-6 sm:py-8 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 text-center">
          <p className="text-sm sm:text-base">&copy; 2024 ShopEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;