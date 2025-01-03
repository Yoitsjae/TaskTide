const express = require('express');
const paypal = require('paypal-rest-sdk');
const router = express.Router();

// PayPal Configuration
paypal.configure({
  mode: 'sandbox', // 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// Route to Create Payment
router.post('/create', (req, res) => {
  const { amount } = req.body;

  const create_payment_json = {
    intent: 'sale',
    payer: { payment_method: 'paypal' },
    transactions: [
      {
        amount: { currency: 'USD', total: amount },
        description: 'Service Booking Fee',
      },
    ],
    redirect_urls: {
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    },
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      res.status(500).json({ message: 'Error creating payment', error });
    } else {
      res.json(payment);
    }
  });
});

// Route to Execute Payment
router.post('/execute', (req, res) => {
  const { paymentId, payerId } = req.body;

  const execute_payment_json = {
    payer_id: payerId,
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      res.status(500).json({ message: 'Error executing payment', error });
    } else {
      res.json(payment);
    }
  });
});

module.exports = router;
