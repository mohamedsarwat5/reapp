import React from "react";
import Slider from "react-slick";

import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import img4 from '../../assets/images/banner-4.jpeg'
import img5 from '../../assets/images/blog-img-1.jpeg'
import img6 from '../../assets/images/blog-img-2.jpeg'
import img7 from '../../assets/images/grocery-banner.png'
import img8 from '../../assets/images/grocery-banner-2.jpeg'
import img9 from '../../assets/images/slider-2.jpeg'




export default function MainSlider() {

    const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

    var settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                    speed: 300,
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


        <div className="md:flex  w-full gap-0 mt-24 rounded-xl ">

            <div className="w-full md:w-9/12 mx-auto ">
                <Slider   {...settings} >
                    {images.map((image, index) => (
                        <div key={index} className="lg:rounded-none rounded-xl overflow-hidden">
                            <img src={image} className="w-full h-[200px] lg:h-96 object-cover object-right" />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className=" w-full hidden lg:flex md:flex-col flex-row gap-0 md:w-3/12 rounded-xl lg:rounded-none overflow-hidden">
                <div><img src={img3} className=" md:h-48 w-full object-cover" alt="" /></div>
                <div><img src={img2} className=" md:h-48 w-full object-cover" alt="" /></div>
            </div>

        </div>



    );
}