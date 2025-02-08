import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props) {



    function addToCart(productId) {
        let headers = { token: localStorage.getItem('token') }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
            .then(request => request)
            .catch(error => error)
    }


    return <CartContext.Provider value={{ addToCart }}>
        {props.children}
    </CartContext.Provider>
}