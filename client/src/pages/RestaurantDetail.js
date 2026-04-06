import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRestaurant, fetchDishes } from '../api';
import DishCard from '../components/DishCard';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    Promise.all([fetchRestaurant(id), fetchDishes(id)])
      .then(([{ data: rest }, { data: dishList }]) => {
        setRestaurant(rest);
        setDishes(dishList);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const categories = useMemo(() => {
    return ['All', ...new Set(dishes.map((d) => d.category))].filter(Boolean);
  }, [dishes]);

  const filtered = useMemo(() => {
    return activeCategory === 'All' ? dishes : dishes.filter((d) => d.category === activeCategory);
  }, [dishes, activeCategory]);

  if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">Opening Kitchen...</p>
      </div>
    </div>
  );

  if (!restaurant) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-black text-stone-800 mb-4">Kitchen Not Found</h2>
        <Link to="/" className="text-orange-500 font-bold hover:underline">← Back to Explore</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      
      {/* ── IMMERSIVE HERO ──────────────────────────────────────── */}
      <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
        {restaurant.image ? (
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover scale-105 blur-[2px] brightness-75 transition-all duration-1000"
          />
        ) : (
          <div className="w-full h-full bg-stone-900" />
        )}
        
        {/* Floating Info Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-transparent to-transparent" />
        
        <div className="absolute inset-x-4 bottom-0 max-w-6xl mx-auto translate-y-1/2">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-card rounded-[3rem] p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center lg:items-end gap-8"
          >
            {/* Restaurant Logo/Thumbnail */}
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl -mt-16 lg:-mt-24 bg-white shrink-0">
              <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
            </div>

            <div className="text-center lg:text-left flex-1 min-w-0">
              <div className="inline-block bg-orange-100 text-orange-600 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                {restaurant.cuisine}
              </div>
              <h1 className="text-3xl lg:text-5xl font-black text-stone-800 mb-2 truncate">
                {restaurant.name}
              </h1>
              <p className="text-stone-500 font-medium line-clamp-1 mb-4">
                {restaurant.address}
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 border-t border-stone-100">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Rating</span>
                  <span className="text-lg font-black text-stone-800">★ {restaurant.rating}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Wait Time</span>
                  <span className="text-lg font-black text-stone-800">{restaurant.deliveryTime}</span>
                </div>
                {restaurant.minOrder > 0 && (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Min. Order</span>
                    <span className="text-lg font-black text-stone-800">₹{restaurant.minOrder}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MENU NAVIGATION (STICKY) ───────────────────────────── */}
      <section className="sticky top-24 z-40 mt-32 px-4 pointer-events-none">
        <div className="max-w-6xl mx-auto flex justify-center pointer-events-auto">
          <div className="glass-card rounded-2xl p-2 flex gap-1 overflow-x-auto no-scrollbar shadow-xl border-white/50 backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-stone-900 text-white shadow-lg' 
                    : 'text-stone-500 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENU GRID ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 mt-16 mt-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-stone-800">{activeCategory} Menu</h2>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-1">
              Freshly prepared from {restaurant.name}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-[3rem] py-20 text-center border-4 border-dashed border-stone-100"
            >
              <p className="text-stone-300 font-bold">No dishes available in this section yet.</p>
            </motion.div>
          ) : (
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((dish) => (
                <DishCard key={dish._id} dish={dish} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 pt-10 border-t border-stone-200">
          <Link to="/" className="inline-flex items-center gap-3 text-stone-400 hover:text-stone-900 transition-colors group">
            <span className="text-2xl font-black transition-transform group-hover:-translate-x-2">←</span>
            <span className="text-xs font-black uppercase tracking-widest">Back to Kitchens</span>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default RestaurantDetail;
