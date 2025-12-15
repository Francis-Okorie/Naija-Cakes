import React, { useEffect, useRef } from 'react';
import { occasion } from '../assets/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Occasion = () => {
  const navigate = useNavigate();
  const cardRefs = useRef([]);
  const swiperRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((ref) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 85%',
              toggleActions: 'play none none reset',
              once: false,
            },
          }
        );
      }
    });

    swiperRefs.current.forEach((ref) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 85%',
              toggleActions: 'play none none reset',
              once: false,
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className="bg-bgcolor py-22 md:py-18">
      <div className="max-w-screen-xl mx-auto px-5 md:px-8 lg:px-14 xl:px-22">
        <p className='text-[32px] md:text-[37px] font-regular mb-7'>
          Cake for <span className='italic'>Every Occasion...</span>
        </p>

        {/* Desktop Cards */}
        <div className='hidden w-full md:grid grid-cols-3 gap-5 items-stretch'>
          {occasion.map((item, index) => (
            <Link to="/products" key={index}>
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className='w-full rounded-3xl p-4 h-[400px] flex flex-col justify-between transform transition-all duration-500 hover:scale-105'
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl mb-2">
                  <img
                    className='w-full h-full object-cover'
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div>
                  <p className='font-medium text-xl py-2'>{item.title}</p>
                  <p className='font-light text-sm mb-4 line-clamp-3'>{item.text}</p>
                </div>
                <button className='bg-btnyellow px-5 py-1.5 rounded text-sm mt-auto'>
                  {item.btnText}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Swiper */}
      <Swiper
        slidesPerView={1.2}
        spaceBetween={1}
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination]}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="mySwiper md:hidden mt-8 px-5"
      >
        {occasion.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              ref={(el) => (swiperRefs.current[index] = el)}
              className="rounded-xl p-4 mb-9 md:hidden"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-xl mb-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className='font-medium text-xl py-2'>{item.title}</p>
              <p className='font-light text-sm mb-4 line-clamp-3'>{item.text}</p>
              <Link to="/products">
                <button className='bg-btnyellow w-full px-5 py-2.5 rounded text-sm'>
                  {item.btnText}
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Occasion;
