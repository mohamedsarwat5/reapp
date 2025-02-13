import * as Yup from "yup";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

export default function UpdatePassword() {
    let [errorMessage, setError] = useState(null);
    const [isLoading, setisLoading] = useState(false)

    const baseUrl = "https://ecommerce.routemisr.com";
    let navg = useNavigate();
    let validYup = Yup.object({
        email: Yup.string().required("email required ").email("enter valid Email"),
        newPassword: Yup.string().required("New Password Required"),
    });
    let LoginForm = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        onSubmit: UpdatePasswordApi,
        validationSchema: validYup,
    });

    async function UpdatePasswordApi(data) {
        setisLoading(true)

        axios
            .put(`${baseUrl}/api/v1/auth/resetPassword`, data)
            .then((req) => {
                console.log(req.data);
                if (req.data.token) {
                    setisLoading(false)

                    navg("/");
                }
            })
            .catch((err) => {
                setisLoading(false)

                setError(err.response.data.message);
            });
    }

    if (isLoading) {
        return <div className='flex justify-center items-center bg-slate-300 h-screen'>
            <section className="dots-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </section>
        </div>
    }


    return (
        <div className="w-full h-screen flex justify-center flex-col items-center">
            <h2 className="text-center font-bold py-6 text-3xl">Update Your Password</h2>

            <form onSubmit={LoginForm.handleSubmit} className="max-w-sm w-full mx-auto px-3 ">
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        value={LoginForm.values.email}
                        onChange={LoginForm.handleChange}
                        onBlur={LoginForm.handleBlur}
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "
                    />
                    {LoginForm.touched.email && LoginForm.errors.email ? (
                        <p className="text-red-600">{LoginForm.errors.email}</p>
                    ) : (
                        ""
                    )}
                </div>

                <div className="mb-5 ">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your New Password
                    </label>
                    <input
                        value={LoginForm.values.newPassword}
                        onChange={LoginForm.handleChange}
                        onBlur={LoginForm.handleBlur}
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 "
                    />
                    {LoginForm.touched.newPassword && LoginForm.errors.newPassword ? (
                        <p className="text-red-600">{LoginForm.errors.newPassword}</p>
                    ) : (
                        ""
                    )}
                </div>
                <button
                    type="submit"
                    className="text-white bg-active hover:bg-green-600 focus:ring-acti-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center "
                >
                    Update
                </button>
            </form>
        </div>
    );
}
