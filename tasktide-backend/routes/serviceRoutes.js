const express = require('express');
const { getServices, createService } = require('../controllers/serviceController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getServices);
router.post('/', protect, createService);

module.exports = router;
