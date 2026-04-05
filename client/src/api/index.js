import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('mealmateToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ────────────────────────────────────────────────
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser    = (data) => API.post('/auth/login', data);
export const fetchProfile = ()     => API.get('/auth/profile');

// ── Restaurants ─────────────────────────────────────────
export const fetchRestaurants = ()     => API.get('/restaurants');
export const fetchRestaurant  = (id)   => API.get(`/restaurants/${id}`);

// ── Dishes ──────────────────────────────────────────────
// restaurantId: optional string, extraParams: { budget, mood, time, isVeg }
export const fetchDishes = (restaurantId, extraParams = {}) =>
  API.get('/dishes', {
    params: { ...(restaurantId ? { restaurant: restaurantId } : {}), ...extraParams },
  });
export const fetchDish = (id) => API.get(`/dishes/${id}`);

// ── Orders ──────────────────────────────────────────────
export const placeOrder    = (data) => API.post('/orders', data);
export const fetchMyOrders = ()     => API.get('/orders/my');
export const fetchOrder    = (id)   => API.get(`/orders/${id}`);

export default API;
