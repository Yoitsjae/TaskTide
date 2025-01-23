const express = require('express');
const { signupUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Signup route
router.post('/signup', signupUser);

// Login route
router.post('/login', loginUser);

// Payment confirmation webhook route for PayPal IPN
router.post('/paypal-ipn', userController.confirmPayment);

module.exports = router;
