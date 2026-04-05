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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-orange-500">
          🍽️ <span>MealMate</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <li><Link to="/"        className="hover:text-orange-500 transition-colors">Home</Link></li>
          <li><Link to="/about"   className="hover:text-orange-500 transition-colors">About</Link></li>
          <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>

          {user ? (
            <>
              <li>
                <Link to="/cart" className="relative flex items-center gap-1 hover:text-orange-500 transition-colors">
                  🛒 Cart
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
              <li className="text-stone-400 text-xs">Hi, {user.name?.split(' ')[0]} 👋</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-stone-100 hover:bg-red-50 hover:text-red-500 text-stone-600 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-semibold transition-colors"
              >
                Login / Sign Up
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile: cart + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          {user && (
            <Link to="/cart" className="relative text-stone-600">
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-stone-600 text-2xl w-8 h-8 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 py-4 space-y-3 text-sm font-medium text-stone-700">
          <Link to="/"        className="block hover:text-orange-500" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about"   className="block hover:text-orange-500" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" className="block hover:text-orange-500" onClick={() => setMenuOpen(false)}>Contact</Link>
          {user ? (
            <>
              <Link to="/cart" className="block hover:text-orange-500" onClick={() => setMenuOpen(false)}>
                🛒 Cart ({totalItems})
              </Link>
              <button onClick={handleLogout} className="text-red-500 font-semibold">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block text-orange-500 font-semibold" onClick={() => setMenuOpen(false)}>
              Login / Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
