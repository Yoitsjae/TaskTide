const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

// Routes for Admin Dashboard
router.get("/dashboard", adminController.getDashboardData);
router.delete("/user/:id", adminController.deleteUser);
router.post("/task/:id/approve", adminController.approveTask);
router.post("/task/:id/reject", adminController.rejectTask);

module.exports = router;
