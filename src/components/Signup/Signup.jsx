import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import * as Yup from 'yup'

export default function Signup() {
  let [errorMessage, setErrorMessage] = useState(null)
  const baseUrl = `https://ecommerce.routemisr.com`
  let navigation = useNavigate()

  let validationYup = Yup.object({
    name: Yup.string().required("Please Enter Your name").min(3, 'please enter at least 3 letters').max(20, ' maximam name is 20 letters'),
    email: Yup.string().required("Please enter Your email").email('Please enter valid email'),
    password: Yup.string().required('please Enter Your Password').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'password invalid'),
    rePassword: Yup.string().required('please confirm Your Password').oneOf([Yup.ref('password')], 'password not matched'),
    phone: Yup.string().required('enter your phone').matches(/^(20)?01[1250][0-9]{8}$/, 'enter valid phone number')

  })

  let initialValues = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: ''
  }
  async function registerApi(data) {
    axios.post(`${baseUrl}/api/v1/auth/signup`, data)
      .then(request => {
        if (request.data.message == 'success') {
          navigation('/login')
        }
      }).catch(error => {
        setErrorMessage(error.response.data.message)
        console.log(error.response.data.message)
      })
  }

  let registerForm = useFormik({
    initialValues,
    onSubmit: registerApi,
    validationSchema: validationYup,

  })





  return <>

    <h1 className='text-center font-bold py-6 text-3xl'> Register Now </h1>

    {errorMessage ? <div class="w-1/3 text-center mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span class="font-medium">{errorMessage}</span>
    </div> : ""}

    <form onSubmit={registerForm.handleSubmit} className="max-w-sm mx-auto px-3 ">

      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
        <input value={registerForm.values.name} onChange={registerForm.handleChange} onBlur={registerForm.handlebluonBlur} name='name' type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {registerForm.touched.name && registerForm.errors.name ? <p className='text-red-700'>{registerForm.errors.name}</p> : ''}
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name='email' type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {registerForm.touched.email && registerForm.errors.email ? <p className='text-red-700'>{registerForm.errors.email}</p> : ''}
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input value={registerForm.values.password} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name='password' type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {registerForm.touched.password && registerForm.errors.password ? <p className='text-red-700'>{registerForm.errors.password}</p> : ''}
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-Password</label>
        <input value={registerForm.values.rePassword} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name='rePassword' type="password" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {registerForm.touched.rePassword && registerForm.errors.rePassword ? <p className='text-red-700'>{registerForm.errors.rePassword}</p> : ''}
      </div>

      <div className="mb-5">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
        <input value={registerForm.values.phone} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name='phone' type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {registerForm.touched.phone && registerForm.errors.phone ? <p className='text-red-700'>{registerForm.errors.phone}</p> : ''}
      </div>

      <button disabled={!(registerForm.isValid && registerForm.dirty)} type="submit" className="text-white disabled:bg-blue-700 disabled:opacity-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>







  </>
}
