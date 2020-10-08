const express = require("express");
const router = express.Router();
const Item = require('../models/Item');


// GET all items
router.get("/", async (req, res) => {
  try {
    const item = await Item.find();
    res.json(item);
  }
  catch (err) {
    res.status(400).json({ message: err });
  }
});


// GET single item (based on id)
router.get("/:itemID", async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemID)
    res.json(item);
  }
  catch (err) {
    res.status(400).json({
      error: `No item found with id#${req.params.itemID} (error ${err})`
    });
  }
});


// POST add items
router.post("/", async (req, res) => {
  const item = new Item({
    user: req.body.user,
    mediaUrl: req.body.mediaUrl
  });

  if (!item.user || !item.mediaUrl) {
    return res.status(400).json({ error: `Error: Some field are missing.` });
  }

  try {
    const savedItem = await item.save();
    res.status(200).json(savedItem);
  }
  catch (err) {
    res.status(400).json({ message: err });
  }


});


// Delete single item (based on id)
router.delete("/:itemID", async (req, res) => {
  try {
    const removedItem = await Item.remove({ _id: req.params.itemID })
    res.json({
      msg: `Item #${req.params.itemID} has been deleted.`
    });
  }
  catch (err) {
    res.status(400).json({
      error: `No item found with id#${req.params.itemID} (error ${err})`
    });
  }
});


// patch single item (based on id)
// -> This probably won't work with arrays (eg. category and colors).
router.patch("/:itemID", async (req, res) => {
  const updateField = {};
  if (req.body.user) { updateField.user = req.body.user; }
  if (req.body.mediaUrl) { updateField.mediaUrl = req.body.mediaUrl; }
  if (req.body.category) { updateField.category = req.body.category; }
  if (req.body.desc) { updateField.desc = req.body.desc; }
  if (req.body.colors) { updateField.colors = req.body.colors; }
  if (req.body.brand) { updateField.brand = req.body.brand; }
  if (req.body.active !== undefined) { updateField.active = req.body.active; }
  if (req.body.favorite !== undefined) { updateField.favorite = req.body.favorite; }
  try {
    const updatedItem = await Item.updateOne(
      { _id: req.params.itemID },
      { $set: updateField }
    )
    res.status(200).json({
      message: `Item id#${req.params.itemID} has been updated.`
    });
  }
  catch (err) {
    res.status(400).json({
      error: `No item found with id#${req.params.itemID} (error ${err})`
    });
  }

});

module.exports = router;
