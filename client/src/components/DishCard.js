import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const DishCard = ({ dish }) => {
  const { addToCart, cartItems, removeFromCart } = useCart();
  const cartItem = cartItems.find((i) => i._id === dish._id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-3xl overflow-hidden flex flex-col h-full group"
    >
      {/* Image Section */}
      <div className="relative h-44 overflow-hidden">
        {dish.image ? (
          <img 
            src={dish.image} 
            alt={dish.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-400 text-xs font-bold uppercase tracking-widest">
            No Image
          </div>
        )}
        {/* Veg/Non-Veg Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg border border-stone-100 shadow-sm">
          <div className={`w-3 h-3 rounded-full ${dish.isVeg ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'}`} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-stone-800 leading-tight group-hover:text-orange-600 transition-colors">
            {dish.name}
          </h3>
          <span className="font-bold text-stone-900 ml-2">₹{dish.price}</span>
        </div>
        
        {dish.description && (
          <p className="text-xs text-stone-500 line-clamp-2 mb-4 leading-relaxed">
            {dish.description}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-stone-50 flex items-center justify-between">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">
            {dish.category || 'Main Course'}
          </span>

          {cartItem ? (
            <div className="flex items-center gap-3 bg-orange-50 p-1 rounded-xl border border-orange-100">
              <button 
                onClick={() => removeFromCart(dish._id)}
                className="w-8 h-8 flex items-center justify-center bg-white text-orange-500 rounded-lg shadow-sm hover:bg-orange-500 hover:text-white transition-all font-bold"
              >
                −
              </button>
              <span className="font-bold text-orange-600 min-w-[20px] text-center text-sm">
                {cartItem.quantity}
              </span>
              <button 
                onClick={() => addToCart(dish, dish.restaurant?._id || dish.restaurant)}
                className="w-8 h-8 flex items-center justify-center bg-white text-orange-500 rounded-lg shadow-sm hover:bg-orange-500 hover:text-white transition-all font-bold"
              >
                +
              </button>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(dish, dish.restaurant?._id || dish.restaurant)}
              className="px-5 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-orange-500 transition-all shadow-md hover:shadow-orange-200"
            >
              Add to Plate
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DishCard;

