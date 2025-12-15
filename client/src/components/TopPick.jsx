import React, { useState, useEffect, useContext } from 'react'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase/Firebase'

import { assets } from '../assets/assets'
import { CakeContext } from '../context/CakeContext'
import { Link } from 'react-router-dom'
import CakeCard from './CakeCard'
import TestCard from './TestCard'

const TopPick = () => {
  const { currency } = useContext(CakeContext)
  const [topProducts, setTopProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const topQuery = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(7))
        const snapshot = await getDocs(topQuery)
        const fetched = snapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data()
        }))
        setTopProducts(fetched)
      } catch (error) {
        console.error("Error fetching top products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopProducts()
  }, [])

  return (
    <div className='mt-0 mb-0 flex flex-col justify-center bg-white px-5 md:px-8 lg:px-14 xl:px-22 py-16'>
      <p className='text-[33px] md:text-[37px] font-regular mb-15'>
        Meet Our <span className='italic'>Best Seller...</span>
      </p>
      <TestCard />
      
    </div>
  )
}

export default TopPick
