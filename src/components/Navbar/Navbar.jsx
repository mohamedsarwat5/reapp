import React from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink } from 'react-router-dom'




export default function Navbar() {
    
    return (
        <>



            <nav className="bg-white shadow-md border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">


                    <div className='flex items-center'>
                        <Link to="/" className="me-10 flex items-center space-x-3 rtl:space-x-reverse">
                            <img src={logo} className="h-8" alt="Flowbite Logo" />
                        </Link>
                        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>

                        {/* ************** TABS******************** */}
                        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                            <ul className="font-medium text-xl flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <NavLink to="/home" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/cart" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Cart</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/product" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Products</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Categories</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/brands" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Brands</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* *********************** SOCIAL ICONS *****************/}
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link>
                                    <i className="fa-brands fa-instagram"></i>
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <i className="fa-brands fa-facebook"></i>
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <i className="fa-brands fa-twitter"></i>
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <i className="fa-brands fa-tiktok"></i>
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <i className="fa-brands fa-linkedin"></i>
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <i className="fa-brands fa-youtube"></i>
                                </Link>
                            </li>

                            <li>
                                <NavLink to= '/login'> Login</NavLink>
                            </li>
                            <li>
                                <NavLink to= '/'> Register</NavLink>
                            </li>

                        </ul>
                    </div>


                </div>
            </nav>








        </>
    )
}
