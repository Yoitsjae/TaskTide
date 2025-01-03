const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Admin dashboard
router.get('/admin', isAuthenticated, authorizeRoles('admin'), dashboardController.adminDashboard);

// User dashboard
router.get('/user', isAuthenticated, authorizeRoles('user'), dashboardController.userDashboard);

// Other role-specific dashboards can be added similarly
// e.g., a route for 'manager' role, if applicable
router.get('/manager', isAuthenticated, authorizeRoles('manager'), dashboardController.managerDashboard);

module.exports = router;
