const express = require("express");
const router = express.Router();
const { matchUsers } = require("../controllers/matchingController");
const { authenticateJWT } = require("../middleware/authMiddleware");

router.get("/matches", authenticateJWT, matchUsers);

module.exports = router;
