const express = require('express');
const { createBooking } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createBooking);

module.exports = router;
