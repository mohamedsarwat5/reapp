import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function Home() {
  let { addToCart } = useContext(CartContext)
  let [allProducts, setAllProducts] = useState(null)
  let [pageNumber, setPageNumber] = useState(null)
  let [loading, setLoading] = useState(true)

  async function addProductToCart(productId) {
    let response = await addToCart(productId)

    if (response.data.status === "success") {
      toast.success("Product added to your cart", {
        duration: 2000,
        style: { color: '#0aad0a' }
      })
    }

  }

  function getAllProducts(page = 1) {
    setLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=12&page=${page}`)
      .then(req => {
        setAllProducts(req.data.data)
        let nums = []
        for (let i = 1; i <= req.data.metadata.numberOfPages; i++) {
          nums.push(i)
          setPageNumber(nums)
        }

        setLoading(false)
      })
  }



  useEffect(() => {
    getAllProducts()
  }, [])

  function getPageNumber(e) {
    let page = e.target.getAttribute('page')
    getAllProducts(page)
  }

  return (<>

    {loading ? <div className='flex justify-center items-center bg-slate-300 h-screen'>
      <span className="loader"></span>
    </div> : <div className="w-11/12 my-5 mx-auto">
      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
      <div className='flex flex-wrap  '>
        {allProducts?.map((product) => {
          let { _id } = product
          return <>
            <div key={_id} className='lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 group overflow-hidden '>
              <Link to={'/ProductDetails/' + _id}>


                <div className="item p-3  overflow-hidden cursor-pointer ">
                  <img src={product.imageCover} alt={product.title} className='w-full' />
                  <h5 className='font-bold mt-5 text-lg'>{product.title.split(" ").slice(0, 2).join(" ")}</h5>
                  <p className='mb-2'>{product.category.name}</p>
                  <div className='flex justify-between items-center '>
                    <p className='text-green-800 font-bold'>{product.price} EGP</p>
                    <span>
                      <i className='fa-solid fa-star text-yellow-400'></i>{product.ratingsAverage}
                    </span>
                  </div>

                </div>
              </Link>
              <button onClick={() => { addProductToCart(_id) }} className="flex justify-center items-center translate-y-24 group-hover:translate-y-0 hover:bg-green-600 duration-200 bg-active text-white px-6 py-2 rounded-lg w-full mt-4">
                Add to Cart <i className="fa-solid fa-cart-shopping ml-2"></i></button>
            </div>
          </>
        })}
      </div>

      <nav aria-label="Page navigation example ">
        <ul className="flex items-center justify-center -space-x-px text-sm my-4 cursor-pointer">
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
          </li>
          {pageNumber?.map((el) => {
            return (
              <li onClick={getPageNumber} key={el}>
                <a page={el} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{el}</a>
              </li>
            )
          })}



          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
          </li>
        </ul>
      </nav>


    </div>}







  </>

  )
}
