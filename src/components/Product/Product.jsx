import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import useApi from '../../Hooks/useApi';
import img from "../../assets/images/freshcart-logo.png"
import { AuthContext } from '../../Context/AuthContextProvider';
export default function Home() {
    const { addToCart, addToWishList, removeProductFromWishListtItems } = useContext(CartContext);
    const { data, isLoading } = useApi("products");
    const { token } = useContext(AuthContext)
    console.log("Token is: ", token);
    const [likedProducts, setLikedProducts] = useState(() => {
        const saved = localStorage.getItem("likedProducts");
        return saved ? JSON.parse(saved) : {};
    });

    const [loading, setLoading] = useState(null)

    const toggleLike = (productId) => {
        setLikedProducts(prev => {
            const updated = { ...prev, [productId]: !prev[productId] };
            localStorage.setItem("likedProducts", JSON.stringify(updated));
            return updated;
        });
    };




    const addProductToWishList = async (productId) => {
        try {

            if (!token) {
                return toast.error("You should login first");
            }
            const response = await addToWishList(productId);
            if (response.data.status === 'success') {
                toast.success("Product added to Wishlist", {
                    position: 'top-center',
                    duration: 2000,
                    style: { color: '#000' }
                });
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    async function removeItemFromWishList(productId) {
        let response = await removeProductFromWishListtItems(productId)
        if (response.data.status === "success") {
            toast.success("Product removed from  wishlist", {
                position: 'top-center',
                duration: 2000,
                style: { color: '#000' }
            });
        }
        getWishList()
    }

    const addProductToCart = async (productId) => {
        try {
            if (!token) {
                return toast.error("You should login first");
            }
            setLoading(productId)
            const response = await addToCart(productId);
            if (response.data.status === "success") {
                toast.success("Product added to cart", {
                    position: 'top-center',
                    duration: 2000,
                    style: { color: '#000' }
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
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="dot"></div>
                ))}
            </section>
        </div>
    }

    return (
        <div className="w-11/12 my-5 mx-auto">
            <div>

            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 py-20'>
                {data?.data?.data?.map((product) => (
                    <div key={product._id} className='w-full rounded-lg  overflow-hidden group mt-2'>
                        <div className='relative'>
                            <button
                                className={`${likedProducts[product._id] && token ? 'border-red-500' : 'border-black'} mt-3 absolute left-0 top-0 w-10 h-10 p-4 flex items-center justify-center bg-white border rounded-full`}
                                onClick={async () => {
                                    if (!token) {
                                        toast.error("You should login first");
                                        return;
                                    }

                                    if (likedProducts[product._id]) {
                                        await removeProductFromWishListtItems(product._id);
                                        toast.success("Product removed from wishlist", {
                                            position: 'top-center',
                                            duration: 2000,
                                            style: { color: '#000' }
                                        });
                                    } else {
                                        await addProductToWishList(product._id);

                                    }

                                    setLikedProducts(prev => {
                                        const updated = { ...prev, [product._id]: !prev[product._id] };
                                        localStorage.setItem("likedProducts", JSON.stringify(updated));
                                        return updated;
                                    });
                                }}
                                disabled={loading === product._id}
                            >
                                <i className={`${likedProducts[product._id] && token ? 'fa-solid text-red-500' : 'fa-regular text-black'} text-2xl fa-heart`}></i>
                            </button>


                            <Link to={`/ProductDetails/${product._id}`}>
                                <div className="item  overflow-hidden cursor-pointer">
                                    <img src={product.imageCover} alt={product.title} className='w-full h-[300px] md:h-[200px] object-cover' />
                                    <div className='flex flex-col px-2'>
                                        <h5 className='font-bold mt-5 text-base lg:text-lg '>{product.title.split(" ").slice(0, 2).join(" ")}</h5>
                                        <p className='mb-2 text-sm'>{product.category.name}</p>
                                    </div>
                                    <div className='flex justify-between items-center px-2'>
                                        <p className='text-green-800 font-bold'>{product.price} EGP</p>
                                        <span>
                                            <i className='fa-solid fa-star text-yellow-400'></i> {product.ratingsAverage}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='flex justify-between items-center  gap-2 '>
                            <button
                                onClick={() => addProductToCart(product._id)}
                                disabled={loading === product._id}
                                className={`flex justify-center items-center  ease-in-out    duration-200  text-white space-x-3 py-2 rounded-lg w-full mt-4 ${loading === product._id ? 'bg-active/55 cursor-not-allowed' : 'bg-active hover:bg-active/75'}`}
                            >
                                {loading === product._id ? (<span className='w-6 h-6 bg-transparent  border-2 border-white border-b-transparent animate-spin rounded-full'> </span>) : (<> <i className="fa-solid fa-cart-shopping "></i><span>Add to Cart</span></>)}
                            </button>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
