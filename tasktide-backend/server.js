const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authenticateUser = require('./middlewares/authMiddleware');

// Initialize the app
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to the database
connectDB();

// Register routes
app.use('/api/users', userRoutes);

// Protected route example
app.get('/api/protected', authenticateUser, (req, res) => {
  res.status(200).json({ message: 'This is a protected route.', user: req.user });
});

// Default route (Optional)
app.get('/', (req, res) => {
  res.send('Welcome to TaskTide API');
});

// Set the port for the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
