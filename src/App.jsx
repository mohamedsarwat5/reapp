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
export default function app() {


    let route = createBrowserRouter([
        {
            path: '', element: <Layout></Layout>, children: [
                { index: true, element: <Signup></Signup> },
                { path: 'cart', element: <Cart></Cart> },
                { path: 'product', element: <Product></Product> },
                { path: 'categories', element: <Categories></Categories> },
                { path: 'login', element: <Login></Login> },
                { path: 'brands', element: <Brands></Brands> },
                { path: 'home', element: <Home></Home> },
            ]
        },
    ])

    return (
        <RouterProvider router={route}></RouterProvider>
    )
}
