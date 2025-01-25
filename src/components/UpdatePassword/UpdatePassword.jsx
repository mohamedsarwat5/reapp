import * as Yup from "yup";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

export default function UpdatePassword() {
    let [errorMessage, setError] = useState(null);

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
        axios
            .put(`${baseUrl}/api/v1/auth/resetPassword`, data)
            .then((req) => {
                console.log(req.data);
                if (req.data.token) {
                    navg("/login");
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    }

    return (
        <div>
            <h2 className="text-center font-bold py-6 text-3xl">Update Password</h2>

            <form onSubmit={LoginForm.handleSubmit} className="max-w-sm mx-auto px-3">
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {LoginForm.touched.email && LoginForm.errors.email ? (
                        <p className="text-red-600">{LoginForm.errors.email}</p>
                    ) : (
                        ""
                    )}
                </div>

                <div className="mb-5">
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {LoginForm.touched.newPassword && LoginForm.errors.newPassword ? (
                        <p className="text-red-600">{LoginForm.errors.newPassword}</p>
                    ) : (
                        ""
                    )}
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Update Your Password
                </button>
            </form>
        </div>
    );
}
