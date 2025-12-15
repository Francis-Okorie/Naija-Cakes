import React from 'react'
import { assets, flavour } from '../assets/assets'

const Signature = () => {
    return (
        <div className='bg-bgcolor px-5 md:px-8 lg:px-14 xl:px-22 py-16'>
            <div>
                <p className='text-[28px] md:text-[37px] font-regular mb-7'>
                    Our Signature <span className='italic'>Flavour...</span>
                </p>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
                {flavour.map((item, index) => (
                    <div key={index} className='bg-[#F9EDD0] rounded-3xl px-2' >
                        <img className='' src={item.image} alt="" />
                        <p className='text-primary font-medium text-[1.2rem] text-center mb-3 '>{item.text}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>

            <div className="flex gap-1 items-center justify-center mt-12">
                <p className='text-primary'>SHOP ALL CAKES</p>
                <div className='bg-primary flex items-center p-1 rounded-full '>
                    <img className='w-4 h-4' src={assets.left_arrow} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Signature