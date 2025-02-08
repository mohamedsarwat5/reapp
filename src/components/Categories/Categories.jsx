import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useApi from '../../Hooks/useApi'

export default function Categories() {

   

    let { data, isLoading } = useApi('Categories')


    if (isLoading) {
        return <div className='flex justify-center items-center bg-slate-300 h-screen'>
            <span className="loader"></span>
        </div>
    }

    return (<>

        <div className="w-11/12 my-5 mx-auto py-10">
            <div className='flex flex-wrap  '>
                {data?.data.data.map((category) => {
                    let { name, image, _id } = category
                    return <>
                        <div key={_id} className='lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 py-11 '>


                            <div className="item p-3 group overflow-hidden  ">
                                <img src={image} alt={name} className='w-full md:h-52 object-cover object-top' />
                                <h5 className='font-bold mt-5 text-lg text-center'>{name}</h5>

                            </div>
                        </div>
                    </>
                })}
            </div>
        </div>

    </>


    )
}
