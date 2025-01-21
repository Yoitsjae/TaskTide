// backend.js (Express.js Server Example)
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { User, Service, Booking } = require('./models'); // Assume models are defined
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your_jwt_secret'; // Replace with your secret

app.use(bodyParser.json());

// Sign-Up
app.post('/api/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();
  res.json({ success: true, message: 'User registered successfully!' });
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ success: true, token, role: user.role });
});

// Forgot Password
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '10m' });
  const resetLink = `http://yourdomain.com/reset-password/${token}`;
  // Send email with reset link (using nodemailer)
  
  res.json({ success: true, message: 'Reset link sent to your email.' });
});

// Reset Password
app.post('/api/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });
    res.json({ success: true, message: 'Password reset successfully.' });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid or expired token.' });
  }
});

// Middleware to protect routes
function authenticateJWT(req, res, next) {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Use this middleware to protect dashboard routes
app.get('/api/client-dashboard', authenticateJWT, (req, res) => {
  if (req.user.role !== 'client') return res.sendStatus(403);
  // Fetch services and bookings for the client
});

app.get('/api/provider-dashboard', authenticateJWT, (req, res) => {
  if (req.user.role !== 'provider') return res.sendStatus(403);
  // Fetch service listings and client bookings for the provider
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
