import React from 'react'
import { assets, ourStrength } from '../assets/assets'
import MainBreadCrumb from '../components/MainBreadCrumb'
import Abouticons from '../components/Abouticons'

const About = () => {
    return (
        <div className=' pt-[140px] px-4 md:pt-15 lg:px-14 xl:px-22 py-20 bg-bgcolor'>
            <MainBreadCrumb />
            <div className='flex flex-col items-center justify-center mb-19'>
                <div><p className="text-[25px] md:text-[37px] font-regular text-lg mb-2 mt-10">About <span className='italic'>Naija Cakes</span></p></div>

                <div className="flex flex-col items-center justify-center md:flex-row gap-18 mt-5">
                    <div className='w-full md:w-1/2'>
                        <img className='w-full' src={assets.aboutimg} alt="" />
                    </div>
                    <div className='md:w-1/2'>
                        <p>At <span className='italic text-primary'>Naija Cakes</span>, we believe every celebration deserves a slice of something extraordinary. Born from a passion for baking and a love for creating unforgettable moments, our cakes are handcrafted to delight—from the very first glance to the very last bite.
                            Using only the finest ingredients, we specialize in beautifully designed custom cakes, cupcakes, and dessert treats that taste as amazing as they look. Whether it’s a birthday, wedding, baby shower, or just a sweet craving, we’re here to make your day a little more delicious.
                            We’re not just bakers—we’re memory makers. Every cake we create carries a story, and we’d be honored to be a part of yours.
                            Made with love. Baked to perfection. Shared with joy.
                        </p></div>

                </div>
            </div>

            <Abouticons/>
        </div >
    )
}

export default About