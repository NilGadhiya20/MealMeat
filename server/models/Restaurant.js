const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name:         String,
  address:      String,
  rating:       Number,
  crowdLevel:   { type: String, enum: ['low', 'medium', 'high'] },
  image:        String,
  deliveryTime: String,
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
