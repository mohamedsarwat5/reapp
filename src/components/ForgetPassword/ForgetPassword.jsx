import * as Yup from "yup";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

export default function ForgetPassword() {
    let [errorMessage, setError] = useState(null);
    let [formDisplay, setformDisplay] = useState(true);

    const baseUrl = "https://ecommerce.routemisr.com";
    let navg = useNavigate();
    let validYup = Yup.object({
        email: Yup.string().required("email required ").email("enter valid Email"),
    });


    let valid2Yup = Yup.object({
        resetCode: Yup.number().required("Reset Code required "),
    });


    let forgetForm = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: ForgetPasswordApi,
        validationSchema: validYup,
    });

    let verifyResetCodeForm = useFormik({
        initialValues: {
            resetCode: "",
        },
        onSubmit: verifyResetCodeApi,
        validationSchema: valid2Yup,
    });


    function verifyResetCodeApi(data) {
        axios
            .post(`${baseUrl}/api/v1/auth/verifyResetCode`, data)
            .then((req) => {
                console.log(req.data);
                navg('/UpdatePassword')
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    }


    function ForgetPasswordApi(data) {
        axios
            .post(`${baseUrl}/api/v1/auth/forgotPasswords`, data)
            .then((req) => {
                console.log(req.data);
                if (req.data.statusMsg == "success") {
                    setformDisplay(false)
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    }

    return (<>
        <div className="h-screen flex justify-center items-center w-full">

            {formDisplay ? <div className="w-full">
                <h2 className="text-center font-bold py-6 text-3xl">Verify your email</h2>

                <form onSubmit={forgetForm.handleSubmit} className="max-w-sm mx-auto px-3">
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your email
                        </label>
                        <input
                            value={forgetForm.values.email}
                            onChange={forgetForm.handleChange}
                            onBlur={forgetForm.handleBlur}
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {forgetForm.touched.email && forgetForm.errors.email ? (
                            <p className="text-red-600">{forgetForm.errors.email}</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-active hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Send
                    </button>
                </form>
            </div>
                : <div className="w-full">
                    <h2 className="text-center font-bold  text-3xl">Enter reset code</h2>

                    <form onSubmit={verifyResetCodeForm.handleSubmit} className="max-w-sm mx-auto px-3 mt-8">
                        <div className="mb-5">
                            <label
                                htmlFor="resetCode"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Enter reset code
                            </label>
                            <input
                                value={verifyResetCodeForm.values.resetCode}
                                onChange={verifyResetCodeForm.handleChange}
                                onBlur={verifyResetCodeForm.handleBlur}
                                type="string"
                                id="resetCode"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5  dark:focus:ring-active dark:focus:border-active"
                            />
                            {verifyResetCodeForm.touched.resetCode && verifyResetCodeForm.errors.resetCode ? (
                                <p className="text-red-600">{verifyResetCodeForm.errors.resetCode}</p>
                            ) : (
                                ""
                            )}
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-active hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Verify Code
                        </button>
                    </form>
                </div>}

        </div>













    </>

    )
}
