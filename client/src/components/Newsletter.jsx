import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col justify-center items-center pt-21 pb-23 px-4 md:px-8 lg:px-14 xl:px-22 bg-bgcolor'>
        <div>
            <p className='text-[32px] md:text-[37px] font-medium text-lg text-center'>Never miss a <span className='italic'>bite!</span> 🍰🍩</p>
            <p className='text-center font-regular text-black mt-2'>Be the first to know about our irresistible offers, freshly baked arrivals, and exclusive treats made just for you.</p>
        </div>

        <div className='bg-white p-1.5 w-full md:w-[60%] mx-auto flex rounded-2xl mt-7'>
            <input className='flex-grow outline-none pl-2' type="text" placeholder='Enter your Email Address' required />
            <button className='bg-primary py-3 px-4 text-white rounded-r-2xl cursor-pointer'>Subscribe</button>
        </div>
    </div>
  )
}

export default Newsletter