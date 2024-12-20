/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setfoodList] = useState([]);
    const url = "http://localhost:4000";

    useEffect(() => {
        fetchFoodList();
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            loadCartData();
        }
    }, [token])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        if (token) {
            const response = await axios.post(url + "/api/cart/add", { itemId }, {
                headers: {
                    token
                }
            });
            setCartItems(response.data.data);
            console.log('====================================');
            console.log(response);
            console.log('====================================');
        }
    }


    const loadCartData = async () => {
        if (token) {
            const response = await axios.get(url + "/api/cart/get", {
                headers: {
                    token
                }
            });
            setCartItems(response.data.data)
            console.log('====================================');
            console.log(response.data.data);
            console.log('====================================');
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        const response = await axios.post(url + "/api/cart/remove", { itemId }, {
            headers: {
                token
            }
        })
        setCartItems(response.data.data)
        console.log('====================================');
        console.log(response);
        console.log('====================================');
    }

    const fetchFoodList = async () => {
        const response = await axios.get("http://localhost:4000/api/food/list");
        setfoodList(response.data.data);
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let iteminfo = food_list.find((product) => product._id === item);
                totalAmount += iteminfo?.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token, setToken, url
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider