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

// POST Create New user
router.post("/", async (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                res.status(400).json({ error: "There is already an account associated to this email." });
            }
            return bcrypt.hash(req.body.password, 12);
        })
        .then((hashedPassword) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                active: true,
            });
            user.save();
            res.status(201).json({ user: user });
        })
        .catch((err) => {
            res.status(400).json({
                error: `${err}`,
            });
        });
})

// PATCH update user
router.patch("/", async (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                res.status(400).json({ error: "There is already an account associated to this email." });
            }
            return bcrypt.hash(req.body.password, 12);
        })
        .then((hashedPassword) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                active: true,
            });
            user.save();
            res.status(201).json({ user: user });
        })
        .catch((err) => {
            res.status(400).json({
                error: `${err}`,
            });
        });
})

module.exports = router;