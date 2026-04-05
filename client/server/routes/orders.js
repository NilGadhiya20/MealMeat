const express = require('express');
const router  = express.Router();
const { placeOrder, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/orders  — place order (auth required)
router.post('/', protect, placeOrder);

// GET  /api/orders/my  — my orders (auth required)
router.get('/my', protect, getMyOrders);

module.exports = router;
