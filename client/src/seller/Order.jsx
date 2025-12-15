import React from 'react'
import OrderList from '../components/OrderList'
import SellerNavigation from '../components/SellerNavigation'
import Navbar from './Navbar'

const Order = () => {
  return (
    <div>
        <div><Navbar/></div>
        <div className="flex">
            <SellerNavigation/>
            <OrderList/>
        </div>
    </div>
  )
}

export default Order