import React, { useContext } from 'react'
import { assets } from "../assets/assets";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { CakeContext } from '../context/CakeContext';

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const { getCartCount, handleSearch } = useContext(CakeContext)
    const navigate = useNavigate()



    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-3 sm:relative transition-all">

            <Link to="/">
                <img className='w-12 h-12' src={assets.logo} alt="logo" />
            </Link>

            <div className="hidden sm:flex items-center gap-12">
                <NavLink className="text-xs font-regular text-primary" to="/">Home</NavLink>
                <NavLink className="text-xs font-regular text-primary" to="/about">About</NavLink>
                <NavLink className="text-xs font-regular text-primary" to="/products">All Cakes</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e) => { handleSearch(e), navigate("/products") }} className="py-1.5 w-full bg-transparent outline-none placeholder:text-xs placeholder-gray-500" type="text" placeholder="Search products" />
                    <img className='w-4 h-4' src={assets.search} alt="" />
                </div>

                <div onClick={() => { navigate("/cart") }} className="relative cursor-pointer">
                    <img className='w-6 h-6' src={assets.bag} alt="" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
            </div>

            <div className="flex items-center gap-10 sm:hidden">
                <div onClick={() => { navigate("/cart") }} className="relative cursor-pointer">
                    <img className='w-6 h-6' src={assets.bag} alt="" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                <div>
                    <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="21" height="1.5" rx=".75" fill="#0E0F47" />
                            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#0E0F47" />
                            <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#0E0F47" />
                        </svg>
                    </button>
                </div>
            </div>


            <div className={`${open ? 'flex' : 'hidden'}  z-99 absolute top-[60px] left-0 w-full bg-white shadow-md py-10 flex-col items-center justify-center gap-4 px-5 text-sm md:hidden`}>
                <NavLink to="/" className="block text-[1.2rem]" onClick={()=> {setOpen(false)}}>Home</NavLink>
                <NavLink to="/about" className="block text-[1.2rem]" onClick={()=> {setOpen(false)}}>About</NavLink>
                <NavLink to="/products" className="block text-[1.2rem]" onClick={()=> {setOpen(false)}}>All Cakes</NavLink>
                <Link to="/products">
                    <button
                        className='bg-primary w-full md:w-auto px-6 py-3 text-white rounded font-regular mt-4 md:mt-2 lg:mt-6' onClick={()=> {setOpen(false)}}
                    >
                        Shop for Cakes
                    </button>
                </Link>

            </div>

        </nav>
    )
}

export default Navbar;