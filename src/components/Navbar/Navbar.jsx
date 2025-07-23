import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
    let { token, setToken } = useContext(AuthContext);
    const [user, setUser] = useState(null)
    let navg = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const socialIcons = [
        "instagram",
        "facebook",
        "twitter",
        "tiktok",
        "linkedin",
        "youtube",
    ];
    const menuList = [
        "home",
        "product",
        "categories",
        "brands",
    ];

    const menu = ['cart', 'wishlist']

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        navg("/");
    }

    function toggleMenu() {
        setIsMenuOpen((prev) => !prev);
    }




    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token)
            setUser(decoded)
            console.log(decoded)
        }
    }, [token])

    return (

        <nav className="bg-white shadow-md  border-gray-200 h-[80px] fixed left-0 end-0 top-0 z-10  w-full flex justify-between items-center  md:px-16 p-4">
            <Link to="/" className="me-5  ">
                <img src={logo} className="h-8  " alt="freshCart" />
            </Link>

            {/* menu links */}
            <div
                className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center  md:justify-between  absolute w-full  right-0 top-14 md:relative md:top-0`}>
                <ul className="font-medium  text-xl flex  flex-col p-4 md:p-0 mt-4 border w-full border-gray-100 rounded-lg bg-gray-50 md:flex-row  gap-5  md:mt-0 md:border-0 md:bg-white">
                    {menuList.map((list, index) => (
                        <li key={index}>
                            <NavLink
                                key={index}
                                onClick={toggleMenu}
                                to={list === "home" ? "/" : `/${list}`}
                                className="link">
                                {list}
                            </NavLink>
                        </li>))}

                    {token && menu.map((link, i) => (<li key={i}>
                        <NavLink to={`/${link}`} className={`link`}>{link}</NavLink>
                    </li>))}
                </ul>
                {/* *********************** SOCIAL ICONS *****************/}
                <div className="flex items-center gap-3 flex-col md:flex-row md:ms-60  bg-gray-50 w-full md:w-auto md:bg-white py-3 ">
                    <div className="font-medium  flex items-center gap-4 w-full justify-center  bg-gray-50  md:bg-white  md:pb-0 pb-3  ">
                        {socialIcons.map((icon, i) => (
                            <Link key={i} to={"/"}>
                                <i className={`hover:cursor-pointer hover:text-active duration-150 fa-brands fa-${icon}`}></i>
                            </Link>
                        ))}
                    </div>

                    {/* logout and login and register */}
                    <div className="flex items-center gap-4">
                        {token ? (<>
                            <h4 className="hover:cursor-pointer bg-transparent hover:text-white uppercase font-semibold hover:bg-active duration-150  text-active  border-active border-2 w-10 h-10 items-center justify-center flex rounded-full ">
                                {user?.name.split(' ').slice(0, 2).map(word =>word.charAt(0))}
                            </h4>
                            <button onClick={() => {
                                logout();
                                toggleMenu();
                            }}
                                className="hover:cursor-pointer bg-active text-white rounded-xl border-active border-2 px-6 py-2 hover:bg-transparent hover:text-active duration-200 ">
                                Logout
                            </button>
                        </>) : (<>
                            <button
                                onClick={toggleMenu}
                                className="rounded-xl bg-active text-white hover:cursor-pointer hover:border-active border-2 px-6 py-2 hover:bg-transparent hover:text-active duration-200">
                                <Link to="/login">Login</Link>
                            </button>
                            <button
                                className="hover:cursor-pointer hover:text-active">
                                <Link onClick={toggleMenu} to="/signup"> Register</Link>
                            </button>
                        </>)}
                    </div>
                </div>

            </div>

            <button
                onClick={toggleMenu}
                id="button"
                type="button"
                className="inline-flex items-center ml-3 p-2 w-10 h-10 justify-center  text-gray-500 rounded-lg md:hidden hover:bg-gray-100 "
                aria-controls="menu"
                aria-expanded="false">
                <i className={` toggler fa-solid fa-${isMenuOpen ? "xmark" : "bars"} text-xl `}></i>
            </button>
        </nav>

    );
}
