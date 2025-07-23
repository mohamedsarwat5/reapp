import React, { createContext, useEffect, useState } from 'react'

export let AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    let [token, setToken] = useState(null)


    useEffect(() => {

        let TokenLocalStorage = localStorage.getItem("token")
        if (TokenLocalStorage) {
            setToken(TokenLocalStorage)
        }
    }, [])


    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}
