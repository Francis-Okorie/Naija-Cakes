import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
    const linkSections = [
        {
            title: "Quick Links",
            links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"]
        },
        {
            title: "Need Help?",
            links: ["Delivery Information", "Return & Refund Policy", "Payment Methods", "Track your Order", "Contact Us"]
        },
        {
            title: "Follow Us",
            links: ["Instagram", "Twitter", "Facebook", "YouTube"]
        }
    ];

    return (
        <div className="px-4 md:px-16 lg:px-28 xl:px-32 bg-bgcolor pt-19 mt-0">
            <div className="bg-primary flex flex-col md:flex-row items-start justify-between gap-10 py-13 px-5 md:px-9 rounded-3xl border-b border-gray-500/30 text-light">
                <div>
                    <img src={assets.logo} className="w-15 h-15" alt="" />
                    <p className="max-w-[410px] mt-6 text-white">Bringing sweetness to every moment — from freshly baked cakes to delightful pastries, made with love and the finest ingredients.</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5 text-white">
                    {linkSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-white md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:underline transition">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-[.9rem] font-light md:text-sm ">
                Copyright 2025 © Naija Cakes.
            </p>
        </div>
    );
};

export default Footer;