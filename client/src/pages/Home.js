import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fetchRestaurants, fetchDishes } from '../api';
import RestaurantCard from '../components/RestaurantCard';
import DishCard from '../components/DishCard';
import { useAuth } from '../context/AuthContext';

// ── Skeletons ──────────────────────────────────────────
const Skeleton = () => (
  <div className="bg-white/50 backdrop-blur rounded-[2rem] h-64 animate-pulse border border-white/20" />
);

const Home = () => {
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [budget, setBudget] = useState(500);
  const [mood, setMood] = useState('any');
  const [prepTime, setPrepTime] = useState(60);
  const [isVeg, setIsVeg] = useState(false);

  // Student mode logic
  const isStudent = user?.isStudent;
  useEffect(() => {
    if (isStudent) setBudget(100);
  }, [isStudent]);

  useEffect(() => {
    Promise.all([fetchRestaurants(), fetchDishes()])
      .then(([{ data: restList }, { data: dishList }]) => {
        setRestaurants(restList);
        setDishes(dishList);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredDishes = useMemo(() => {
    return dishes.filter((d) => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || 
                          d.restaurant?.name?.toLowerCase().includes(search.toLowerCase());
      const matchBudget = d.price <= budget;
      const matchMood   = mood === 'any' || d.mood?.toLowerCase() === mood.toLowerCase();
      const matchTime   = !d.prepTime || d.prepTime <= prepTime;
      const matchVeg    = !isVeg || d.isVeg;
      return matchSearch && matchBudget && matchMood && matchTime && matchVeg;
    });
  }, [dishes, search, budget, mood, prepTime, isVeg]);

  const handleSliderChange = useCallback((e) => {
    const val = Number(e.target.value);
    const min = Number(e.target.min);
    const max = Number(e.target.max);
    e.target.style.setProperty('--val', `${((val - min) / (max - min)) * 100}%`);
    setBudget(val);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20 font-sans overflow-x-hidden">
      
      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white pt-12 pb-24 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 border border-white/20"
            >
              Discount For New User ₹150 (CODE: NIL150)
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
              Find the Perfect <br />
              <span className="text-stone-900">Meal for You</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-orange-50 mb-10 max-w-xl mx-auto lg:mx-0 font-medium opacity-90 leading-relaxed">
              Discover dishes by budget, mood & time. Order from top local restaurants.
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative max-w-md mx-auto lg:mx-0"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="What are you craving?"
                className="w-full bg-white text-stone-800 rounded-2xl px-6 py-5 pr-32 shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all font-semibold"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-stone-900 hover:bg-stone-800 text-white px-8 rounded-xl font-bold transition-all active:scale-95 text-xs uppercase tracking-wider">
                Search
              </button>
            </motion.div>
          </motion.div>

          {/* Food illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center lg:justify-end hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse" />
              <img 
                src="/hero-food.png" 
                alt="Delicious Meal" 
                className="w-[450px] h-[450px] object-cover rounded-full shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer animate-float border-8 border-white/20 relative z-10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SMART MEAL FINDER ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto -mt-16 px-4 relative z-20">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card rounded-[3rem] p-8 lg:p-12 shadow-2xl shadow-orange-900/10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-4 mb-10 text-center lg:text-left">
            <div className="w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            </div>
            <div>
              <h2 className="text-3xl font-black text-stone-800 tracking-tight">Smart Meal Finder</h2>
              <p className="text-stone-400 font-bold uppercase text-[10px] tracking-widest mt-1">Personalized recommendations in seconds</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Filter Tile: Budget */}
            <div className="space-y-4 p-6 bg-stone-50 rounded-3xl border border-stone-100 hover:border-orange-200 transition-all group">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Max Budget</label>
                <div className="text-xl font-black text-orange-500">₹{budget}</div>
              </div>
              <input
                type="range" min="50" max="1000" step="10"
                value={budget} onChange={handleSliderChange}
                className="slider"
                disabled={isStudent}
              />
              <div className="flex justify-between text-[9px] text-stone-400 font-bold uppercase">
                <span>Value</span>
                <span>Premium</span>
              </div>
              {isStudent && <p className="text-[9px] text-orange-500 font-bold uppercase tracking-tighter">Budget Locked (Student Mode)</p>}
            </div>

            {/* Filter Tile: Mood */}
            <div className="space-y-4 p-6 bg-stone-50 rounded-3xl border border-stone-100 hover:border-orange-200 transition-all group">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">How's the Mood?</label>
              <div className="flex flex-wrap gap-2">
                {['any', 'spicy', 'comfort', 'healthy', 'sweet', 'quick'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-wider uppercase transition-all ${
                      mood === m ? 'bg-stone-900 text-white shadow-lg' : 'bg-white text-stone-500 hover:bg-stone-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Tile: Prep Time */}
            <div className="space-y-4 p-6 bg-stone-50 rounded-3xl border border-stone-100 hover:border-orange-200 transition-all group">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Wait Time</label>
                <div className="text-xl font-black text-stone-800">{prepTime} <span className="text-xs">min</span></div>
              </div>
              <input
                type="range" min="10" max="120" step="5"
                value={prepTime} onChange={(e) => setPrepTime(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between text-[9px] text-stone-400 font-bold uppercase">
                <span>Instant</span>
                <span>Gourmet</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <button 
              onClick={() => setIsVeg(!isVeg)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all font-black text-[11px] uppercase tracking-widest ${
                isVeg ? 'bg-green-100 text-green-700 border-2 border-green-200' : 'bg-stone-100 text-stone-400 border-2 border-transparent'
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${isVeg ? 'bg-green-500' : 'bg-stone-300'}`} />
              Vegetarian Only
            </button>

            <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
              Showing <span className="text-orange-500 text-sm">{filteredDishes.length}</span> curated matches
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── DISHES GRID ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-black text-stone-800 tracking-tight">Today's Specials</h2>
            <p className="text-stone-400 font-bold uppercase text-[10px] tracking-widest mt-1">Based on your smart filters</p>
          </div>
          <button 
            onClick={() => { setSearch(''); setMood('any'); setBudget(isStudent ? 100 : 1000); setIsVeg(false); setPrepTime(120); }}
            className="text-[10px] font-black text-orange-500 uppercase tracking-tighter hover:underline"
          >
            Reset All Filters
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => <Skeleton key={i} />)}
          </div>
        ) : filteredDishes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white rounded-[3rem] py-24 text-center border-2 border-dashed border-stone-200"
          >
            <h3 className="text-xl font-bold text-stone-300">No dishes found. Try relaxing your filters.</h3>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredDishes.map((dish) => (
              <motion.div key={dish._id} variants={itemVariants}>
                <DishCard dish={dish} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* ── RESTAURANTS SECTION ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-stone-900 rounded-[4rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-end justify-between mb-16 gap-8 text-center lg:text-left">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black leading-tight mb-4 tracking-tighter">Explore <br />Top Kitchens</h2>
              <p className="text-stone-400 font-bold uppercase text-xs tracking-widest leading-relaxed">Hand-verified local favorites delivering right now</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl px-8 py-5 rounded-3xl border border-white/10">
              <span className="block text-4xl font-black text-orange-500 leading-none mb-1">{restaurants.length}</span>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Active Partners</span>
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {restaurants.map((res) => (
              <motion.div key={res._id} variants={itemVariants}>
                <RestaurantCard restaurant={res} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
