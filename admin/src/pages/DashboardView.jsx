import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const DashboardView = () => {

    const { products, orders } = useContext(AppContext);
    
    const stats = {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
        pendingOrders: orders.filter(o => o.status === 'pending').length
    };

    return (
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
                            <div key={order._id} className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-semibold text-sm md:text-base">#{order._id}</div>
                                    <div className="text-xs md:text-sm text-gray-600">{order.customer}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-sm md:text-base">₹{order.total}</div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
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
                            <div key={product._id} className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                                    <span className="text-xl md:text-2xl"><img className='w-16 h-16 rounded-sm object-cover' src={product.image} alt="" /></span>
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
    )
}

export default DashboardView
