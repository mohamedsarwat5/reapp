import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export default function Home() {



    function getAllProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }

    let { data, isLoading } = useQuery({
        queryKey: ['allProducts'],
        queryFn: getAllProducts,
    })

    console.log()
    if (isLoading) {
        return <div className='h-screen w-screen flex justify-center items-center bg-slate-300'>
            <span className="loader"></span>
        </div>
    }



    return (<>

        <div className="w-11/12 my-5 mx-auto">
            <div className='flex flex-wrap py-20 '>
                {data?.data?.data.map((product) => {
                    let { _id } = product
                    return <>
                        <div key={_id} className='lg:w-2/12 md:w-4/12 sm:w-6/12 w-full px-3 '>
                            <Link to={'/ProductDetails/' + _id}>


                                <div className="item p-3 group overflow-hidden cursor-pointer ">
                                    <img src={product.imageCover} alt={product.title} className='w-full' />
                                    <h5 className='font-bold mt-5 text-lg'>{product.title.split(" ").slice(0, 2).join(" ")}</h5>
                                    <p className='mb-2'>{product.category.name}</p>
                                    <div className='flex justify-between items-center '>
                                        <p className='text-green-800 font-bold'>{product.price} EGP</p>
                                        <span>
                                            <i className='fa-solid fa-star text-yellow-400'></i>{product.ratingsAverage}
                                        </span>
                                    </div>
                                    <button className="flex justify-center items-center translate-y-24 group-hover:translate-y-0 hover:bg-green-600 duration-200 bg-active text-white px-6 py-2 rounded-lg w-full mt-4">
                                        Add to Cart <i className="fa-solid fa-cart-shopping ml-2"></i></button>
                                </div>
                            </Link>
                        </div>
                    </>
                })}
            </div>




        </div>







    </>

    )
}
