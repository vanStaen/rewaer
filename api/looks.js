const express = require("express");
const router = express.Router();
const Look = require("../models/Look");

// GET all looks
router.get("/", async (req, res) => {
  try {
    const look = await Look.find();
    res.json(look);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// GET single look (based on id)
router.get("/:lookID", async (req, res) => {
  try {
    const look = await Look.findById(req.params.lookID);
    res.json(look);
  } catch (err) {
    res.status(400).json({
      error: `No look found with id#${req.params.lookID} (error ${err})`,
    });
  }
});

// POST add looks
router.post("/", async (req, res) => {
  const look = new Look({
    user: req.body.user,
    mediaUrl: req.body.mediaUrl,
    items: req.body.items,
    category: req.body.category,
    active: req.body.active,
    favorite: req.body.favorite,
  });

  if (!look.user || !look.mediaUrl) {
    return res.status(400).json({ error: `Error: Some field are missing.` });
  }

  try {
    const savedLook = await look.save();
    res.status(200).json(savedLook);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Delete single look (based on id)
router.delete("/:lookID", async (req, res) => {
  try {
    const removedLook = await Look.deleteOne({ _id: req.params.lookID });
    res.json({
      msg: `Look #${req.params.lookID} has been deleted.`,
    });
  } catch (err) {
    res.status(400).json({
      error: `No look found with id#${req.params.lookID} (error ${err})`,
    });
  }
});

// patch single look (based on id)
// -> This probably won't work with arrays (eg. category and items).
router.patch("/:lookID", async (req, res) => {
  const updateField = {};
  if (req.body.user) {
    updateField.user = req.body.user;
  }
  if (req.body.mediaUrl) {
    updateField.mediaUrl = req.body.mediaUrl;
  }
  if (req.body.items) {
    updateField.name = req.body.items;
  }
  if (req.body.category) {
    updateField.category = req.body.category;
  }
  if (req.body.active !== undefined) {
    updateField.active = req.body.active;
  }
  if (req.body.favorite !== undefined) {
    updateField.favorite = req.body.favorite;
  }
  try {
    const updatedLook = await Look.updateOne(
      { _id: req.params.lookID },
      { $set: updateField }
    );
    res.status(200).json({
      message: `Look id#${req.params.lookID} has been updated.`,
    });
  } catch (err) {
    res.status(400).json({
      error: `No look found with id#${req.params.lookID} (error ${err})`,
    });
  }
});

module.exports = router;
