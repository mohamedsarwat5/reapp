import React from 'react'
import img from "../../assets/images/error.svg"
export default function Notfound() {
    return (
        <div className='flex justify-center items-center w-full mt-24' >
            <img src={img} className='md:w-1/2' alt="" />
        </div>
    )
}
