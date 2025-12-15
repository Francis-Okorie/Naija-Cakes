import React, { useContext,useState, useEffect, useRef } from 'react'
import { CakeContext } from '../context/CakeContext'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CakeCard = ({ product }) => {
    const { currency, addToCart } = useContext(CakeContext)
    const [isSmallScreen, setIsSmallScreen] = useState("");
    const navigate = useNavigate()
    const cardRef = useRef(null)

    useEffect(() => {
    const el = cardRef.current

    gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1.2, 
            ease: "power3.out", 
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reset",
            },
        }
    )
}, [])

useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 400);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);




    return (
        
        <div
            ref={cardRef}
            className='rounded-[1rem] shadow-[0px_4px_27.3px_0px_rgba(0,0,0,0.08)] bg-white'
        >
            <div
                onClick={() => {
                    navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
                }}
            >
                <img
                    className='rounded-t-[1rem] h-36 w-full object-cover'
                    src={product.image[0]}
                    alt=""
                />
            </div>
            <div className='p-2.5 flex flex-col'>
                <div>
                    <p className='font-light text-sm text-gray-400'>{product.category}</p>
                    <p className='font-medium py-1 text-[.95rem]'>{product.name}</p>
                    
                </div>
                {!isSmallScreen ? null: <p className='font-medium pr-1 xs-title pt-1'>{currency}{product.price}</p>}
                <div className='flex justify-between items-center pt-[.7rem] mb-2'>
                    <button
                        onClick={() => addToCart(product._id)}
                        className='cursor-pointer text-sm text-white px-4 md:px-5 py-1 rounded bg-primary font-regular'
                    >
                        Add to Cart
                    </button>
                    {!isSmallScreen ? <p className='font-medium pr-1 xs-title'>{currency}{product.price}</p>: null}
                </div>
            </div>
        </div>
    )
}

export default CakeCard
