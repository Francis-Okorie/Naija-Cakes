import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import gsap from 'gsap';

const HeroBanner = () => {
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageLoaded) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "+=0.3"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8 },
        "+=0.3"
      );
  }, [imageLoaded]);

  return (
    <div className='relative'>
        <img
          className='w-full hidden md:block'
          src={assets.lg_home_banner2}
          alt=""
          onLoad={() => setImageLoaded(true)}
        />
        <img
          className='w-full md:hidden'
          src={assets.sm_home_banner}
          alt=""
          onLoad={() => setImageLoaded(true)}
        />

        <div className='absolute inset-0 items-center md:items-start justify-end md:justify-center py-25 px-5 md:px-12 lg:px-14 xl:px-30 md:py-7 lg:py-16'>
          {imageLoaded && (
            <>
              <div
                ref={headingRef}
                className='text-3xl md:text-3xl lg:text-5xl font-bold text-center md:text-left md:max-w-100 lg:max-w-115 leading-tight lg:leading-15 md:mt-5 lg:mt-9'
              >
                Loaded with crunch, chocolate, and pure <span className='italic'>Naija Goodness!</span>
              </div>

              <p
                ref={textRef}
                className='text-[1rem] font-light md:mt-2 lg:mt-4 max-w-105 md:max-w-100 lg:max-w-115'
              >
                Full of love, rich ingredients, and the joy of those no-school, plenty-fun Naija holidays!
              </p>

              <Link to="/products">
                <button
                  ref={buttonRef}
                  className='bg-primary w-full md:w-auto px-6 py-3 text-white rounded font-regular mt-4 md:mt-2 lg:mt-6'
                >
                  Shop for Cakes
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
  );
};

export default HeroBanner;
