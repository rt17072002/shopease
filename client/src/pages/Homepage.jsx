import React, { useContext, useState } from 'react'
import { ShoppingCart, User, Search, Package, CreditCard, MapPin, Phone, Mail, Trash2, Plus, Minus } from 'lucide-react';
import { mockProducts } from '../assets';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';

const Homepage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const {products} = useContext(AppContext);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
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
    )
}

export default Homepage
