const Dish = require('../models/Dish');

// ── Mood → category mapping ──────────────────────────────
const MOOD_MAP = {
  spicy:    ['Spicy', 'Indian', 'Mexican', 'Thai'],
  comfort:  ['Burgers', 'Pizza', 'Pasta', 'Snacks'],
  healthy:  ['Salads', 'Soups', 'Grilled', 'Vegan'],
  sweet:    ['Desserts', 'Beverages', 'Shakes'],
  quick:    [], // handled via prepTime filter
};

// ── GET /api/dishes ──────────────────────────────────────
// Query params:
//   ?budget=150        → price <= 150
//   ?mood=spicy        → filter by category group
//   ?time=15           → prepTime <= 15
//   ?restaurant=<id>   → filter by restaurant
//   ?isVeg=true        → veg only
exports.getDishes = async (req, res) => {
  try {
    const { budget, mood, time, restaurant, isVeg } = req.query;
    const filter = {};

    // Budget filter
    if (budget) filter.price = { $lte: Number(budget) };

    // Mood filter — map mood to categories
    if (mood && MOOD_MAP[mood.toLowerCase()]) {
      const categories = MOOD_MAP[mood.toLowerCase()];
      if (categories.length > 0) {
        filter.category = { $in: categories };
      }
    }

    // Prep-time filter (also handles mood=quick)
    const maxTime = time
      ? Number(time)
      : mood?.toLowerCase() === 'quick' ? 15 : null;
    if (maxTime) filter.prepTime = { $lte: maxTime };

    // Restaurant filter
    if (restaurant) filter.restaurant = restaurant;

    // Veg filter
    if (isVeg === 'true') filter.isVeg = true;

    const dishes = await Dish.find(filter)
      .populate('restaurant', 'name deliveryTime address rating')
      .sort({ rating: -1 });

    res.json(dishes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ── GET /api/dishes/:id ──────────────────────────────────
exports.getDish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id)
      .populate('restaurant', 'name deliveryTime address rating crowdLevel');
    if (!dish) return res.status(404).json({ msg: 'Dish not found' });
    res.json(dish);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ── POST /api/dishes — admin adds a new dish ─────────────
exports.createDish = async (req, res) => {
  try {
    const { name, price, rating, image, category, restaurant, isVeg, prepTime } = req.body;

    if (!name || !price || !restaurant) {
      return res.status(400).json({ msg: 'name, price and restaurant are required' });
    }

    const dish = await Dish.create({
      name, price, rating, image, category, restaurant, isVeg, prepTime,
    });

    const populated = await dish.populate('restaurant', 'name');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
