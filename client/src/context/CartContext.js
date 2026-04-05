import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);

  const addToCart = (dish, restId) => {
    // Enforce single-restaurant cart
    if (restaurantId && restId !== restaurantId) {
      const confirmed = window.confirm(
        'Your cart has items from another restaurant. Clear cart and add this item?'
      );
      if (!confirmed) return;
      setCartItems([]);
      setRestaurantId(restId);
    }

    if (!restaurantId) setRestaurantId(restId);

    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === dish._id);
      if (existing) {
        return prev.map((item) =>
          item._id === dish._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId) => {
    setCartItems((prev) => {
      const updated = prev
        .map((item) => (item._id === dishId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0);
      if (updated.length === 0) setRestaurantId(null);
      return updated;
    });
  };

  const removeItemCompletely = (dishId) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item._id !== dishId);
      if (updated.length === 0) setRestaurantId(null);
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurantId(null);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        restaurantId,
        addToCart,
        removeFromCart,
        removeItemCompletely,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
