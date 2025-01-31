const express = require('express');
const { signupUser, confirmPayment } = require('../controllers/userController');

const router = express.Router();

// Signup route
router.post('/signup', signupUser);

// Payment confirmation webhook route for PayPal IPN
router.post('/paypal-ipn', confirmPayment);

module.exports = router;
