import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props) {

    let headers = { token: localStorage.getItem('token') }


    function getCartItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then(request => request)
            .catch(error => error)
    }


    function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
            .then(request => request)
            .catch(error => error)
    }

    function removeCartItems(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
            .then(response => response)
            .catch(error => error)
    }

    function updateCartItems(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count: count },
            { headers }
        )
            .then(response => response)
            .catch(error => error)
    }


    return <CartContext.Provider value={{ addToCart, getCartItems, removeCartItems, updateCartItems }}>
        {props.children}
    </CartContext.Provider>
}