import React, { useContext, useState } from 'react';
import logo from '../../assets/images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContextProvider';
export default function Navbar() {
    let { token, setToken } = useContext(AuthContext);
    let navg = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const socialIcons = ["instagram", "facebook", "twitter", "tiktok", "linkedin", "youtube"]
    const menuList = ["home", "cart", "product", "categories", "brands", "wishlist"]
    function logout() {
        localStorage.removeItem('token');
        setToken(null);
        navg('/');
    }
    function toggleMenu() {
        setIsMenuOpen(prev => !prev);
       

    }
    return (
        <>
            <nav className="bg-white shadow-md  border-gray-200  fixed left-0 end-0 top-0 z-10 max-w-screen w-full flex  items-center justify-between md:px-16 p-4">

                <Link to="/home" className="me-5  ">
                    <img src={logo} className="h-8 " alt="freshCart" />
                </Link>

                {/* menu links */}
                <div className={`${isMenuOpen ? '' : 'hidden'}  items-center md:flex md:justify-between w-full md:w-fit absolute left-0 top-12 md:relative md:top-0`}>

                    <ul className="font-medium  text-xl flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  gap-5  md:mt-0 md:border-0 md:bg-white">
                        {token && menuList.map((list, index) => (
                            <li key={index}>
                                <NavLink onClick={toggleMenu}
                                    to={`/${list}`}
                                    className="hover:cursor-pointer capitalize hover:text-active duration-150 block py-2 px-3 bg-active-700 rounded md:bg-transparent md:text-active-700 md:p-0"
                                >
                                    {list}
                                </NavLink>
                            </li>


                        ))}

                        {/* *********************** SOCIAL ICONS *****************/}
                        <div className="md:ms-96" >

                            <ul className='flex items-center gap-3 flex-col md:flex-row '>
                                <ul className="font-medium  ms-auto flex items-center gap-4 w-full justify-center  bg-gray-50  md:bg-white  md:pb-0 pb-3  ">
                                    {socialIcons.map((icon, i) => <li key={i}>
                                        <Link >
                                            <i className={`hover:cursor-pointer hover:text-active duration-150 fa-brands fa-${icon}`}></i>
                                        </Link>
                                    </li>)}
                                </ul>
                                {/* logout and login and register */}

                                {token ? <li onClick={() => { logout(); toggleMenu(); }} className='hover:cursor-pointer '>
                                    <span className='bg-active text-white rounded-xl border-active border-1 px-6 py-2 hover:bg-transparent hover:text-active duration-200 '>Logout</span></li> : <div className='flex items-center gap-4'><li onClick={toggleMenu} className='rounded-xl bg-active text-white hover:cursor-pointer border-active border-1 px-6 py-2 hover:bg-transparent hover:text-active duration-200'>
                                        <Link to='/'>Login</Link>
                                    </li>
                                    <li onClick={toggleMenu} className='hover:cursor-pointer hover:text-active'>
                                        <Link to='/signup'> Register</Link>
                                    </li></div>}
                            </ul>
                        </div>
                    </ul>

                </div>




                <button onClick={toggleMenu} id='button' type="button" className="inline-flex items-center ml-3 p-2 w-10 h-10 justify-center  text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none  " aria-controls="menu" aria-expanded="false">
                    <i class={` toggler fa-solid fa-${isMenuOpen ? 'xmark' : 'bars'} text-xl `}></i>
                </button>



            </nav>
        </>
    )
}
