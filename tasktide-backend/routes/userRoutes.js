const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// User registration route
router.post('/signup', createUser);

// User login route
router.post('/login', loginUser);

module.exports = router;
