import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import useApi from '../../Hooks/useApi'
import img from "../../assets/images/freshcart-logo.png"
export default function Home() {
  let { addToCart, addToWishList } = useContext(CartContext)
  const [likedProducts, setLikedProducts] = useState({});
  let [pageNumbers, setPageNumbers] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  let { data, isLoading } = useApi(`products?limit=12&page=${currentPage}`);

  function handlePageChange(e) {
    let page = e.target.getAttribute('page')
    setCurrentPage(page);;
  }


  useEffect(() => {
    if (data?.data?.metadata?.numberOfPages) {
      let nums = Array.from({ length: data.data.metadata.numberOfPages }, (_, i) => i + 1);
      setPageNumbers(nums);
    }
  }, [data]);

  const toggleLike = (productId) => {
    setLikedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
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

  return (<>
    <div className="w-11/12 my-5 mx-auto">
      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
      <div className='flex flex-wrap  '>
        {data?.data?.data?.map((product) => {
          let { _id } = product
          return <>
            <div key={_id} className='lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 group overflow-hidden '>
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
              <button onClick={() => { addProductToCart(_id) }} className="flex justify-center items-center translate-y-24 group-hover:translate-y-0 hover:bg-green-600 duration-200 bg-active text-white px-6 py-2 rounded-lg w-full mt-4">
                Add to Cart <i className="fa-solid fa-cart-shopping ml-2"></i></button>
            </div>
          </>
        })}
      </div>

      <nav aria-label="Page navigation example">
        <ul className="flex items-center justify-center -space-x-px text-sm my-4 cursor-pointer">
          <li>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((el ,i) => (
            <li key={i}>
              <button
                page={el}
                onClick={handlePageChange}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === el ? 'bg-gray-300' : ''
                  }`}
              >
                {el}
              </button>
            </li>
          ))}
          <li>
            <button
              disabled={currentPage === pageNumbers.length}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageNumbers.length))}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </>
  )
}
