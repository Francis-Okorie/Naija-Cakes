import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/Firebase'
import { CakeContext } from '../context/CakeContext'
import MainBreadCrumb from '../components/MainBreadCrumb'
import CakeCard from '../components/CakeCard'
import TestCard from '../components/TestCard'

const Products = () => {
  const { currency,handleSearch,searchQuery } = useContext(CakeContext)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true) 


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"))
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data()
        }))
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filterProducts = products.filter(product=>product.name?.toLowerCase().includes((searchQuery || "").toLowerCase()))

  return (
    <div className='my-10 bg-white pt-[80px] md:pt-[40px] px-5 md:px-8 lg:px-14 xl:px-22 py-3'>
      <MainBreadCrumb />
      <div className='flex items-center justify-center'>
        <p className='text-[37px] md:text-[37px] font-regular mt-10 mb-17 md:mb-20'>
          Every Cake <span className='italic'>You Crave</span>
        </p>
      </div>

      <div className="">
        
        <TestCard/>
      </div>
    </div>
  )
}

export default Products
