const express = require("express");
const router = express.Router();
const fs = require("fs");

// Dashboard route
router.get("/dashboard", (req, res) => {
  const email = req.query.email;
  const storeFilePath = "./data/Store.json";

  if (!email) {
    return res.status(400).send("Invalid dashboard request.");
  }

  try {
    const fileData = JSON.parse(fs.readFileSync(storeFilePath, "utf-8"));
    const user = fileData.find((u) => u.email === email);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
