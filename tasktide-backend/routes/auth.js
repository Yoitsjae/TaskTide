const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const storePath = path.join(__dirname, "../data/Store.json");

// Signup Endpoint
router.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const storeData = JSON.parse(fs.readFileSync(storePath, "utf-8"));
        const userExists = storeData.find((user) => user.email === email);

        if (userExists) {
            return res.status(400).json({ message: "User already exists." });
        }

        const newUser = { name, email, password, role };
        storeData.push(newUser);

        fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2), "utf-8");

        res.status(201).json({ message: "Signup successful.", role });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Server error. Could not complete signup." });
    }
});

module.exports = router;
