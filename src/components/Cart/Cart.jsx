import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { useEffect } from 'react'

export default function Cart() {


    let { getCartItems, removeCartItems, updateCartItems } = useContext(CartContext)

    const [cardivetails, setcardivetails] = useState(null)

    async function updateQuantity(productId, count) {
        let response = await updateCartItems(productId, count)
        setcardivetails(response.data)
    }

    async function getItems() {
        let response = await getCartItems()
        setcardivetails(response.data)
    }

    async function removeItems(productId) {
        let response = await removeCartItems(productId)
        console.log(response)
        setcardivetails(response.data)
    }


    useEffect(() => {
        getItems()
    }, [])


    return (<>





        <div className=" w-11/12 mx-auto mt-28 flex ">





            <div className='flex flex-wrap'> 
                {cardivetails?.data.products.map(product => <div key={product.product.id} className="  md:w-2/12 w-full px-3 mb-3 ">

                    <div className='flex card gap-2 justify-between items-center flex-col  h-full min-h-[300px]'>
                        <img src={product.product.imageCover} className="w-full  object-cover" alt={product.product.title} />

                        <h2 className=" font-semibold text-gray-900  w-full text-center gap-2">
                            {product.product.title.split(" ").slice(0, 2).join(" ")}
                        </h2>
                        <div className='flex gap-3'>


                            <div className="flex items-center buttons">
                                <button onClick={() => updateQuantity(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800  dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                    </svg>
                                </button>
                                <div>
                                    <span>{product.count}</span>
                                </div>
                                <button onClick={() => updateQuantity(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800  dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>

                            <div className=" py-4 font-semibold text-gray-900 w-full">
                                {product.price} EGP
                            </div>

                        </div>

                        <div className=" mb-5">
                            <span onClick={() => removeItems(product.product.id)} className="cursor-pointer  font-medium text-white hover:opacity-85 duration-100 bg-red-600 px-8 py-3 rounded-3xl">Remove</span>
                        </div>
                    </div>



                </div>)}

            </div>
        </div>

    </>

    )
}
