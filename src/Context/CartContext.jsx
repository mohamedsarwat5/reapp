import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props) {



    function getCartItems() {
        let headers = { token: localStorage.getItem('token') }

        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then(request => request)
            .catch(error => error)
    }
    function displayWishList() {
        let headers = { token: localStorage.getItem('token') }

        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
            .then(request => request)
            .catch(error => error)
    }


    function addToCart(productId) {
        let headers = { token: localStorage.getItem('token') }

        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
            .then(request => request)
            .catch(error => error)
    }


    function addToWishList(productId) {
        let headers = { token: localStorage.getItem('token') }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers })
            .then(request => request)
            .catch(error => error)
    }

    function removeCartItems(productId) {
        let headers = { token: localStorage.getItem('token') }

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
            .then(response => response)
            .catch(error => error)
    }

    function removeWishListtItems() {
        let headers = { token: localStorage.getItem('token') }

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/`, { headers })
            .then(response => response)
            .catch(error => error)
    }

    function updateCartItems(productId, count) {
        let headers = { token: localStorage.getItem('token') }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count: count },
            { headers }
        )
            .then(response => response)
            .catch(error => error)
    }


    return <CartContext.Provider value={{ addToCart, getCartItems, removeCartItems, updateCartItems, addToWishList, displayWishList, removeWishListtItems }}>
        {props.children}
    </CartContext.Provider>
}