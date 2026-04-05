const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  name:       String,
  price:      Number,
  rating:     Number,
  image:      String,
  category:   String,
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  isVeg:      Boolean,
  prepTime:   Number,
});

module.exports = mongoose.model('Dish', DishSchema);
