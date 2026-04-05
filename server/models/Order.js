const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items:  [{ dish: String, quantity: Number, price: Number }],
    total:  Number,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
