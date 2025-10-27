import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContextProvider'

export default function Shipping() {
    const { token } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const initialValues = {
        details: '',
        phone: '',
        city: ''
    }
    const headerOption = {
        headers: {
            token: token
        }
    }
    const handlePay = (values) => {
        setLoading(true)
        const data = {
            shippingAddress: values
        }
        const baseURL = window.location.origin;
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${baseURL}`, data, headerOption)
            .then((request) => {
                window.open(request.data.session.url, "_self")
            }).finally(() => setLoading(false))
    }
    const formikPay = useFormik({
        initialValues,
        onSubmit: handlePay
    })
    return (
        <div className='min-h-screen'>
            <h2 className='mt-24 text-center font-semibold text-xl'>Shipping Details</h2>
            <form className='max-w-sm lg:max-w-md mx-auto px-3 ' onSubmit={formikPay.handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Details</label>
                    <input value={formikPay.values.details} onChange={formikPay.handleChange} onBlur={formikPay.handleBlur} name='details' type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 " />
                    {formikPay.touched.details && formikPay.errors.details ? <p className='text-red-700'>{formikPay.errors.details}</p> : ''}
                </div>
                <div className="mb-5">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">City</label>
                    <input value={formikPay.values.city} onChange={formikPay.handleChange} onBlur={formikPay.handleBlur} name='city' type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 " />
                    {formikPay.touched.city && formikPay.errors.city ? <p className='text-red-700'>{formikPay.errors.city}</p> : ''}
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">phone</label>
                    <input value={formikPay.values.phone} onChange={formikPay.handleChange} onBlur={formikPay.handleBlur} name='phone' type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 " />
                    {formikPay.touched.phone && formikPay.errors.phone ? <p className='text-red-700'>{formikPay.errors.phone}</p> : ''}
                </div>
                <button disabled={loading} className={`${loading ? "bg-active/75 cursor-not-allowed" : "bg-active border-active hover:bg-transparent hover:text-active border"} mt-3 w-full px-6 py-2 text-white border-1  rounded-lg duration-150 border-active hover:bg-transparent hover:text-active border flex justify-center items-center `}>
                    {loading ? (<span className='w-6 h-6 bg-transparent block  border-2 border-white border-b-transparent animate-spin rounded-full'> </span>) : (<span>Procced to Pay</span>)}
                </button>
            </form>
        </div>
    )
}
