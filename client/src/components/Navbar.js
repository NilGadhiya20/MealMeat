import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 px-4 pt-4">
      <div className="max-w-6xl mx-auto glass-card rounded-2xl h-16 flex items-center justify-between px-6">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-orange-500 hover:scale-105 transition-transform">
          <span>MealMate</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600">
          <li><Link to="/"        className="hover:text-orange-500 transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link></li>
          <li><Link to="/about"   className="hover:text-orange-500 transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link></li>
          <li><Link to="/contact" className="hover:text-orange-500 transition-colors relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link></li>

          {user ? (
            <>
              <li>
                <Link to="/cart" className="relative flex items-center gap-2 hover:text-orange-500 transition-colors">
                  Cart
                  {totalItems > 0 && (
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
              <li className="text-stone-400 font-normal">Hi, {user.name?.split(' ')[0]}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-stone-900 text-white hover:bg-stone-800 px-5 py-2 rounded-xl text-sm font-bold transition-all hover:shadow-lg active:scale-95"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-orange-200 hover:shadow-lg active:scale-95"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile: cart + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          {user && (
            <Link to="/cart" className="relative text-stone-600 font-bold">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-stone-800 text-2xl"
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 glass-card rounded-2xl overflow-hidden animate-fade-in divide-y divide-white/20">
          <Link to="/"        className="block px-6 py-4 hover:bg-orange-50/50 hover:text-orange-600 transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about"   className="block px-6 py-4 hover:bg-orange-50/50 hover:text-orange-600 transition-colors" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" className="block px-6 py-4 hover:bg-orange-50/50 hover:text-orange-600 transition-colors" onClick={() => setMenuOpen(false)}>Contact</Link>
          {user ? (
            <>
              <Link to="/cart" className="block px-6 py-4 hover:bg-orange-50/50 hover:text-orange-600 transition-colors" onClick={() => setMenuOpen(false)}>
                Cart ({totalItems})
              </Link>
              <button 
                onClick={handleLogout} 
                className="w-full text-left px-6 py-4 text-red-500 font-bold hover:bg-red-50/50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block px-6 py-4 text-orange-600 font-bold hover:bg-orange-50/50 transition-colors" onClick={() => setMenuOpen(false)}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
