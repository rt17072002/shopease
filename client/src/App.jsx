import React, { useContext, useState } from 'react'
import { ShoppingCart, User, Search, Package, CreditCard, MapPin, } from 'lucide-react';
import Homepage from './pages/Homepage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { mockProducts } from './assets';
import { AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

const App = () => {

  //   const {view, setView, products, setProducts, cart, setCart} = useContext(AppContext)
  //   const [searchTerm, setSearchTerm] = useState('');

  // const filteredProducts = products.filter(p =>
  //   p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   p.category.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {view === 'home' && <Homepage />}
        {view === 'product' && <ProductPage />}
        {view === 'cart' && <CartPage />}
        {view === 'checkout' && <CheckoutPage />}
      </main> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App


