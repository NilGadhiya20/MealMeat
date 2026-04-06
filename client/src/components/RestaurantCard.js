import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RestaurantCard = ({ restaurant }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="h-full"
  >
    <Link to={`/restaurant/${restaurant._id}`} className="block h-full glass-card rounded-3xl overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        {restaurant.image ? (
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-400 font-bold">
            No Image Available
          </div>
        )}
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm text-sm font-bold text-stone-800 flex items-center gap-1">
          <span className="text-orange-500">★</span> {restaurant.rating}
        </div>
      </div>

      {/* Info Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-stone-800 mb-1 group-hover:text-orange-600 transition-colors">
          {restaurant.name}
        </h3>
        <p className="text-stone-500 text-sm mb-4 font-medium">{restaurant.cuisine}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Time</span>
            <span className="text-sm font-bold text-stone-700">{restaurant.deliveryTime}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Local Hotspot</span>
            <span className="text-sm font-bold text-orange-500">Live Popularity</span>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default RestaurantCard;
