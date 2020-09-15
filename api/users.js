const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const moment = require("moment");
const users = require("../helpers/mockData/mockDataUsers");

// GET all pictures
router.get("/", (req, res) => {
  res.json(users);
});

// GET single user (based on id)
router.get("/:id", (req, res) => {
  const found = users.some((users) => users.id === parseInt(req.params.id));
  if (found) {
    res.json(users.filter((users) => users.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ error: `No user found with id#${req.params.id}` });
  }
});

// POST add users
router.post("/", (req, res) => {
  const newUser = {
    id: uuid.v4(),
    userName: req.body.userName,
    googleId: req.body.googleId,
    dateCreated: moment().format("DD/MM/YYYY, H:mm:ss"),
    statusActive: true,
  };

  if (!newUser.userName || !newUser.googleId) {
    return res.status(400).json({ error: `Error: Some field are missing.` });
  }

  users.push(newUser);
  res.json(users);
});

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

// GET single user (based on id)
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
