import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function ProductDetails() {

    let { addToCart } = useContext(CartContext)

    let [product, setProduct] = useState(null)
    let { id } = useParams()
    let [loading, setLoading] = useState(true)

    async function addProductToCart(productId) {
        let response = await addToCart(productId)
        if (response.data.status === "success") {
            console.log("added")
            toast.success("Product added to your cart", {
                position: 'top-center',
                duration: 2000,
                style: { color: '#0aad0a' }
            })

        } else {
            console.log('error')
        }
        console.log(response)

    }

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
            <section class="dots-container">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </section>
        </div> : <div className='w-10/12 mx-auto mt-24'>
            <div className='flex gap-4 flex-wrap items-center'>
                <div className='md:w-3/12 md:mx-auto w-full mb-7'>
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
                <div className='md:w-8/12 w-full '>
                    <h2>  {product?.title}  </h2>
                    <p className='text-gray-400 my-4'> {product?.description}</p>
                    <div className='flex  items-center '>
                        <p className='text-green-800 font-bold me-5'>{product?.price} EGP</p>
                        <span>
                            <i className='fa-solid fa-star text-yellow-400'></i>{product?.ratingsAverage}
                        </span>
                    </div>
                    <button onClick={() => { addProductToCart(product._id) }} className="flex justify-center items-center hover:bg-green-600 duration-200 bg-active text-white px-6 py-2 rounded-lg w-full mt-4">
                        Add to Cart <i className="fa-solid fa-cart-shopping ml-2"></i></button>
                </div>
            </div>
        </div>}

    </>
    )
}
