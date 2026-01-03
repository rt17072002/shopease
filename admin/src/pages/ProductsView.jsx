import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import axios from 'axios';


const ProductsView = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const { products, setProducts, fetchProducts, backendUrl } = useContext(AppContext)

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProduct = () => {
        setEditingProduct({ _id: null, name: '', price: '', image: '', category: '', stock: '', description: '' });
        setShowProductModal(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setShowProductModal(true);
    };

    const handleSaveProduct = async () => {
        if (!editingProduct.name || !editingProduct.price || !editingProduct.stock) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            const formData = new FormData();

            // Common fields
            formData.append("name", editingProduct.name);
            formData.append("price", editingProduct.price);
            formData.append("category", editingProduct.category);
            formData.append("description", editingProduct.description);
            formData.append("stock", editingProduct.stock);

            // ✅ Only append image if it's actually a File
            if (editingProduct.image instanceof File) {
                formData.append("image", editingProduct.image);
            }

            let response;

            if (editingProduct._id) {
                // UPDATE
                formData.append("productId", editingProduct._id);

                response = await axios.put(
                    `${backendUrl}/api/products/update`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
            } else {
                // CREATE
                response = await axios.post(
                    `${backendUrl}/api/products/add`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
            }

            if (response.data.success) {
                alert(
                    editingProduct._id
                        ? "Product updated successfully"
                        : "Product added successfully"
                );
                setShowProductModal(false);
                setEditingProduct(null);
                fetchProducts();
            } else {
                alert("Operation failed");
            }
        } catch (error) {
            console.log("Product save error:", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const response = await axios.delete(`${backendUrl}/api/products/remove`, { data: { id } })
            alert("Product deleted successfully");
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
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
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <span className="text-xl sm:text-3xl"><img className='w-16 rounded-sm h-16 object-cover' src={product.image} alt="" /></span>
                                        <div className="font-medium text-xs sm:text-base">{product.name}</div>
                                    </div>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 text-xs sm:text-base">{product.category}</td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-xs sm:text-base">₹{product.price}</td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${product.stock > 20 ? 'bg-green-100 text-green-700' :
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
                                            onClick={() => handleDeleteProduct(product._id)}
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

            {showProductModal &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 text-"> hello
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                            {editingProduct._id ? 'Edit Product' : 'Add New Product'}
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-1">Product Name *</label>
                                <input
                                    type="text"
                                    value={editingProduct.name}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-1">Price (₹) *</label>
                                <input
                                    type="number"
                                    value={editingProduct.price}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-1">Image </label>
                                <input
                                    type="file"
                                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.files[0] })}
                                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="📦"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-1">Category</label>
                                <input
                                    type="text"
                                    value={editingProduct.category}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-1">Stock *</label>
                                <input
                                    type="number"
                                    value={editingProduct.stock}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-1">Description</label>
                                <textarea
                                    value={editingProduct.description || ''}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
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
                                confirm
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProductsView
