import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import AuthContextProvider from "./Context/AuthContextProvider";
import ProtectedRouting from "./components/ProtectedRouting/ProtectedRouting";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Notfound from "./components/Notfound/Notfound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import { HeroUIProvider } from "@heroui/react";
import WishList from "./components/WishList/WishList";

import AllOrders from "./components/AllOrders/AllOrders";
import Shipping from "./components/Shipping/Shipping";



export default function App() {
    let queryclient = new QueryClient();

    let route = createBrowserRouter([
        {
            path: "/",
            element: <Layout></Layout>,
            children: [
                { index: true, element: <Home></Home> },
                { path: "login", element: <Login></Login> },
                {
                    path: "cart",
                    element: (
                        <ProtectedRouting>
                            <Cart></Cart>
                        </ProtectedRouting>
                    ),
                },
                {
                    path: "shipping/:id",
                    element: (
                        <ProtectedRouting>
                            <Shipping />
                        </ProtectedRouting>
                    ),
                },
                {
                    path: "allorders",
                    element: (
                        <ProtectedRouting>
                            <AllOrders></AllOrders>
                        </ProtectedRouting>
                    ),
                },
                { path: "product", element: <Product></Product> },
                { path: "categories", element: <Categories></Categories> },
                { path: "brands", element: <Brands></Brands> },
                {
                    path: "wishlist",
                    element: (
                        <ProtectedRouting>
                            <WishList></WishList>
                        </ProtectedRouting>
                    ),
                },
                {
                    path: "ProductDetails/:id",
                    element: <ProductDetails></ProductDetails>,
                },
                { path: "signup", element: <Signup></Signup> },
                { path: "forgetPassword", element: <ForgetPassword></ForgetPassword> },
                { path: "UpdatePassword", element: <UpdatePassword></UpdatePassword> },
                { path: "*", element: <Notfound></Notfound> },
            ],
        },
    ]);

    return (
        <HeroUIProvider>
            <CartContextProvider>
                <QueryClientProvider client={queryclient}>
                    <AuthContextProvider>
                        <RouterProvider router={route}></RouterProvider>
                        <Toaster></Toaster>
                    </AuthContextProvider>
                </QueryClientProvider>
            </CartContextProvider>
        </HeroUIProvider>
    );
}
