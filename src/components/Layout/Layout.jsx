import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {


    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])
    return (<>


        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>


    </>

    )
}
