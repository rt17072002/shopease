import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
    const {setView, setSelectedProduct} = useContext(AppContext)

    return (
        <div
            onClick={() => { setSelectedProduct(product); setView('product'); }}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition-shadow"
        >
            <div className="text-6xl text-center mb-3 w-full text-center h-64 overflow-hidden"><img className='w-full h-full rounded-lg object-cover' src={product.image} alt="" /></div>
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.category}</p>
            <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">₹{product.price}</span>
                <span className="text-sm text-gray-500">Stock: {product.stock}</span>
            </div>
        </div>
    )
}

export default ProductCard
