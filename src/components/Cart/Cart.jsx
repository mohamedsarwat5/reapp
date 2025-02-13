import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { useEffect } from 'react'
import useApi from '../../Hooks/useApi'
import img from "../../assets/images/empty.jpg"
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


    async function removeItems(productId) {
        setisLoading(true)

        let response = await removeCartItems(productId)
        console.log(response)
        setcartdetails(response.data)
        setisLoading(false)

    }


    useEffect(() => {
        getItems()
    }, [])

    if (isLoading) {
        return <div className='flex justify-center items-center bg-slate-300 h-screen'>
            <section class="dots-container">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </section>
        </div>
    }
    return (<>





        <div className=" w-11/12 mx-auto mt-28 flex ">




            {cartdetails === null || cartdetails?.data?.products.length === 0 ? (
                <div className=" mx-auto">
                    <img src={img} alt="" />
                </div>
            ) : (
                <div className="flex flex-wrap">
                    {cartdetails?.data.products.map(product => (
                        <div key={product.product.id} className="md:w-3/12 w-full px-3 mb-3">
                            <div className='flex card gap-2 justify-between items-center flex-col h-full min-h-[300px]'>
                                <img src={product.product.imageCover} className="w-full object-cover" alt={product.product.title} />
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
                                    <div className="py-4 font-semibold text-gray-900 w-full">
                                        {product.price * product.count} EGP
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <span onClick={() => removeItems(product.product.id)} className="cursor-pointer font-medium text-white hover:opacity-85 bg-red-600 px-8 py-3 rounded-3xl">
                                        Remove
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    </>

    )
}
