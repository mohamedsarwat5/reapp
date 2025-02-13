import * as Yup from "yup";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContextProvider";

export default function Login() {
  let { setToken } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false)

  let [errorMessage, setError] = useState(null);

  const baseUrl = "https://ecommerce.routemisr.com";
  let navg = useNavigate();

  let validYup = Yup.object({
    email: Yup.string().required("Email Required ").email("Enter Valid Email"),
    password: Yup.string().required("Password Required"),
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
    setisLoading(true)

    axios
      .post(`${baseUrl}/api/v1/auth/signin`, data)
      .then((req) => {
        console.log(req.data);
        if (req.data.message == "success") {
          setToken(req.data.token);
          localStorage.setItem("token", req.data.token);
          setisLoading(false)

          navg("/home");
        }
      })
      .catch((error) => {
        setisLoading(false)

        setError(error.response.data.message);
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
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="w-full">
        {errorMessage && (
          <div
            className="w-80 mx-auto text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
            role="alert"
          >
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}
        <h2 className="text-center font-bold py-6 text-3xl">Login Now</h2>
        <form
          onSubmit={LoginForm.handleSubmit}
          className="max-w-sm mx-auto px-3"
        >
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
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

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your password
            </label>
            <input
              value={LoginForm.values.password}
              onChange={LoginForm.handleChange}
              onBlur={LoginForm.handleBlur}
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5  "
            />
            {LoginForm.touched.password && LoginForm.errors.password ? (
              <p className="text-red-600">{LoginForm.errors.password}</p>
            ) : (
              ""
            )}
            <Link to="/forgetPassword" className="mt-6 block hover:text-active">
              Forget Password ?
            </Link>
          </div>
          <button
            disabled={!(LoginForm.isValid && LoginForm.dirty)}
            type="submit"
            className="text-white disabled:bg-active disabled:opacity-50 bg-active  hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
