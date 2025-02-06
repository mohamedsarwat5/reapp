import * as Yup from "yup";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContextProvider";

export default function Login() {

  let { setToken } = useContext(AuthContext)

  let [errorMessage, setError] = useState(null);

  const baseUrl = "https://ecommerce.routemisr.com";
  let navg = useNavigate();
  let validYup = Yup.object({
    email: Yup.string().required("email required ").email("enter valid Email"),
    password: Yup.string().required("password Required"),
  });
  let LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: LoginApi,
    validationSchema: validYup,
  });

  async function LoginApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/signin`, data)
      .then((req) => {
        console.log(req.data);
        if (req.data.message == "success") {

          setToken(req.data.token)
          localStorage.setItem('token', req.data.token)



          navg("/home");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (
    <div className="mt-16 h-screen ">
      <h2 className="text-center font-bold py-6 text-3xl">Login Now</h2>

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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            Your password
          </label>
          <input
            value={LoginForm.values.password}
            onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {LoginForm.touched.password && LoginForm.errors.password ? (
            <p className="text-red-600">{LoginForm.errors.password}</p>
          ) : (
            ""
          )}
          <Link to='/forgetPassword' className="mt-6 block hover:text-active">Forget Password ?</Link>
        </div>
        <button
          type="submit"
          className="text-white bg-active hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
