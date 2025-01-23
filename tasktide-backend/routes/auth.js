const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getUserDashboard,
} = require("../controllers/userController");

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// User dashboard route (protected)
router.get("/dashboard", getUserDashboard);

module.exports = router;
