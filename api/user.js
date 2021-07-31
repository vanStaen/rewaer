const bcrypt = require("bcryptjs");
const express = require("express");
const User = require("../models/User");
const router = express.Router();

// GET User (for debugging only)
router.get("/", async (req, res) => {
    try {
        const user = await User.find();
        user.map((user) => {
            return {
                ...user._doc,
                dateCreated: new Date(user._doc.dateCreated).toISOString(),
            };
        });
        res.status(201).json({ user: user });
    } catch (err) {
        res.status(400).json({
            error: `${err}`,
        });
    }
})

module.exports = router;