import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [cart, setCart] = useState(localStorage.getItem("cartData") ? JSON.parse(localStorage.getItem("cartData")) : []);
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({ name: '', email: '', phone: '', address: '' });
    const [selectedItem, setSelectedItem] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const totalItems = cart.reduce((total, item) => total + item.q, 0);

    const fetchProducts = async () => {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/");
        setProducts(res.data)
    }

    const addToCart = (id, q) => {
        setCart(prev => {
            const updated = Array.isArray(prev) ? [...prev] : [];

            const index = updated.findIndex(item => item.id === id);

            if (index !== -1) {
                updated[index].q += q;

                if (updated[index].q <= 0) {
                    updated.splice(index, 1);
                }
            } else if (q > 0) {
                updated.push({ id, q });
            }

            localStorage.setItem("cartData", JSON.stringify(updated));
            return updated;
        });
    };

    function getCartProducts(productsData, cartData) {
        const result = [];

        for (let i = 0; i < cartData.length; i++) {
            const cartItem = cartData[i];

            const product = productsData.find(
                p => String(p._id) === String(cartItem.id)
            );

            if (!product) continue;

            result.push({
                ...product,
                quantity: cartItem.q
            });
        }

        return result;
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const value = {
        products, setProducts,
        cart, setCart,
        backendUrl,
        products,
        addToCart, cart,
        totalItems,
        getCartProducts,
        user, setUser,
        selectedItem, setSelectedItem,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;