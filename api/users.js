const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const moment = require("moment");
const User = require('../models/User');

// GET all users
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  }
  catch (err) {
    res.status(400).json({ message: err });
  }
});

// GET single user (based on id)
router.get("/:userID", async (req, res) => {
  try {
    const user = await User.findById(req.params.userID)
    res.json(user);
  }
  catch (err) {
    res.status(400).json({
      error: `No user found with id#${req.params.userID} (error ${err})`
    });
  }
});

// POST add users
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    joinDate: moment().format("DD-MM-YYYY"),
    encryptedPWD: req.body.pwd,
    active: true,
  });

  if (!user.name || !user.email || !user.encryptedPWD) {
    return res.status(400).json({ error: `Error: Some field are missing.` });
  }

  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  }
  catch (err) {
    res.status(400).json({ message: err });
  }


});




// TODO ::

// PUT single user (based on id)
router.put("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    const updatedUser = req.body;
    users.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
        user.userName = updatedUser.userName
          ? updatedUser.userName
          : user.userName;
        user.googleId = updatedUser.googleId
          ? updatedUser.googleId
          : user.googleId;
        user.dateCreated = updatedUser.dateCreated
          ? updatedUser.dateCreated
          : user.dateCreated;
        user.statusActive = updatedUser.statusActive
          ? updatedUser.statusActive
          : user.statusActive;
        res.json({ msg: `User #${user.id} has been updated.`, user });
      }
    });
  } else {
    res.status(400).json({ error: `No user found with id#${req.params.id}` });
  }
});

// Delete single user (based on id)
router.delete("/:id", (req, res) => {
  const found = users.some((users) => users.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: `Picture #${pic.id} has been deleted.`,
      users: users.filter((users) => users.id == parseInt(req.params.id)),
    });
  } else {
    res.status(400).json({ error: `No user found with id#${req.params.id}` });
  }
});

module.exports = router;
