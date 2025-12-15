import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom';

import Navbar from '../seller/Navbar';
import SellerNavigation from '../components/SellerNavigation';
import AddProducts from '../components/AddProducts';

const Seller = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        navigate('/admin');
      } else {
        setLoading(false); 
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);

  if (loading) return null; 

  return (
    <div>
      <Navbar />
      <div className="flex">
        <SellerNavigation />
        <AddProducts />
      </div>
    </div>
  );
};

export default Seller;
