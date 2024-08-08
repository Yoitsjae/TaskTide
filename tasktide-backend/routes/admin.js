const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Service = require('../models/Service');
const Review = require('../models/Review');

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'Admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// Get all users
router.get('/users', verifyAdminToken, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all services
router.get('/services', verifyAdminToken, async (req, res) => {
    try {
        const services = await Service.find().populate('provider', 'name');
        res.json(services);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all reviews
router.get('/reviews', verifyAdminToken, async (req, res) => {
    try {
        const reviews = await Review.find().populate('customer', 'name').populate('service', 'title');
        res.json(reviews);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Approve a service provider
router.put('/users/:id/approve', verifyAdminToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.isApproved = true;
        await user.save();
        res.json({ message: 'Service provider approved' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a user
router.delete('/users/:id', verifyAdminToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a service
router.delete('/services/:id', verifyAdminToken, async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a review
router.delete('/reviews/:id', verifyAdminToken, async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
