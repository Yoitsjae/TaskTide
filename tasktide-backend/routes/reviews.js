const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Review = require('../models/Review');
const Service = require('../models/Service');
const User = require('../models/User');

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// Create a new review
router.post('/', verifyToken, async (req, res) => {
    const { serviceId, rating, comment } = req.body;
    const review = new Review({
        customer: req.user.id,
        service: serviceId,
        rating,
        comment,
        date: new Date()
    });
    try {
        const savedReview = await review.save();
        const service = await Service.findById(serviceId);
        service.reviews.push(savedReview._id);
        await service.save();
        const user = await User.findById(req.user.id);
        user.reviews.push(savedReview._id);
        await user.save();
        res.status(201).json(savedReview);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get reviews for a service
router.get('/service/:id', async (req, res) => {
    try {
        const reviews = await Review.find({ service: req.params.id }).populate('customer', 'name');
        res.json(reviews);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
