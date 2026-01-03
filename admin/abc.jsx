import React, { useState } from 'react';
import { Package, ShoppingCart, Users, TrendingUp, Plus, Edit2, Trash2, Eye, Search, Filter } from 'lucide-react';

// Mock initial data
const initialProducts = [
  { id: 1, name: 'Wireless Headphones', price: 2999, image: '🎧', category: 'Electronics', stock: 15, sales: 45 },
  { id: 2, name: 'Smart Watch', price: 4999, image: '⌚', category: 'Electronics', stock: 20, sales: 32 },
  { id: 3, name: 'Laptop Backpack', price: 1499, image: '🎒', category: 'Accessories', stock: 30, sales: 67 },
  { id: 4, name: 'Bluetooth Speaker', price: 1999, image: '🔊', category: 'Electronics', stock: 25, sales: 54 },
  { id: 5, name: 'Running Shoes', price: 3499, image: '👟', category: 'Fashion', stock: 18, sales: 29 },
  { id: 6, name: 'Coffee Maker', price: 2499, image: '☕', category: 'Home', stock: 12, sales: 38 }
];

const initialOrders = [
  { id: 1001, customer: 'Rahul Sharma', items: 2, total: 7998, status: 'pending', payment: 'online', date: '2024-12-28' },
  { id: 1002, customer: 'Priya Singh', items: 1, total: 1499, status: 'delivered', payment: 'cod', date: '2024-12-27' },
  { id: 1003, customer: 'Amit Kumar', items: 3, total: 8497, status: 'shipped', payment: 'online', date: '2024-12-28' },
  { id: 1004, customer: 'Neha Gupta', items: 1, total: 4999, status: 'pending', payment: 'cod', date: '2024-12-29' },
  { id: 1005, customer: 'Vikas Patel', items: 2, total: 5498, status: 'shipped', payment: 'online', date: '2024-12-29' }
];

function AdminPanel() {
  const [view, setView] = useState('dashboard');
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    pendingOrders: orders.filter(o => o.status === 'pending').length
  };

  const DashboardView = () => (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4 md:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <Package size={24} className="md:w-8 md:h-8" />
            <span className="text-2xl md:text-3xl font-bold">{stats.totalProducts}</span>
          </div>
          <div className="text-blue-100 text-sm md:text-base">Total Products</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4 md:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <ShoppingCart size={24} className="md:w-8 md:h-8" />
            <span className="text-2xl md:text-3xl font-bold">{stats.totalOrders}</span>
          </div>
          <div className="text-green-100 text-sm md:text-base">Total Orders</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4 md:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <TrendingUp size={24} className="md:w-8 md:h-8" />
            <span className="text-2xl md:text-3xl font-bold">₹{stats.totalRevenue}</span>
          </div>
          <div className="text-purple-100 text-sm md:text-base">Total Revenue</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4 md:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <Users size={24} className="md:w-8 md:h-8" />
            <span className="text-2xl md:text-3xl font-bold">{stats.pendingOrders}</span>
          </div>
          <div className="text-orange-100 text-sm md:text-base">Pending Orders</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Recent Orders</h3>
          <div className="space-y-2 md:space-y-3">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-sm md:text-base">#{order.id}</div>
                  <div className="text-xs md:text-sm text-gray-600">{order.customer}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm md:text-base">₹{order.total}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Top Selling Products</h3>
          <div className="space-y-2 md:space-y-3">
            {products.sort((a, b) => b.sales - a.sales).slice(0, 5).map(product => (
              <div key={product.id} className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <span className="text-xl md:text-2xl">{product.image}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm md:text-base truncate">{product.name}</div>
                    <div className="text-xs md:text-sm text-gray-600">Stock: {product.stock}</div>
                  </div>
                </div>
                <div className="text-right ml-2">
                  <div className="font-bold text-blue-600 text-sm md:text-base">{product.sales} sold</div>
                  <div className="text-xs md:text-sm text-gray-600">₹{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ProductsView = () => {
    const filteredProducts = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProduct = () => {
      setEditingProduct({ id: null, name: '', price: '', image: '', category: '', stock: '', description: '' });
      setShowProductModal(true);
    };

    const handleEditProduct = (product) => {
      setEditingProduct(product);
      setShowProductModal(true);
    };

    const handleSaveProduct = () => {
      if (!editingProduct.name || !editingProduct.price || !editingProduct.stock) {
        alert('Please fill in all required fields');
        return;
      }

      if (editingProduct.id) {
        setProducts(products.map(p => p.id === editingProduct.id ? { ...editingProduct, sales: p.sales } : p));
      } else {
        const newProduct = {
          ...editingProduct,
          id: Math.max(...products.map(p => p.id)) + 1,
          sales: 0
        };
        setProducts([...products, newProduct]);
      }
      setShowProductModal(false);
      setEditingProduct(null);
    };

    const handleDeleteProduct = (id) => {
      if (confirm('Are you sure you want to delete this product?')) {
        setProducts(products.filter(p => p.id !== id));
      }
    };

    return (
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Products Management</h2>
          <button 
            onClick={handleAddProduct}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 mb-4 sm:mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 sm:top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-3xl">{product.image}</span>
                      <div className="font-medium text-xs sm:text-base">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 text-xs sm:text-base">{product.category}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-xs sm:text-base">₹{product.price}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock > 20 ? 'bg-green-100 text-green-700' :
                      product.stock > 10 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 text-xs sm:text-base">{product.sales}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                {editingProduct.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">Product Name *</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">Image (Emoji)</label>
                  <input
                    type="text"
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="📦"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">Stock *</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: Number(e.target.value)})}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={editingProduct.description || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                    rows="2"
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                <button 
                  onClick={() => { setShowProductModal(false); setEditingProduct(null); }}
                  className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 border rounded-lg hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProduct}
                  className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const OrdersView = () => {
    const filteredOrders = orders.filter(o => 
      filterStatus === 'all' || o.status === filterStatus
    );

    const updateOrderStatus = (orderId, newStatus) => {
      setOrders(orders.map(o => o.id === orderId ? {...o, status: newStatus} : o));
    };

    return (
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Orders Management</h2>

        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 mb-4 sm:mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              All Orders
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${filterStatus === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('shipped')}
              className={`whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${filterStatus === 'shipped' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              Shipped
            </button>
            <button
              onClick={() => setFilterStatus('delivered')}
              className={`whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${filterStatus === 'delivered' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
            >
              Delivered
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm">#{order.id}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{order.customer}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm">{order.date}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{order.items} items</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-xs sm:text-sm">₹{order.total}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.payment === 'online' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {order.payment === 'online' ? 'Online' : 'COD'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`px-2 py-1 rounded text-xs border-0 cursor-pointer ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

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
  );
}

export default AdminPanel;