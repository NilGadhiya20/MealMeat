import React from 'react';
import { useCart } from '../context/CartContext';

const DishCard = ({ dish }) => {
  const { addToCart, cartItems } = useCart();
  const cartItem = cartItems.find((i) => i._id === dish._id);

  return (
    <div className="dish-card">
      {dish.image ? (
        <img src={dish.image} alt={dish.name} className="dish-img" />
      ) : (
        <div className="dish-img-placeholder">🍴</div>
      )}
      <div className="dish-info">
        <div className="dish-header">
          <span className={`veg-badge ${dish.isVeg ? 'veg' : 'nonveg'}`}>
            {dish.isVeg ? '🟢' : '🔴'}
          </span>
          <h3 className="dish-name">{dish.name}</h3>
        </div>
        {dish.description && <p className="dish-desc">{dish.description}</p>}
        <div className="dish-footer">
          <span className="dish-price">₹{dish.price}</span>
          <button
            className="btn-add"
            onClick={() => addToCart(dish, dish.restaurant?._id || dish.restaurant)}
          >
            {cartItem ? `In Cart (${cartItem.quantity})` : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
