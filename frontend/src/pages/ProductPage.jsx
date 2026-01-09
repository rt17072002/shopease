import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShoppingCart, Package, CreditCard, Plus, Minus } from 'lucide-react';
import axios from 'axios';

const ProductPage = () => {
  const { addToCart , setSelectedItem} = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productItem, setProductItem] = useState(null)

  const getProduct = async () => {
    try{
      const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId);
      if(res.data) setProductItem(res.data);
    }catch(error){
      console.log("Error while fetching product in ProductPage: ",error);
    }
  }

  useEffect(()=>{
    getProduct();
  },[productId]);

  return (
    productItem 
    ?<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline text-sm sm:text-base"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        <div>
          <div className="text-6xl h-100 sm:text-9xl text-center mb-4 overflow-hidden">
            <img className='rounded-xl w-full h-full object-cover' src={productItem.image} alt="" />
          </div>
          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600">Category: {productItem.category}</p>
            <p className="text-xs sm:text-sm text-gray-600">In Stock: {productItem.stock} units</p>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{productItem.name}</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{productItem.description}</p>
          <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4 sm:mb-6">₹{productItem.price}</div>

          {productItem.stock<1 && <span><h1 className='text-red-500'>Out of stock</h1></span>}
          {productItem.stock>0 && <div><div className="mb-4 sm:mb-6">
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
                onClick={() => setQuantity(Math.min(productItem.stock, quantity + 1))}
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
              onClick={() => addToCart(productId, quantity)}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              Add to Cart
            </button>
            <button
              onClick={()=>{navigate(`/checkout/${productId}?q=${quantity}`)}}
              className="flex-1 bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Buy Now
            </button>
          </div></div> }
        </div>
      </div>
    </div>
    :<div className='flex justify-center items-center h-screen w-screen'>Loading...</div>
  )
}

export default ProductPage
