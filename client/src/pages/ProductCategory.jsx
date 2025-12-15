import React, { useContext, useEffect } from 'react'
import { CakeContext } from '../context/CakeContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import CakeCard from '../components/CakeCard'

import CategoryBreadCrumb from '../components/CategoryBreadCrumb'



const ProductCategory = () => {
    const { category } = useParams()
    const { products } = useContext(CakeContext);


    const filteredCake = products.filter((cake) => cake.category.toLowerCase() === category?.toLowerCase())
    useEffect(() => {
        console.log("Category param:", category);
  console.log("All products:", products);
  console.log("Filtered cakes:", filteredCake);
    }, [category, filteredCake])

    return (
        <div className='mt-13 mb-10 '>
            <CategoryBreadCrumb />
            <div className='flex flex-col items-center justify-center'>
                <p className='text-[37px] md:text-[37px] font-regular'>{category}</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-8 mt-10 mb-20'>
                    {filteredCake.map((cake, index) => (
                        <CakeCard key={index} product={cake} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductCategory