import { useEffect, useState } from "react";
import { createContext } from "react";
import { initialOrders, initialProducts } from "../assets";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const [view, setView] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
            if (response.data.success) {
                setProducts(response.data.data);
                console.log(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }
    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`);
            if (response.data.success) {
                setOrders(response.data.data);
                console.log(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(()=>{
        fetchProducts();
        fetchOrders();
    },[])

    const value = {
        view, setView,
        products, setProducts,
        orders, setOrders,
        fetchProducts,
        fetchOrders,
        backendUrl
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;