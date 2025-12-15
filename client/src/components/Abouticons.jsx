import React from 'react'
import { ourStrength } from '../assets/assets'

const Abouticons = () => {
    return (
        <div className='px-5 md:px-12 lg:px-14 xl:px-30 bg-bgcolor grid md:grid-cols-3 pt-19 pb-10 gap-5'>
            {ourStrength.map((item, index) => (
                <div
                    key={index}

                    className='flex items-center flex-col gap-3'
                >
                    <img className='w-12 h-12 bg-white p-3 rounded' src={item.image} alt='' />
                    <p className='font-medium'>{item.title}</p>
                    <p className='font-light text-sm text-center'>{item.text}</p>
                </div>
            ))}
        </div>
    )
}

export default Abouticons