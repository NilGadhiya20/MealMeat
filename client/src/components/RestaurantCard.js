import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => (
  <Link to={`/restaurant/${restaurant._id}`} className="restaurant-card">
    {restaurant.image ? (
      <img src={restaurant.image} alt={restaurant.name} className="rest-img" />
    ) : (
      <div className="rest-img-placeholder">🏪</div>
    )}
    <div className="rest-info">
      <h3 className="rest-name">{restaurant.name}</h3>
      <p className="rest-cuisine">{restaurant.cuisine}</p>
      <div className="rest-meta">
        <span className="rest-rating">⭐ {restaurant.rating}</span>
        <span className="rest-time">🕐 {restaurant.deliveryTime}</span>
      </div>
    </div>
  </Link>
);

export default RestaurantCard;
