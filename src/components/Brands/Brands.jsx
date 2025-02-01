import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Brands() {



  let [allBrands, setallBrands] = useState(null)
  let [loading, setLoading] = useState(true)


  function getallBrands() {
    setLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(req => {
        setallBrands(req.data.data)
        setLoading(false)

      })
  }

  useEffect(() => {
    getallBrands()
  }, [])



  return (<>

    {loading ? <div className='flex justify-center items-center bg-slate-300 h-screen'>
      <span className="loader"></span>
    </div> : <div className="w-11/12 my-5 mx-auto">
      <div className='flex flex-wrap  '>
        {allBrands?.map((brand) => {
          let { name, image, _id } = brand
          return <>
            <div key={_id} className='lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 py-11'>


                <div className="item p-3 group overflow-hidden  ">
                  <img src={image} alt={name} className='w-full' />
                  <h5 className='font-bold mt-5 text-lg text-center'>{name}</h5>

                </div>
            </div>
          </>
        })}
      </div>
    </div>}




  </>

  )
}
