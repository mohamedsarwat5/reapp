import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Product from './components/Product/Product'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import UpdatePassword from './components/UpdatePassword/UpdatePassword'
import AuthContextProvider from './Context/AuthContextProvider'
import ProtectedRouting from './components/ProtectedRouting/ProtectedRouting'
export default function app() {


    let route = createBrowserRouter([
        {
            path: '', element: <Layout></Layout>, children: [
                { index: true, element: <Signup></Signup> },
                { path: 'home', element: <ProtectedRouting><Home></Home> </ProtectedRouting> },
                { path: 'cart', element: <ProtectedRouting><Cart></Cart></ProtectedRouting> },
                { path: 'product', element: <ProtectedRouting><Product></Product></ProtectedRouting> },
                { path: 'categories', element: <ProtectedRouting><Categories></Categories></ProtectedRouting>},
                { path: 'brands', element:<ProtectedRouting><Brands></Brands></ProtectedRouting> },
                { path: 'login', element: <Login></Login> },
                { path: 'forgetPassword', element: <ForgetPassword></ForgetPassword> },
                { path: 'UpdatePassword', element: <UpdatePassword></UpdatePassword> },
            ]
        },
    ])

    return (

        <AuthContextProvider>
            <RouterProvider router={route}></RouterProvider>
        </AuthContextProvider>
    )
}
