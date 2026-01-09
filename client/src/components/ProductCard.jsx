import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
    const {setView, setSelectedProduct} = useContext(AppContext)

    return (
        <div
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition-shadow"
        >
            <div onClick={() => { setSelectedProduct(product); setView('product'); }} className="text-6xl text-center mb-3 w-full text-center h-64 overflow-hidden"><img className='w-full h-full rounded-lg object-cover' src={product.image} alt="" /></div>
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.category}</p>
            <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">₹{product.price}</span>
                <div className='flex flex-col'>
                <button className="text-sm text-white bg-black px-4 py-2 mb-2 rounded-md">Add to cart</button>
                <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
