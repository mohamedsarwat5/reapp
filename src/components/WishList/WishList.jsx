import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import img from "../../assets/images/freshcart-logo.png"
export default function WishList() {

    const [isLoading, setisLoading] = useState(true)
    const [wishList, setwishList] = useState(null)

    let { displayWishList, addToCart, removeProductFromWishListtItems } = useContext(CartContext)


    async function getWishList(params) {
        setisLoading(true)
        let response = await displayWishList()
        setwishList(response)
        setisLoading(false)

    }

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



    async function removeItemFromWishList(productId) {
        let response = await removeProductFromWishListtItems(productId)
        if (response.data.status === "success") {
            toast.success("Product removed from wishlist", {
                position: 'top-center',
                duration: 2000,
                style: { color: '#000' }
            });
        }
        getWishList()
    }




    useEffect(() => {
        getWishList()
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


        <div className='w-11/12 mx-auto mt-28 flex flex-col md:flex-row flex-wrap min-h-[100dvh]'>
            {wishList?.data?.data?.map(product => {
                let { _id } = product
                return <>
                    <div key={_id} className='md:w-2/12 w-full px-3 mb-3 text-center h-full min-h-[300px]'>
                        <img src={product.imageCover} alt="" />
                        <h1 className='font-bold'>{product.title.split(" ").slice(0, 2).join(" ")}</h1>
                        <h1>{product.price} EGP</h1>
                        <div className='flex flex-col items-center gap-3 mt-2'>
                            <button onClick={() => { addProductToCart(_id) }} className="  hover:bg-green-600 duration-200 bg-active text-white px-6 py-2 rounded-lg w-full mt-4">
                                <i className="fa-solid fa-cart-shopping me-2"></i>Add to Cart</button>
                            <button onClick={() => { removeItemFromWishList(_id) }} className=" bg-red-700 hover:bg-red-800 duration-200 text-white px-6 py-2 rounded-lg w-full mt-2 ">
                                <i className="fa-solid fa-trash text-white me-2"></i> remove</button>
                        </div>

                    </div></>
            })}

        </div>




    </>

    )
}
