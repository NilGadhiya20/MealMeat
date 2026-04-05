const express = require('express');
const router  = express.Router();
const { getRestaurants, getRestaurant } = require('../controllers/restaurantController');

// GET /api/restaurants
router.get('/', getRestaurants);

// GET /api/restaurants/:id
router.get('/:id', getRestaurant);

module.exports = router;
