const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ── Environment Safety Check ─────────────────────────────
if (!process.env.MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI is not defined in environment variables.');
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error('❌ ERROR: JWT_SECRET is not defined in environment variables.');
  process.exit(1);
}
const allowedOrigins = [
  'http://localhost:3000',
  'https://mealmate.vercel.app'  // Replace with actual Vercel URL
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/dishes',      require('./routes/dishes'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/orders',      require('./routes/orders'));
app.use('/api/contact',     require('./routes/contact'));

// Health-check
app.get('/', (req, res) => res.send('MealMate API is running 🍽️'));

// ── Connect & Start ──────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!');
    app.listen(process.env.PORT || 5000, () =>
      console.log('Server running on port ' + (process.env.PORT || 5000))
    );
  })
  .catch((err) => console.log(err));

module.exports = app;
