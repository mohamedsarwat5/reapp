import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'

export default function ProductDetails() {

    let [product, setProduct] = useState(null)
    let { id } = useParams()
    let [loading, setLoading] = useState(true)

    function getDetails(id) {
        setLoading(true)

        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(req => {
            setProduct(req.data.data)
            setLoading(false)

        })

    }
    useEffect(() => {
        getDetails(id)
    }, [id])

    return (<>


        {loading ? <div className='flex justify-center items-center bg-slate-300 h-screen '>
            <span className="loader"></span>
        </div> : <div className='w-10/12 mx-auto mt-24'>
            <div className='flex justify-center flex-wrap items-center'>
                <div className='md:w-3/12 w-full mb-7'>
                    {/* <img src={product?.imageCover} className='w-full' alt="" /> */}
                    <Slider dots>
                        {product?.images.map((img, i) => {
                            return <>
                                <div key={i}>
                                    <img src={img} className='w-full' alt="" />
                                </div>
                            </>
                        })}
                    </Slider>
                </div>
                <div className='md:w-9/12 w-full '>
                    <h2>  {product?.title}  </h2>
                    <p className='text-gray-400 my-4'> {product?.description}</p>
                    <div className='flex  items-center '>
                        <p className='text-green-800 font-bold me-5'>{product?.price} EGP</p>
                        <span>
                            <i className='fa-solid fa-star text-yellow-400'></i>{product?.ratingsAverage}
                        </span>
                    </div>
                    <button className="flex justify-center items-center hover:bg-green-600 duration-200 bg-active text-white px-6 py-2 rounded-lg w-full mt-4">
                        Add to Cart <i className="fa-solid fa-cart-shopping ml-2"></i></button>
                </div>
            </div>
        </div>}

    </>
    )
}
