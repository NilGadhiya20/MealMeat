const express = require('express');
const router  = express.Router();
const { getDishes, getDish, createDish } = require('../controllers/dishController');
const { protect } = require('../middleware/authMiddleware');

// GET  /api/dishes            → all dishes (supports ?budget, ?mood, ?time, ?isVeg, ?restaurant)
router.get('/', getDishes);

// GET  /api/dishes/:id        → single dish with restaurant info populated
router.get('/:id', getDish);

// POST /api/dishes            → admin adds a new dish (auth required)
router.post('/', protect, createDish);

module.exports = router;
