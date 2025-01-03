const express = require('express');
const userController = require('../controllers/userController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', isAuthenticated, userController.getProfile);

// Update user profile
router.put('/profile', isAuthenticated, userController.updateProfile);

// Get all users (admin-only)
router.get('/', isAuthenticated, authorizeRoles('admin'), userController.getAllUsers);

// Delete a user (admin-only)
router.delete('/:userId', isAuthenticated, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;
