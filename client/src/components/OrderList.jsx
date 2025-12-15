import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/Firebase';

const OrderList = () => {
    const [orders, setOrder] = useState([])
    const boxIcon = "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg"
    const getOrderList = async () => {
        try {
            const topOrder = query(collection(db, "orders"))
            const snapshot = await getDocs(topOrder)
            const fetch = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            setOrder(fetch)

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getOrderList()

    }, [])

    useEffect(() => {
        console.log(orders);
    }, [orders]);


    return (
        <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium">Orders List</h2>
            {orders.map((order, index) => (
                <div key={index} className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800">
                    <div className="flex gap-5">
                        <img className="w-12 h-12 object-cover opacity-60" src={boxIcon} alt="boxIcon" />
                        <>
                            {order.products.map((item, index) => (
                                <div key={index} className="flex flex-col justify-center">
                                    <div className="font-medium flex flex-col">
                                        {item.name} <span className={`text-indigo-500 ${item.quantity < 2 && "hidden"}`}>x {item.quantity}</span>
                                    </div>
                                </div>
                            ))}
                        </>
                    </div>

                    <div className="text-sm">
                        <p className='font-medium mb-1'>Name: {order.fullName} </p>
                        <p>Address: {order.address}</p>
                    </div>

                    <p className="font-medium text-base my-auto text-black/70">Total Amount: ${order.totalAmount}</p>

                    <div className="flex flex-col text-sm">
                        <p>Method: PayPal </p>
                        <p>Date: {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</p>
                        <p>Email: {order.email}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderList