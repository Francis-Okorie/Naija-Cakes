import React, { useContext, useEffect, useState, useRef } from 'react';
import { assets } from '../assets/assets';
import { CakeContext } from '../context/CakeContext';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TestCard = ({ product }) => {
    const { currency, addToCart } = useContext(CakeContext);
    const [topProducts, setTopProducts] = useState([]);
    const navigate = useNavigate();
    const cardRefs = useRef([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const topCake = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(7));
                const snapShot = await getDocs(topCake);
                const fetch = snapShot.docs.map(doc => ({
                    _id: doc.id,
                    ...doc.data()
                }));
                setTopProducts(fetch);
            } catch (error) {
                console.error("Error fetching top products:", error);
            }
        };

        fetchProducts();
    }, []);

    
    useEffect(() => {
        if (cardRefs.current.length > 0) {
            cardRefs.current.forEach((card, index) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

            // Refresh ScrollTrigger to ensure layout is recognized
            ScrollTrigger.refresh();
        }
    }, [topProducts]);

    return (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topProducts.map((cake, index) => (
                <div
                    className="relative mb-10 opacity-0"
                    key={index}
                    ref={el => cardRefs.current[index] = el}
                >
                    {/* Kite Label */}
                    <div className="absolute -top-6 md:-top-4 left-1/2 -translate-x-1/2 w-[92%] h-auto z-10">
                        <img src={assets.kite} alt="Kite" className="w-full h-auto" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-[#0E0F47] text-[1.1rem] md:text-[.9rem] font-medium uppercase">
                                {cake.name}
                            </p>
                        </div>
                    </div>

               
                    <div className="rounded-b-4xl z-0 relative">
                        <div className="w-full rounded-b-4xl overflow-hidden border border-gray-200">
                            <div className="h-[220px] md:h-[180px] bg-gray-300">
                                <img
                                    src={cake.image[0]}
                                    alt={cake.name}
                                    className="w-full h-full object-cover"
                                    onClick={() => navigate(`/products/${cake._id}`)}
                                />
                            </div>

                            <div className="flex justify-between items-center gap-4 bg-[#FFF8E1] px-4 pt-2 pb-3">
                                <p className="text-[1.1rem] md:text-[.8rem] text-gray-700">
                                    {cake.small ? `${cake.small}..` : "A moist, golden pound cake baked fresh for every occasion."}
                                </p>
                                <div className="text-[1.1rem] md:text-[1rem] font-bold text-[#0E0F47] whitespace-nowrap">
                                    {currency}{cake.price}
                                </div>
                            </div>

                            <div className="bg-[#FFF8E1] px-4 py-4 border-t border-[#0E0F47]">
                                <button
                                    className="w-full bg-white py-3 rounded-full border border-[#0E0F47] text-black font-regular text-[1rem] md:text-[.8rem] transition-all"
                                    style={{ boxShadow: '4px 4px 0 0 #0E0F47' }}
                                    onClick={() => addToCart(cake._id)}
                                >
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TestCard;
