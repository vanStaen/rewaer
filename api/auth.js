const express = require("express");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// POST login
router.post("/", async (req, res) => {
  if (!req.body.password) {
    return res.status(400).json({ error: `No password was provided` });
    throw new Error("No password was provided!");
  }
  if (!req.body.email) {
    return res.status(400).json({ error: `No email was provided` });
    throw new Error("No email was provided!");
  }

  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ error: `User does not exist!` });
    throw new Error("User does not exist!");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(400).json({ error: `Password is incorrect!` });
    throw new Error("Password is incorrect!");
  }

  const token = await jsonwebtoken.sign(
    { userId: user.id, email: user.email },
    process.env.AUTH_SECRET_KEY,
    { expiresIn: "10m" }
  );

  res.json({ userId: user.id, token: token, tokenExpiration: "10m" });
});

module.exports = router;
