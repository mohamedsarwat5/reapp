import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useApi from '../../Hooks/useApi'

export default function Brands() {
  // function getallBrands() {
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  // }

  // let { data, isLoading } = useQuery({
  //   queryKey: ['brands'],
  //   queryFn: getallBrands
  // })

  let { data, isLoading } = useApi('brands')

  console.log(data)

  if (isLoading) {
    return <div className='flex justify-center items-center bg-slate-300 h-screen'>
      <section className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section>
    </div>
  }

  return (<>

    <div className="w-11/12 my-5 mx-auto">
      <div className='flex flex-wrap  '>
        {data?.data.data.map((brand) => {
          let { name, image, _id } = brand
          return <>
            <div key={_id} className='lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 py-11 mt-4'>
              <div className="item p-3 group overflow-hidden rounded-full shadow-xl ">
                <img src={image} alt={name} className='w-full ' />
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
