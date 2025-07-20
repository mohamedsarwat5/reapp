import React, { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
export default function Navbar() {
    let { token, setToken } = useContext(AuthContext);
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
        "cart",
        "product",
        "categories",
        "brands",
        "wishlist",
    ];

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        navg("/");
    }

    function toggleMenu() {
        setIsMenuOpen((prev) => !prev);
    }

    return (
        <>
            <nav className="bg-white shadow-md  border-gray-200 h-[80px] fixed left-0 end-0 top-0 z-10  w-full flex justify-between items-center  md:px-16 p-4">
                <Link to="/" className="me-5  ">
                    <img src={logo} className="h-8  " alt="freshCart" />
                </Link>

                {/* menu links */}
                <div
                    className={`${isMenuOpen ? "hidden" : "md:flex"}  items-center  md:justify-between  absolute w-full  right-0 top-14 md:relative md:top-0`}>
                    <ul className="font-medium  text-xl flex  flex-col p-4 md:p-0 mt-4 border w-full border-gray-100 rounded-lg bg-gray-50 md:flex-row  gap-5  md:mt-0 md:border-0 md:bg-white">
                        {
                            menuList.map((list, index) => (
                                <li key={index}>
                                    <NavLink
                                        key={index}
                                        onClick={toggleMenu}
                                        to={list === "home" ? "/" : `/${list}`}
                                        className="hover:cursor-pointer capitalize hover:text-active duration-150 block py-2 px-3 bg-active-700 rounded md:bg-transparent md:text-active-700 md:p-0"
                                    >
                                        {list}
                                    </NavLink>
                                </li>
                            ))}

                        {/* *********************** SOCIAL ICONS *****************/}
                        <div className="">
                            <ul className="flex items-center gap-3 flex-col md:flex-row md:ms-60">
                                <ul className="font-medium   flex items-center gap-4 w-full justify-center  bg-gray-50  md:bg-white  md:pb-0 pb-3  ">
                                    {socialIcons.map((icon, i) => (
                                        <li key={i}>
                                            <Link to={"/home"}>
                                                <i
                                                    className={`hover:cursor-pointer hover:text-active duration-150 fa-brands fa-${icon}`}
                                                ></i>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                {/* logout and login and register */}

                                {token ? (
                                    <div className="flex items-center gap-4 pb-5 md:pb-0">
                                        <li className="hover:cursor-pointer">
                                            <span className="bg-transparent hover:text-white hover:bg-active duration-150  text-active rounded-xl border-active border-2 px-6 py-2  ">
                                                User
                                            </span>
                                        </li>
                                        <li
                                            onClick={() => {
                                                logout();
                                                toggleMenu();
                                            }}
                                            className="hover:cursor-pointer "
                                        >
                                            <span className="bg-active text-white rounded-xl border-active border-2 px-6 py-2 hover:bg-transparent hover:text-active duration-200 ">
                                                Logout
                                            </span>
                                        </li>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <li
                                            onClick={toggleMenu}
                                            className="rounded-xl bg-active text-white hover:cursor-pointer hover:border-active border-2 px-6 py-2 hover:bg-transparent hover:text-active duration-200"
                                        >
                                            <Link to="/login">Login</Link>
                                        </li>
                                        <li
                                            onClick={toggleMenu}
                                            className="hover:cursor-pointer hover:text-active"
                                        >
                                            <Link to="/signup"> Register</Link>
                                        </li>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </ul>
                </div>

                <button
                    onClick={toggleMenu}
                    id="button"
                    type="button"
                    className="inline-flex items-center ml-3 p-2 w-10 h-10 justify-center  text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none  "
                    aria-controls="menu"
                    aria-expanded="false"
                >
                    <i
                        class={` toggler fa-solid fa-${isMenuOpen ? "xmark" : "bars"
                            } text-xl `}
                    ></i>
                </button>
            </nav>
        </>
    );
}
