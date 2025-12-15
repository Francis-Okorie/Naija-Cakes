import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { assets, testimonial } from '../assets/assets';

const LayeredCard = () => {
    const [mainCount, setMainCount] = useState(0)


    const nextButton = () => {
        setMainCount(prev => {
            const updated = (prev + 1) % testimonial.length
            console.log(updated)
            return updated
        })
    }

    const prevButton = () => {
        setMainCount(prev => (prev - 1 + testimonial.length) % testimonial.length)
    }

    return (
        <div className='bg-bgcolor'>

            <p className='text-[33px] md:text-[37px] font-regular mb-15 text-center mt-19'>
                Hear What People say about{" "}
                <span className='italic relative inline-block'>
                    Our Cake...
                    <img
                        src={assets.stroke}
                        alt=""
                        className="absolute left-0 bottom-[-.5rem] w-[80%] translate-y-2 pointer-events-none"
                    />
                </span>
            </p>

            <div className='block md:hidden'>
                <div className="relative w-[310px] mx-auto mt-3 mb-7">

                    <div className="absolute top-3 left-3 w-full h-full bg-[#FFF2D8] rotate-2 rounded border border-gray-300 z-0"></div>


                    <div className="relative bg-[#FFF8E1] border border-gray-200 p-4 z-10">

                        <div className="bg-white h-[180px] w-full mb-4 rounded-md">
                            <img src={assets.caked1} alt="" className="w-full h-full object-cover rounded-md" />
                        </div>


                        <div className="absolute top-4 right-[-2rem] bg-[#FDC238] px-3 py-1 rounded-sm flex gap-1 items-center shadow">
                            {Array(5).fill(0).map((_, i) => (
                                <FaStar key={i} className="text-[#0E0F47] text-[1rem]" />
                            ))}
                        </div>

                        {testimonial.length > 0 && (
                            <div className="text-sm text-black leading-tight break-words">
                                <p className='mt-4 text-xs text-[#0E0F47]'>{testimonial[mainCount].comment}</p>
                                <p className='mt-4 text-[1.1rem] font-medium text-[#0E0F47]'>- {testimonial[mainCount].customer}</p>
                            </div>
                        )}



                    </div>


                </div>

                <div className='flex items-center justify-center gap-4 mb-18'>
                    <div className='bg-[#0E0F47] p-1 rounded-full' onClick={() => { prevButton() }}>
                        <img className='rotate-180 w-8 h-8' src={assets.left_arrow} alt="" />
                    </div>

                    <div className='bg-[#0E0F47] p-1 rounded-full' onClick={() => { nextButton() }}>
                        <img className='w-8 h-8' src={assets.left_arrow} alt="" />
                    </div>
                </div>
            </div>

            <div className="hidden md:block">
                <div className=" px-29 py-10 z-10">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {testimonial.map((testimony, index) => (
                            <div key={index} className='bg-[#F9EDD0] px-5 py-5 rounded'>
                                <div className="bg-white h-[180px] w-full mb-4 rounded-md relative">
                                    <img src={assets.caked1} alt="" className="w-full h-full object-cover rounded-md" />
                                    <div className="absolute top-4 right-[-2rem] bg-[#FDC238] px-3 py-1 rounded-sm flex gap-1 items-center shadow">
                                        {Array(5).fill(0).map((_, i) => (
                                            <FaStar key={i} className="text-[#0E0F47] text-[1rem]" />
                                        ))}
                                    </div>
                                </div>
                                <p className='mt-4 text-xs text-[#0E0F47]'>{testimony.comment}</p>
                                <p className='mt-4 text-sm font-medium text-[#0E0F47]'>- {testimony.customer}</p>
                            </div>
                        ))}
                    </div>



                </div>
            </div>

        </div>
    );
};

export default LayeredCard;
