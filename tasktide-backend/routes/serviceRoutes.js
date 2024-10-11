const express = require('express');
const { getService } = require('../controllers/serviceController');

const router = express.Router();

// Service retrieval route
router.get('/', getService);

module.exports = router;
