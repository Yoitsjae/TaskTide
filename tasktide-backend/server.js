// File: tasktide-backend/server.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/serviceRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);

// Global error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
