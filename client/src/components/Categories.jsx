import React from 'react'
import { assets, categories } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const navigate = useNavigate()

    return (
        <div className='mt-17 mb-10 flex flex-col items-center justify-center'>
            <p className='text-[37px] md:text-[37px] font-regular'>Categories</p>

            <div className='grid grid-cols-2 md:grid-cols-3 mt-6 gap-7 md:gap-17 place-items-center'>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className=' cursor-pointer py-5 px-5 gap-7 rounded-lg flex flex-col justify-center items-center'
                        style={{ backgroundColor: category.bgColor }}
                        onClick={() => {
                            navigate(`/products/${category.path.toLowerCase()}`);
                            scrollTo(0, 0);
                        }}
                    >
                        <img src={category.image} alt="" className='group-hover:scale-90 transition w-24 h-24 object-contain' />
                        <p className='text-sm font-medium'>{category.text}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Categories