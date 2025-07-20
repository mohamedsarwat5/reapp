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

    let settings = {
        slidesToShow: 6,
        slidesToScroll: 5,
        speed: 500,
        infinite: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 300,
                    infinite: true,
                    autoplay: true,
                }
            }
        ]
    }

    return (<>

        <div className='my-5 overflow-hidden'>
            <Slider {...settings} >
                {categoryList?.map(el => {
                    return (
                        <div key={el._id}>
                            <img src={el.image} className='h-48 w-48 mx-auto rounded-full  object-cover object-top' alt="" />
                            <h5 className='text-center font-bold mt-2'>{el.name}</h5>
                        </div>
                    )
                })}
            </Slider>
        </div>








    </>

    )
}
