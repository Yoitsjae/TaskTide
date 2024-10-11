const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

dotenv.config(); // Load environment variables

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mounting routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);

// Error handling middleware
app.use(errorHandler);

// Define the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
