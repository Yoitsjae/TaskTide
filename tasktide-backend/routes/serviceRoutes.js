// File: tasktide-backend/routes/serviceRoutes.js
const express = require('express');
const pool = require('../utils/db');

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM services');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// Add a new service
router.post('/', async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO services (name, description, price) VALUES ($1, $2, $3) RETURNING *',
            [name, description, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add service' });
    }
});

module.exports = router;
