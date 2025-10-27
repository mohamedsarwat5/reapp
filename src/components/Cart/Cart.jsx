import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { useEffect } from 'react'
import useApi from '../../Hooks/useApi'
import img1 from "../../assets/images/empty.jpg"
import img from "../../assets/images/freshcart-logo.png"
import { Link } from 'react-router-dom'

export default function Cart() {

    const [isLoading, setisLoading] = useState(true)

    let { getCartItems, removeCartItems, updateCartItems } = useContext(CartContext)

    const [cartdetails, setcartdetails] = useState(null)

    async function updateQuantity(productId, count) {
        let response = await updateCartItems(productId, count)
        setcartdetails(response.data)
    }

    async function getItems() {
        setisLoading(true)
        let response = await getCartItems()
        setcartdetails(response.data)
        setisLoading(false)
    }
    console.log(cartdetails)


    async function removeItems(productId) {
        setisLoading(true)

        let response = await removeCartItems(productId)
        console.log(response)
        setcartdetails(response.data)
        setisLoading(false)

    }

    const totals = cartdetails?.data.products.reduce(
        (acc, item) => {
            acc.totalPrice += item.price * item.count;
            acc.totalQuantity += item.count;
            return acc;
        },
        { totalPrice: 0, totalQuantity: 0 }
    );



    useEffect(() => {
        getItems()
    }, [])

    if (isLoading) {
        return <div className='flex justify-center items-center bg-slate-300 h-screen flex-col'>
            <img src={img} className='md:w-[300px] w-[250px] mx-auto' alt="" />
            <section className="dots-container gap-4 mt-3">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </section>
        </div>
    }
    return (<>





        <div className=" w-11/12 mx-auto  flex ">




            {cartdetails === null || cartdetails?.data?.products.length > 0 ? (
                <div className="grid lg:grid-cols-2 grid-col-1 justify-between mt-24 ">
                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 '>
                        {cartdetails?.data.products.map(product => (
                            <div key={product.product.id} className=" w-full px-3 mb-3">
                                <div className='flex card gap-2 justify-between items-center flex-col h-full min-h-[300px]'>
                                    <img src={product.product.imageCover} className="w-full " alt={product.product.title} />
                                    <h2 className="font-semibold text-gray-900 w-full text-center gap-2">
                                        {product.product.title.split(" ").slice(0, 2).join(" ")}
                                    </h2>
                                    <div className='flex gap-3'>
                                        <div className="flex items-center buttons">
                                            <button onClick={() => updateQuantity(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                </svg>
                                            </button>
                                            <span>{product.count}</span>
                                            <button onClick={() => updateQuantity(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="py-4 font-semibold text-gray-900 w-full whitespace-nowrap text-sm">
                                            {product.price * product.count} EGP
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <span onClick={() => removeItems(product.product.id)} className="cursor-pointer font-medium text-white hover:opacity-85 bg-red-600 px-8 py-3 rounded-xl">
                                            Remove
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>









                    <div className="relative overflow-x-auto  ">
                        <table className="w-full text-sm  rtl:text-right text-gray-500 text-left lg:text-center ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3 rounded-s-lg">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3 rounded-e-lg">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {cartdetails?.data.products.map((item, i) => (
                                    <tr key={i} className="bg-white ">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {item.product.title.split(" ").slice(0, 2).join(' ')}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.count}
                                        </td>
                                        <td className="px-6 py-4">
                                            ${item.price * item.count}
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                            <tfoot>
                                <tr className="font-semibold text-gray-900 ">
                                    <th scope="row" className="px-6 py-3 text-base">Total</th>
                                    <td className="px-6 py-3">{totals?.totalQuantity}</td>
                                    <td className="px-6 py-3 whitespace-nowrap">{totals?.totalPrice} EGP</td>
                                </tr>
                            </tfoot>
                        </table>
                        <Link to={`/shipping/`+cartdetails?.cartId} className='bg-active py-2 px-5 text-white rounded-md mx-auto block w-6/12 lg:w-10/12 text-center capitalize'><i className='fa-brands fa-cc-visa'></i> pay now</Link>
                    </div>


                </div>
            ) : (
                <div className=" w-full h-screen flex justify-center items-center flex-col gap-2">
                    <i class="fa-solid fa-basket-shopping text-active text-9xl mb-2"></i>
                    <h1 className='text-3xl font-bold'>Your Cart is Empty</h1>
                    <p className=''>Sorry, you have no product in your cart</p>
                    <Link className='mt-3 bg-active px-6 py-2 text-white border-2 rounded-lg duration-150 border-active hover:bg-transparent hover:text-active' to={'/'} >Start adding</Link>
                </div>
            )}
        </div>

    </>

    )
}
