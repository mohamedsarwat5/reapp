import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import useApi from '../../Hooks/useApi';

export default function Home() {
    const { addToCart, addToWishList } = useContext(CartContext);
    const { data, isLoading } = useApi("products");

    const [likedProducts, setLikedProducts] = useState({});

    const toggleLike = (productId) => {
        setLikedProducts(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }));
    };

    const addProductToWishList = async (productId) => {
        try {
            const response = await addToWishList(productId);
            if (response.data.status === 'success') {
                toast.success("Product added to your Wishlist", {
                    position: 'top-center',
                    duration: 2000,
                    style: { color: '#0aad0a' }
                });
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    const addProductToCart = async (productId) => {
        try {
            const response = await addToCart(productId);
            if (response.data.status === "success") {
                toast.success("Product added to your cart", {
                    position: 'top-center',
                    duration: 2000,
                    style: { color: '#0aad0a' }
                });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    if (isLoading) {
        return (
            <div className='h-screen w-screen flex justify-center items-center bg-slate-300'>
                <section class="dots-container">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </section>
            </div>
        );
    }

    return (
        <div className="w-11/12 my-5 mx-auto">
            <div className='flex flex-wrap py-20'>
                {data?.data?.data?.map((product) => (
                    <div key={product._id} className='lg:w-2/12 md:w-4/12 sm:w-6/12 w-full px-3 overflow-hidden group mt-2'>
                        <div className='relative'>
                            <div className='absolute top-0 left-0 p-5 w-7 h-7 flex justify-center items-center bg-white shadow-lg rounded-full'>
                                <i
                                    onClick={() => {
                                        addProductToWishList(product._id);
                                        toggleLike(product._id);
                                    }}
                                    className={`fa-${likedProducts[product._id] ? 'solid' : 'regular'} fa-heart text-2xl text-active`}
                                ></i>
                            </div>
                            <Link to={`/ProductDetails/${product._id}`}>
                                <div className="item p-3 overflow-hidden cursor-pointer">
                                    <img src={product.imageCover} alt={product.title} className='w-full md:h-[200px] object-cover' />
                                    <div className='flex flex-col'>
                                        <h5 className='font-bold mt-5 text-lg'>{product.title.split(" ").slice(0, 2).join(" ")}</h5>
                                        <p className='mb-2'>{product.category.name}</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-green-800 font-bold'>{product.price} EGP</p>
                                        <span>
                                            <i className='fa-solid fa-star text-yellow-400'></i> {product.ratingsAverage}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <button
                            onClick={() => addProductToCart(product._id)}
                            className="flex justify-center items-center translate-y-24 group-hover:translate-y-0 ease-in hover:bg-green-600 duration-200 bg-active text-white px-6 py-2 rounded-lg w-full mt-4"
                        >
                            Add to Cart <i className="fa-solid fa-cart-shopping ml-2"></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
