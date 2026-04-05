const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

// ── Register ─────────────────────────────────────────────
// POST /api/auth/register
exports.register = async (req, res) => {
  const { name, email, password, isStudent } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'Email already in use' });

    // password is hashed by the pre-save hook in User model
    const user = await User.create({ name, email, password, isStudent });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, isStudent: user.isStudent },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ── Login ────────────────────────────────────────────────
// POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Wrong password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, isStudent: user.isStudent },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ── Get Profile ──────────────────────────────────────────
// GET /api/auth/profile  (protected)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
