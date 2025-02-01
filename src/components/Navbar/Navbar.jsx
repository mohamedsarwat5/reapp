import React, { useContext } from 'react';
import logo from '../../assets/images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContextProvider';

export default function Navbar() {
    let { token, setToken } = useContext(AuthContext);
    let navg = useNavigate();

    function logout() {
        localStorage.removeItem('token');
        setToken(null);
        navg('/');
    }


    return (

        <>
            <nav className="bg-white shadow-md  border-gray-200 dark:bg-gray-900 fixed left-0 end-0 top-0 z-10">
                <div className="max-w-screen-xl flex  items-center justify-between mx-auto p-4">


                    <div className='flex items-center'>
                        <Link to="/home" className="me-10  ">
                            <img src={logo} className="h-8" alt="freshCart" />
                        </Link>


                        {/* ************** TABS******************** */}

                        {token ? <div className="hidden w-full md:block md:w-auto absolute left-0 top-10 md:relative md:top-0" id="navbar-default">
                            <ul className="font-medium  text-xl flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  gap-5  md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <NavLink to="/home" className="block py-2 px-3 bg-active-700 rounded md:bg-transparent md:text-active-700 md:p-0 dark:text-white md:dark:text-active-500">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/cart" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-active-700 md:p-0 dark:text-white md:dark:hover:text-active-500">Cart</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/product" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-active-700 md:p-0 dark:text-white md:dark:hover:text-active-500">Products</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-active-700 md:p-0 dark:text-white md:dark:hover:text-active-500">Categories</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/brands" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-active-700 md:p-0 dark:text-white md:dark:hover:text-active-500">Brands</NavLink>
                                </li>
                            </ul>
                        </div> : ''}


                    </div>




                    {/* *********************** SOCIAL ICONS *****************/}
                    <div className="flex items-center" >
                        <ul className="font-medium flex  gap-4  ">
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

                            {token ? <li onClick={logout} className='hover:cursor-pointer'>
                                <span>Logout</span></li> : <><li>
                                    <NavLink to='/'> Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/signup'> Register</NavLink>
                                </li></>}



                        </ul>
                    </div>

                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>


                </div>
            </nav>








        </>
    )
}
