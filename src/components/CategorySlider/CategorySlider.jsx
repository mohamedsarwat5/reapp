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
        slidesToScroll: 1,
        speed: 200,
        pauseOnHover: false,

        infinite: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    speed: 200,
                    pauseOnHover: false,


                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 200,
                    pauseOnHover: false,


                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 200,
                    pauseOnHover: false,

                    infinite: true,
                    autoplay: true,
                }
            }
        ]
    }

    return (<>

        <div className='mt-1 overflow-hidden mb-4 slick-container h-[200px] md:h-[220px]'>
            <Slider {...settings} >
                {categoryList?.map(el => {
                    return (
                        <div key={el._id} className='p-1   '>
                            <img src={el.image} className='h-40 w-full mx-auto rounded-lg  object-cover object-top' alt="" />
                            <h5 className='text-center font-bold mt-2'>{el.name}</h5>
                        </div>
                    )
                })}
            </Slider>
        </div>








    </>

    )
}
