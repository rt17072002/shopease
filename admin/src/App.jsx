import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import { Package, ShoppingCart, TrendingUp } from 'lucide-react';
import DashboardView from './pages/DashboardView';
import ProductsView from './pages/ProductsView';
import OrdersView from './pages/OrdersView';

const App = () => {

  const {view, setView} = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-gray-800 text-white p-4 md:p-6 md:min-h-screen">
          <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">Admin Panel</h1>
          <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
            <button
              onClick={() => setView('dashboard')}
              className={`whitespace-nowrap md:w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base ${
                view === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <TrendingUp className="inline mr-2" size={18} />
              Dashboard
            </button>
            <button
              onClick={() => setView('products')}
              className={`whitespace-nowrap md:w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base ${
                view === 'products' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <Package className="inline mr-2" size={18} />
              Products
            </button>
            <button
              onClick={() => setView('orders')}
              className={`whitespace-nowrap md:w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base ${
                view === 'orders' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <ShoppingCart className="inline mr-2" size={18} />
              Orders
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          {view === 'dashboard' && <DashboardView />}
          {view === 'products' && <ProductsView />}
          {view === 'orders' && <OrdersView />}
        </div>
      </div>
    </div>
  )
}

export default App
