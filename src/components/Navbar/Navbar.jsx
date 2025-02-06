import React, { useContext, useState } from 'react';
import logo from '../../assets/images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContextProvider';

export default function Navbar() {
    let { token, setToken } = useContext(AuthContext);
    let navg = useNavigate();
    let button = document.getElementById("button")
    let menu = document.getElementById('menu')
    function logout() {
        localStorage.removeItem('token');
        setToken(null);
        navg('/');
    }
    function toggleMenu() {
        button.addEventListener('click', () => {
            menu.classList.toggle('hidden')
        })
    }

    return (

        <>
            <nav className="bg-white shadow-md  border-gray-200 dark:bg-gray-900 fixed left-0 end-0 top-0 z-10">
                <div className="max-w-screen-xl flex  items-center justify-between mx-auto p-4">


                    <div className='flex items-center'>
                        <Link to="/home" className="me-10  ">
                            <img src={logo} className="h-8" alt="freshCart" />
                        </Link>
                        {token ? <div className=" hidden  md:flex md:justify-between w-full gap-80 absolute left-0 top-12 md:relative md:top-0" id="menu">
                            <ul className="font-medium  text-xl flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  gap-5  md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <NavLink to="/home" className=" hover:cursor-pointer hover:text-active duration-150 block py-2 px-3 bg-active-700 rounded md:bg-transparent md:text-active-700 md:p-0 dark:text-white md:dark:text-active-500">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/cart" className=" hover:cursor-pointer hover:text-active duration-150 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-active-700 md:p-0 dark:text-white md:dark:hover:text-active-500">Cart</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/product" className=" hover:cursor-pointer hover:text-active duration-150 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-active-700 md:p-0 dark:text-white md:dark:hover:text-active-500">Products</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/categories" className=" hover:cursor-pointer hover:text-active duration-150 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-active-700 md:p-0 dark:text-white md:dark:hover:text-active-500">Categories</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/brands" className=" hover:cursor-pointer hover:text-active duration-150 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-active-700 md:p-0 dark:text-white md:dark:hover:text-active-500">Brands</NavLink>
                                </li>
                            </ul>


                            {/* *********************** SOCIAL ICONS *****************/}

                            <ul className="font-medium  ms-auto flex items-center gap-4 w-full justify-center  bg-gray-50  md:bg-white  md:pb-0 pb-3  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <Link>
                                        <i className="hover:cursor-pointer hover:text-active duration-150 fa-brands fa-instagram"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link>
                                        <i className="hover:cursor-pointer hover:text-active duration-150 fa-brands fa-facebook"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link>
                                        <i className="hover:cursor-pointer hover:text-active duration-150 fa-brands fa-twitter"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link>
                                        <i className="hover:cursor-pointer hover:text-active duration-150 fa-brands fa-tiktok"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link>
                                        <i className="hover:cursor-pointer hover:text-active duration-150 fa-brands fa-linkedin"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link>
                                        <i className="hover:cursor-pointer hover:text-active duration-150 fa-brands fa-youtube"></i>
                                    </Link>
                                </li>





                            </ul>

                        </div> : ''}


                    </div>




                    <div className="ms-auto" >
                        <ul className='flex items-center gap-3 '>
                            {token ? <li onClick={logout} className='hover:cursor-pointer hover:text-active'>
                                <span>Logout</span></li> : <><li className='hover:cursor-pointer hover:text-active'>
                                    <NavLink to='/'> Login</NavLink>
                                </li>
                                <li className='hover:cursor-pointer hover:text-active'>
                                    <NavLink to='/signup'> Register</NavLink>
                                </li></>}
                        </ul>
                    </div>

                    <button onClick={toggleMenu} id='button' data-dropdown-toggle="menu" type="button" className="inline-flex items-center ml-3 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="menu" aria-expanded="false">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>


                </div>
            </nav>








        </>
    )
}
