import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import useApi from '../../Hooks/useApi';
import img from "../../assets/images/freshcart-logo.png"
import { AuthContext } from '../../Context/AuthContextProvider';
export default function Home() {
    const { addToCart, addToWishList } = useContext(CartContext);
    const { data, isLoading } = useApi("products");
    const { token } = useContext(AuthContext)
    console.log("Token is: ", token);
    const [likedProducts, setLikedProducts] = useState({});
    const [loading, setLoading] = useState(null)
    const toggleLike = (productId) => {
        setLikedProducts(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }));
    };

    const addProductToWishList = async (productId) => {
        try {

            if (!token) {
                return toast.error("You should login first");
            }
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
            if (!token) {
                return toast.error("You should login first");
            }
            setLoading(productId)
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
        } finally {
            setLoading(null)
        }
    };

    if (isLoading) {
        return <div className='flex justify-center items-center bg-slate-300 h-screen flex-col'>
            <img src={img} className='md:w-[300px] w-[250px] mx-auto' alt="" />
            <section className="dots-container gap-4 mt-3">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </section>
        </div>
    }

    return (
        <div className="w-11/12 my-5 mx-auto">
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 space-y-3 py-20'>
                {data?.data?.data?.map((product) => (
                    <div key={product._id} className='w-full px-3 overflow-hidden group mt-2'>
                        <div className='relative'>

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
                            disabled={loading === product._id}
                            className={`flex justify-center items-center  ease-in-out    duration-200  text-white space-x-3 py-2 rounded-lg w-full mt-4 ${loading === product._id ? 'bg-active/55 cursor-not-allowed' : 'bg-active hover:bg-active/75'}`}
                        >
                            {loading === product._id ? (<span className='w-6 h-6 bg-transparent  border-2 border-white border-b-transparent animate-spin rounded-full'> </span>) : (<> <i className="fa-solid fa-cart-shopping "></i><span>Add to Cart</span></>)}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
