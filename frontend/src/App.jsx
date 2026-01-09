import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Checkout from './pages/Checkout'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:productId" element={<ProductPage/>}/>
        <Route path="/checkout/:productId" element={<Checkout/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/cart" element={<Cart/>}/>        
      </Routes>
      <Footer/>
    </div>
  )
}

export default App