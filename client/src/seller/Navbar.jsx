import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/Firebase';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin'); // 🔁 Redirect after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
      <Link to="/">
        <img className="w-12 h-12" src={assets.logo} alt="Logo" />
      </Link>
      <div className="flex items-center gap-5 text-gray-500">
        <p>Hi! Admin</p>
        <button onClick={handleLogout} className="border rounded-full text-sm px-4 py-1">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
