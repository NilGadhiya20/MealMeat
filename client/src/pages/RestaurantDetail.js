import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

  if (loading) return <main className="page"><div className="loading-spinner">Loading...</div></main>;
  if (!restaurant) return <main className="page"><p>Restaurant not found.</p><Link to="/">← Back</Link></main>;

  const categories = ['All', ...new Set(dishes.map((d) => d.category))];
  const filtered = activeCategory === 'All' ? dishes : dishes.filter((d) => d.category === activeCategory);

  return (
    <main className="page restaurant-detail-page">
      {/* Restaurant Header */}
      <div className="rest-detail-header">
        {restaurant.image && <img src={restaurant.image} alt={restaurant.name} className="rest-banner" />}
        <div className="rest-detail-info">
          <h1>{restaurant.name}</h1>
          <p className="rest-cuisine-tag">{restaurant.cuisine}</p>
          {restaurant.description && <p className="rest-description">{restaurant.description}</p>}
          <div className="rest-meta-row">
            <span>⭐ {restaurant.rating}</span>
            <span>🕐 {restaurant.deliveryTime}</span>
            <span>📍 {restaurant.address}</span>
            {restaurant.minOrder > 0 && <span>Min. ₹{restaurant.minOrder}</span>}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dishes Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">No dishes available in this category.</div>
      ) : (
        <div className="dish-grid">
          {filtered.map((dish) => (
            <DishCard key={dish._id} dish={dish} />
          ))}
        </div>
      )}

      <Link to="/" className="back-link">← Back to Restaurants</Link>
    </main>
  );
};

export default RestaurantDetail;
