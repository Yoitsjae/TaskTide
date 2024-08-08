const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
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

// Create a new service listing
router.post('/', verifyToken, async (req, res) => {
    const service = new Service({
        provider: req.user.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        availability: req.body.availability,
        location: req.body.location,
        images: req.body.images,
        ratings: []
    });
    try {
        const savedService = await service.save();
        const user = await User.findById(req.user.id);
        user.services.push(savedService._id);
        await user.save();
        res.status(201).json(savedService);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find().populate('provider', 'name');
        res.json(services);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a specific service
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate('provider', 'name');
        res.json(service);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a service listing
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service.provider.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        Object.assign(service, req.body);
        const updatedService = await service.save();
        res.json(updatedService);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a service listing
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service.provider.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        await service.remove();
        const user = await User.findById(req.user.id);
        user.services.pull(service._id);
        await user.save();
        res.json({ message: 'Service deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
