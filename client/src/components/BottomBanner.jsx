import React, { useEffect, useRef } from 'react';
import { assets, ourStrength } from '../assets/assets';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BottomBanner = () => {
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const strengthRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      imgRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imgRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    strengthRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.75,
          scrollTrigger: {
            trigger: ref,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);

  return (
    <div className='px-5 md:px-8 lg:px-25 xl:gap-17 xl:px-35 py-16 bg-bgcolor'>
      <div className='flex items-center flex-col md:flex-row gap-12'>
        <div className='w-full md:w-1/2' ref={imgRef}>
          <img className='w-full' src={assets.aboutimg} alt='' />
        </div>
        <div className='w-full md:w-1/2' ref={textRef}>
          <p className='text-[32px] md:text-[37px] font-regular text-lg mb-2'>
            About <span className='italic'>Naija Cakes</span>
          </p>
          <p className='mb-4 uppercase font-medium text-gray-700'>
            Our expert bakers create delicious treats, delivered fresh to your door.
          </p>
          <p className='font-regular'>
            At Naija Cake, we believe every celebration deserves a slice of something extraordinary.
            Born from a passion for baking and a love for creating unforgettable moments, our cakes
            are handcrafted to delight—from the very first glance to the very last bite. Using only
            the finest ingredients, we specialize in beautifully designed custom cakes, cupcakes,
            and dessert treats that taste as amazing as they look.
          </p>
          <Link to='/about'>
            <div className='flex gap-1 mt-8'>
              <p className='text-primary'>Read More </p>
              <div className='bg-primary flex items-center p-1 rounded-full'>
                <img className='w-4 h-4' src={assets.left_arrow} alt='' />
              </div>
            </div>
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default BottomBanner;
