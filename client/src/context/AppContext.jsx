import { createContext, useEffect, useState } from "react";
import { mockProducts } from "../assets";
import axios from "axios"

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [cart, setCart] = useState(localStorage.getItem("cartData")?JSON.parse(localStorage.getItem("cartData")):[]);
    const [view, setView] = useState('home');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [user, setUser] = useState({ name: '', email: '', phone: '', address: '' });
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const addToCart = (product, quantity = 1) => {
        const existing = cart.find(item => item._id === product._id);
        if (existing) {
            setCart(cart.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity }]);
        }
    };

    const updateQuantity = (productId, change) => {
        setCart(cart.map(item =>
            item._id === productId
                ? { ...item, quantity: Math.max(1, item.quantity + change) }
                : item
        ));
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item._id !== productId));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/products`);
            if (response.data.success) {
                setProducts(response.data.data);
                console.log(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }
    
    useEffect(()=>{
        console.log(cart);
        localStorage.setItem("cartData",JSON.stringify(cart))
    },[cart])
    
    useEffect(() => {
        fetchProducts();
    }, [])

    const value = {
        view, setView,
        products, setProducts,
        cart, setCart,
        user, setUser,
        selectedProduct, setSelectedProduct,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartTotal,
        cartCount,
        fetchProducts,
        backendUrl,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;