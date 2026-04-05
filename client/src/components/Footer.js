import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-stone-900 text-stone-300 py-12 font-sans border-t-4 border-orange-500">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Brand & Description */}
      <div>
        <div className="flex items-center gap-2 font-extrabold text-xl text-white mb-4">
          <span className="text-orange-500 text-2xl">🍽️</span> MealMate
        </div>
        <p className="text-sm leading-relaxed max-w-sm">
          Fresh food delivered to your doorstep. Discover local cuisines, filter by your budget and mood, and avoid the wait with live crowd tracking.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-white font-bold mb-4">Explore</h3>
        <ul className="space-y-2 text-sm">
          <li><Link to="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
          <li><Link to="/about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Contact</Link></li>
          <li><Link to="/cart" className="hover:text-orange-400 transition-colors">Your Cart</Link></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-white font-bold mb-4">Get in Touch</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-orange-500">📍</span> 123 Food Street, Flavour Town, India
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500">📞</span> +91 98765 43210
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500">✉️</span> support@mealmate.com
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Copyright */}
    <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col md:flex-row justify-between items-center gap-4">
      <p>© {new Date().getFullYear()} MealMate. All rights reserved.</p>
      <div className="flex gap-4">
        <span className="hover:text-stone-300 cursor-pointer transition-colors">Privacy Policy</span>
        <span className="hover:text-stone-300 cursor-pointer transition-colors">Terms of Service</span>
      </div>
    </div>
  </footer>
);

export default Footer;
