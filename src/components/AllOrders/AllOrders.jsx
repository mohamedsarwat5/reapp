import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContextProvider'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import img from "../../assets/images/freshcart-logo.png"

export default function AllOrders() {

    const { token } = useContext(AuthContext)
    const [orderDetails, setOrderDetails] = useState([])
    const [loading, setisLoading] = useState(false)

    const getUserId = () => {
        let decoded = jwtDecode(token)
        getUserOrders(decoded.id)
    }
    useEffect(() => {
        token && getUserId()
    }, [token])

    const getUserOrders = (userId) => {
        setisLoading(true)
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
            .then((request) => {
                setOrderDetails(request.data)
            })
            .catch()
            .finally(() => setisLoading(false))
    }

    return (<>
        {
            loading ? (<div className='flex justify-center items-center bg-slate-300 h-screen flex-col'>
                <img src={img} className='md:w-[300px] w-[250px] mx-auto' alt="" />
                <section className="dots-container gap-4 mt-3">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </section>
            </div>) : (<div className='min-h-screen  '>
                <div className="relative overflow-x-auto max-w-2xl mx-auto mt-24 ">
                    <table className="w-full text-sm text-center rtl:text-right text-gray-800 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    ORDER ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    status
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Payment Method
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {orderDetails?.map((item, i) => (
                                <tr key={i} className="bg-white border-b  border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {item.id}
                                    </th>
                                    <td className={`${item.isPaid ?'text-green-500':'text-red-500'} px-6 py-4`}>
                                        {item.isPaid ? 'Paid' : "Not Paid"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.paymentMethodType}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.totalOrderPrice} EGP
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>)
        }


    </>)
}
