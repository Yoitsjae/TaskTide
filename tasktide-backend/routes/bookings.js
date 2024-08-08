const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const User = require('../models/User');
const { sendEmail, sendSMS } = require('../utils/notifications');

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

// Create a new booking
router.post('/', verifyToken, async (req, res) => {
    const booking = new Booking({
        customer: req.user.id,
        service: req.body.serviceId,
        date: req.body.date,
        status: 'Pending'
    });
    try {
        const savedBooking = await booking.save();
        const service = await Service.findById(req.body.serviceId);
        service.bookings.push(savedBooking._id);
        await service.save();
        const user = await User.findById(req.user.id);
        user.bookings.push(savedBooking._id);
        await user.save();

        // Send notifications
        sendEmail(user.email, 'Booking Confirmation', `Your booking for ${service.title} on ${req.body.date} has been created.`);
        sendSMS(user.phone, `Your booking for ${service.title} on ${req.body.date} has been created.`);

        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
