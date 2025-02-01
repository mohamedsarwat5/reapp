import React from "react";
import Slider from "react-slick";

import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'




export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 200,
        arrows: false,
        infinite: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                    speed: 200,
                    infinite: true,
                    autoplay: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    speed: 200,
                    infinite: true,
                    autoplay: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 200,
                    infinite: true,
                    autoplay: true,
                }
            }
        ]

    };
    return (

        <div className="flex">
            <div className="w-full md:w-9/12 mx-auto">
                <Slider  {...settings} >
                    <div>
                        <img src={img1} className="w-full h-96  object-cover" alt="" />
                    </div>
                    <div>
                        <img src={img2} className="w-full h-96  object-cover" alt="" />
                    </div>
                    <div>
                        <img src={img3} className="w-full h-96  object-cover" alt="" />
                    </div>

                </Slider>
            </div>
            <div className=" w-0  md:w-3/12">
                <div><img src={img1} className=" md:h-48" alt="" /></div>
                <div><img src={img2} className=" md:h-48" alt="" /></div>
            </div>
        </div>



    );
}