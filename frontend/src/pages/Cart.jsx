import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { ShoppingCart, Plus, Minus , Trash2} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';


const Cart = () => {
  const {cart, getCartProducts ,addToCart, products} = useContext(AppContext)
  const navigate = useNavigate();

  const cartItems = getCartProducts(products, cart);
  const subtotal = cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

  return (
     <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h2>

            {cart.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                    <ShoppingCart size={48} className="sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-sm sm:text-base">Your cart is empty</p>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <div className="space-y-4 mb-6">
                        {cartItems.map(item => (
                            <div key={item._id} className="flex items-center gap-2 sm:gap-4 border-b pb-4">
                                <div onClick={()=>navigate(`/product/${item._id}`)} className="text-2xl sm:text-4xl"><img className='w-34 h-34 object-cover rounded-md' src={item.image} alt="" /></div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-sm sm:text-base truncate">{item.name}</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm">₹{item.price}</p>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <button
                                        onClick={() => addToCart(item._id, -1)}
                                        className="p-1 border rounded hover:bg-gray-100"
                                    >
                                        <Minus size={14} className="sm:w-4 sm:h-4" />
                                    </button>
                                    <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                                    <button
                                        onClick={() => addToCart(item._id, 1)}
                                        className="p-1 border rounded hover:bg-gray-100"
                                    >
                                        <Plus size={14} className="sm:w-4 sm:h-4" />
                                    </button>
                                </div>
                                <div className="font-semibold text-sm sm:text-base">₹{item.price * item.quantity}</div>
                                <button
                                    onClick={() => addToCart(item._id, item.quantity*-1)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={16} className="sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                            <span>Total:</span>
                            <span>₹{subtotal}</span>
                        </div>
                        <button
                            onClick={() => navigate("/checkout")}
                            className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 text-sm sm:text-base"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
  )
}

export default Cart
