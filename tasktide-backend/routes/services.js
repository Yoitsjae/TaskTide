const express = require('express');
const serviceController = require('../controllers/serviceController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Create a new service (admin-only)
router.post('/', isAuthenticated, authorizeRoles('admin'), serviceController.createService);

// Get a list of all services
router.get('/', serviceController.getAllServices);

// Update a service (admin-only)
router.put('/:serviceId', isAuthenticated, authorizeRoles('admin'), serviceController.updateService);

// Delete a service (admin-only)
router.delete('/:serviceId', isAuthenticated, authorizeRoles('admin'), serviceController.deleteService);

module.exports = router;
