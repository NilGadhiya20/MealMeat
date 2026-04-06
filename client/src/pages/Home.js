import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDishes, fetchRestaurants } from '../api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// ── Skeleton loaders ─────────────────────────────────────
const DishSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
    <div className="h-44 bg-stone-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-stone-200 rounded w-3/4" />
      <div className="h-3 bg-stone-200 rounded w-1/2" />
      <div className="flex justify-between items-center mt-2">
        <div className="h-5 bg-stone-200 rounded w-16" />
        <div className="h-8 bg-stone-200 rounded-full w-24" />
      </div>
    </div>
  </div>
);

const RestSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse flex gap-4 p-4">
    <div className="w-20 h-20 bg-stone-200 rounded-xl flex-shrink-0" />
    <div className="flex-1 space-y-2 py-1">
      <div className="h-4 bg-stone-200 rounded w-3/4" />
      <div className="h-3 bg-stone-200 rounded w-1/2" />
      <div className="h-3 bg-stone-200 rounded w-1/3" />
    </div>
  </div>
);

// ── Crowd Level badge ────────────────────────────────────
const CrowdBadge = ({ level }) => {
  const styles = {
    low:    'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high:   'bg-red-100 text-red-700',
  };
  const labels = { low: '🟢 Low', medium: '🟡 Medium', high: '🔴 Busy' };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles[level] || 'bg-stone-100 text-stone-500'}`}>
      {labels[level] || level || 'Unknown'}
    </span>
  );
};

// ── Dish Card ────────────────────────────────────────────
const DishCard = ({ dish }) => {
  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.find((i) => i._id === dish._id);
  const PLACEHOLDER = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative h-44 overflow-hidden">
        <img
          src={dish.image || PLACEHOLDER}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
        <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full ${dish.isVeg ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {dish.isVeg ? '🌿 Veg' : '🍖 Non-veg'}
        </span>
        {dish.prepTime && (
          <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
            ⏱ {dish.prepTime} min
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-stone-800 truncate">{dish.name}</h3>
        <p className="text-xs text-stone-400 mt-0.5">{dish.restaurant?.name || dish.category}</p>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-orange-500">₹{dish.price}</span>
            {dish.rating && (
              <span className="ml-2 text-xs text-stone-400">⭐ {dish.rating}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(dish, dish.restaurant?._id || dish.restaurant)}
            className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-colors ${
              inCart
                ? 'bg-orange-100 text-orange-600 border border-orange-300'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {inCart ? `× ${inCart.quantity}` : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Restaurant Card ───────────────────────────────────────
const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const PLACEHOLDER = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&q=80';
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-center">
      <img
        src={restaurant.image || PLACEHOLDER}
        alt={restaurant.name}
        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
        onError={(e) => { e.target.src = PLACEHOLDER; }}
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-stone-800 truncate">{restaurant.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-stone-500">⭐ {restaurant.rating ?? '—'}</span>
          <span className="text-stone-300">·</span>
          <span className="text-xs text-stone-500">🕐 {restaurant.deliveryTime || '30-45 min'}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <CrowdBadge level={restaurant.crowdLevel} />
        </div>
      </div>
      <button
        onClick={() => navigate(`/restaurant/${restaurant._id}`)}
        className="flex-shrink-0 text-sm font-semibold text-orange-500 border border-orange-300 px-3 py-1.5 rounded-full hover:bg-orange-50 transition-colors"
      >
        View Menu
      </button>
    </div>
  );
};

// ── Main Home Component ───────────────────────────────────
const MOODS = ['any', 'spicy', 'comfort', 'healthy', 'sweet', 'quick'];
const TIME_OPTIONS = [
  { label: 'Any', value: '' },
  { label: 'Under 15 min', value: 15 },
  { label: 'Under 30 min', value: 30 },
  { label: 'Under 60 min', value: 60 },
];

const Home = () => {
  const { user } = useAuth();

  // Smart Meal Finder state
  const [budget, setBudget]   = useState(500);
  const [mood, setMood]       = useState('any');
  const [time, setTime]       = useState('');

  // Data state
  const [dishes, setDishes]           = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loadingDishes, setLoadingDishes]   = useState(true);
  const [loadingRests, setLoadingRests]     = useState(true);

  // Hero search state
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Student mode auto-sets budget to ₹100
  const isStudent = user?.isStudent;
  useEffect(() => {
    if (isStudent) setBudget(100);
  }, [isStudent]);

  // Fetch dishes with current filters
  const loadDishes = useCallback(() => {
    setLoadingDishes(true);
    const params = {};
    if (budget < 500) params.budget = budget;
    if (mood && mood !== 'any') params.mood = mood;
    if (time) params.time = time;

    fetchDishes(null, params)
      .then(({ data }) => setDishes(data))
      .catch(console.error)
      .finally(() => setLoadingDishes(false));
  }, [budget, mood, time]);

  // Fetch restaurants once
  useEffect(() => {
    fetchRestaurants()
      .then(({ data }) => setRestaurants(data))
      .catch(console.error)
      .finally(() => setLoadingRests(false));
  }, []);

  // Debounced filter fetch
  useEffect(() => {
    const id = setTimeout(loadDishes, 400);
    return () => clearTimeout(id);
  }, [loadDishes]);

  // Hero search
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/?q=${encodeURIComponent(search)}`);
  };

  // Filter displayed dishes by search term
  const displayedDishes = search
    ? dishes.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.category?.toLowerCase().includes(search.toLowerCase())
      )
    : dishes;

  const displayedRests = search
    ? restaurants.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
      )
    : restaurants;

  return (
    <div className="min-h-screen bg-stone-50">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            {isStudent && (
              <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                🎓 Student Mode Active — Budget capped at ₹150
              </span>
            )}
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
              Find the Perfect<br />
              <span className="text-yellow-300">Meal for You 🍽️</span>
            </h1>
            <p className="mt-4 text-orange-100 text-lg">
              Discover dishes by budget, mood & time. Order from top local restaurants.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="mt-8 flex gap-2 max-w-md mx-auto lg:mx-0">
              <input
                type="text"
                placeholder="Search dishes or restaurants..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-5 py-3 rounded-full text-stone-800 text-sm shadow focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-stone-800 font-bold px-6 py-3 rounded-full transition-colors shadow"
              >
                Search
              </button>
            </form>
          </div>

          {/* Food illustration */}
          <div className="text-[8rem] lg:text-[10rem] select-none drop-shadow-xl animate-bounce hidden lg:block">
            🍛
          </div>
        </div>
      </section>

      {/* ── Smart Meal Finder ────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-stone-800 mb-6">
          🎯 Smart Meal Finder
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Budget Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-stone-700">💰 Budget</p>
              <span className="text-orange-500 font-bold text-lg">₹{budget}</span>
            </div>
            <input
              id="budget-slider"
              type="range"
              min={50} max={500} step={10}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="slider"
              style={{ '--val': `${((budget - 50) / 450) * 100}%` }}
              disabled={isStudent}
            />
            <div className="flex justify-between text-xs text-stone-400 mt-1">
              <span>₹50</span>
              <span>₹500</span>
            </div>
            {isStudent && (
              <p className="text-xs text-orange-500 mt-2">🎓 Locked to ₹100 (Student Mode)</p>
            )}
          </div>

          {/* Mood Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
            <p className="font-semibold text-stone-700 mb-3">😋 Mood</p>
            <div className="grid grid-cols-3 gap-2">
              {MOODS.map((m) => {
                const icons = { any: '🍽️', spicy: '🌶️', comfort: '🍕', healthy: '🥗', sweet: '🍰', quick: '⚡' };
                return (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${
                      mood === m
                        ? 'bg-orange-500 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-orange-50'
                    }`}
                  >
                    {icons[m]} {m}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
            <p className="font-semibold text-stone-700 mb-3">⏱ Prep Time</p>
            <div className="space-y-2">
              {TIME_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setTime(opt.value)}
                  className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    time === opt.value
                      ? 'bg-orange-500 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-orange-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Popular Dishes ───────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-stone-800">
            🍜 Popular Dishes
            {(mood !== 'any' || budget < 500 || time) && (
              <span className="ml-2 text-sm font-normal text-orange-500">
                (filtered)
              </span>
            )}
          </h2>
          <button
            onClick={() => { setMood('any'); setBudget(isStudent ? 150 : 500); setTime(''); }}
            className="text-sm text-stone-400 hover:text-orange-500 transition-colors"
          >
            Clear filters ✕
          </button>
        </div>

        {loadingDishes ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <DishSkeleton key={i} />)}
          </div>
        ) : displayedDishes.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <p className="text-5xl mb-4">🍽️</p>
            <p className="font-semibold">No dishes match your filters.</p>
            <p className="text-sm mt-1">Try adjusting your budget, mood, or time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedDishes.slice(0, 8).map((dish) => (
              <DishCard key={dish._id} dish={dish} />
            ))}
          </div>
        )}
      </section>

      {/* ── Popular Restaurants ──────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-stone-800 mb-6">🏪 Popular Restaurants</h2>

        {loadingRests ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => <RestSkeleton key={i} />)}
          </div>
        ) : displayedRests.length === 0 ? (
          <div className="text-center py-10 text-stone-400">
            <p className="text-4xl mb-3">🏪</p>
            <p>No restaurants found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedRests.map((r) => (
              <RestaurantCard key={r._id} restaurant={r} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
