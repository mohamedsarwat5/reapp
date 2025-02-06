import React from 'react'
import amazon from "../../assets/images/amazonpay.png"
import paypal from "../../assets/images/paypal.png"
import express from "../../assets/images/express.png"
import mastercard from "../../assets/images/mastercard.png"
import appstore from "../../assets/images/appstore.png"
import playstore from "../../assets/images/play.png"

export default function Footer() {
    return (
        <div className='w-full p-8 md:p-16 bg-bgg mt-10'>
            <h1 className='text-2xl'>Get the FreshCart app</h1>
            <p className='text-gray-700 my-1'>We will send you a link, open it in your phone to download the app</p>

            <div className=' flex flex-col md:flex-row gap-3  mt-5  mb-8'>
                <input
                    type="email" placeholder='Email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5"
                />
                <button className='w-full md:w-2/12 bg-active hover:bg-green-600 duration-100 text-white py-2 px-9 rounded-lg' >Share App Link</button>
            </div>

            <div className='flex items-center  flex-col md:flex-row justify-between'>
                <div className='flex flex-col md:flex-row  gap-2 items-center'>
                    <p>Payment partners</p>
                    <div className='flex gap-4'>
                        <img src={amazon} className='w-16 md:w-20 ' alt="" />
                        <img src={express} className='w-16 md:w-20  ' alt="" />
                        <img src={mastercard} className='w-16 md:w-20  ' alt="" />
                        <img src={paypal} className='w-16 md:w-24  ' alt="" />
                    </div>
                </div>

                <div className='flex  flex-col md:flex-row  gap-2 items-center mt-4'>
                    <p>Get deliveries with FreshCart</p>
                    <div className='flex gap-2'>
                        <img src={appstore} className='w-28' alt="" />
                        <img src={playstore} className='w-32' alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
