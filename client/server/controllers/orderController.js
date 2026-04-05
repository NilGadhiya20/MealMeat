const Order = require('../models/Order');

// POST /api/orders  — place a new order
exports.placeOrder = async (req, res) => {
  const { items, total, status } = req.body;
  try {
    const order = await Order.create({
      user: req.user.id,
      items,
      total,
      status: status || 'pending',
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET /api/orders/my  — get current user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
