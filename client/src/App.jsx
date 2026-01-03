import React, { useContext, useState } from 'react'
import { ShoppingCart, User, Search, Package, CreditCard, MapPin,} from 'lucide-react';
import Homepage from './pages/Homepage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { mockProducts } from './assets';
import { AppContext } from './context/AppContext';

const App = () => {

    const {view, setView, products, setProducts, cart, setCart} = useContext(AppContext)
    const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
        {view === 'home' && <Homepage />}
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
  )
}

export default App


