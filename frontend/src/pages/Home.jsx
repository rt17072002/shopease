import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { Search} from 'lucide-react';
import Product from '../components/Product';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useContext(AppContext);
  
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mx-6 my-3 outline-none relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home
