import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './pages/About'
import Products from './pages/Products'
import { Toaster } from 'react-hot-toast'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Seller from './pages/Seller'
import Order from './seller/Order'
import Admin from './pages/Admin'


const App = () => {
  const location = useLocation()
  const sellerLocation = location.pathname.includes("seller")
  return (
    <div>
      {sellerLocation? null : <Navbar />}
      <Toaster/>
      <div className=''>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/fine" element={<ProductCategory />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/seller' element={<Seller/>} />
          <Route path='/seller-order' element={<Order/>} />
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
      </div>
      {sellerLocation? null : <Footer/>}
      
    </div>
  )
}

export default App