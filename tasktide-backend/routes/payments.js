const express = require('express');
const router = express.Router();
const paypal = require('@paypal/checkout-server-sdk');
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

const Environment = process.env.NODE_ENV === 'production' ? paypal.core.LiveEnvironment : paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(new Environment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET));

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

// Create a new payment
router.post('/create', verifyToken, async (req, res) => {
    const { bookingId, amount } = req.body;
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: amount
            }
        }]
    });
    try {
        const order = await paypalClient.execute(request);
        const payment = new Payment({
            booking: bookingId,
            amount: amount,
            status: 'Pending',
            transactionId: order.result.id
        });
        const savedPayment = await payment.save();
        res.status(201).json({ id: order.result.id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Capture a payment
router.post('/capture', verifyToken, async (req, res) => {
    const { orderId, bookingId } = req.body;
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    try {
        const capture = await paypalClient.execute(request);
        const payment = await Payment.findOne({ transactionId: orderId });
        payment.status = 'Completed';
        await payment.save();
        const booking = await Booking.findById(bookingId);
        booking.status = 'Confirmed';
        await booking.save();
        res.json(capture.result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
