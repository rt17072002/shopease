import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
    const { addToCart, cart } = useContext(AppContext);
    let item = cart.find(obj => obj.id === product._id);
    let q = item ? item.q : 0
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition-shadow">
            <div onClick={() => navigate(`/product/${product._id}`)} className="text-6xl text-center mb-3 w-full text-center h-64 overflow-hidden"><img className='w-full h-full rounded-lg object-cover' src={product.image} alt="" /></div>
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.category}</p>
            <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">₹{product.price}</span>

                {product.stock<1 && <span className='text-red-500'>Out of stock</span>}
                {product.stock>0 && <div className='flex gap-2'>
                    {q === 0 ? <button onClick={() => addToCart(product._id, 1)} className="text-sm text-white bg-black px-4 py-2 mb-2 rounded-md">Add to cart</button>
                        : <div onClick={(e) => e.stopPropagation()} className="flex items-center bg-none h-9 text-black rounded-md overflow-hidden border border-indigo-100 shadow-sm">
                            <button onClick={() => addToCart(product._id, -1)} className="p-2 hover:bg-indigo-100 text-indigo-600 transition-colors">
                                <Minus size={18} strokeWidth={3} />
                            </button>

                            <span className="px-3 font-bold text-indigo-700 min-w-[2.5rem] text-center">
                                {q}
                            </span>

                            <button onClick={() => addToCart(product._id, 1)} className="p-2 hover:bg-indigo-100 text-indigo-600 transition-colors">
                                <Plus size={18} strokeWidth={3} />
                            </button>
                        </div>}
                    <button onClick={() => { navigate(`/checkout/${product._id}`) }} className="text-sm text-white bg-black px-4 py-2 mb-2 rounded-md">Buy now</button>
                </div>}
            </div>
        </div>
    )
}

export default Product
