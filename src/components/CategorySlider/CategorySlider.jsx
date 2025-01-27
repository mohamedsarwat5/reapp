import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function CategorySlider() {

    let [categoryList, setcategoryList] = useState(null)

    function getAllCategory() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then((req) => {
            setcategoryList(req.data.data)
        })
    }

    useEffect(() => {
        getAllCategory()
    }, [])


    return (<>

        <div className='my-5'>
            <Slider slidesToShow={6} infinite autoplay speed={500} slidesToScroll={5}>
                {categoryList?.map(el => {
                    return (
                        <div key={el._id}>
                            <img src={el.image} className='h-48 w-full object-cover object-top' alt="" />
                            <h5 className='text-center'>{el.name}</h5>
                        </div>
                    )
                })}
            </Slider>
        </div>








    </>

    )
}
