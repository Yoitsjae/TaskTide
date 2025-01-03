const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const serviceRoutes = require('./routes/services');
const dashboardRoutes = require('./routes/dashboard');
const { validateToken } = require('./utils/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Route Middleware
app.use('/api/auth', authRoutes);
app.use('/api/users', validateToken, userRoutes);
app.use('/api/services', validateToken, serviceRoutes);
app.use('/api/dashboard', validateToken, dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
