const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const moment = require("moment");
const pics = require("../helpers/mockData/mockDataPics");

// GET all pictures
router.get("/", (req, res) => {
  res.json(pics);
});

// GET single picture (based on id)
router.get("/:id", (req, res) => {
  const found = pics.some((pic) => pic.id === parseInt(req.params.id));
  if (found) {
    res.json(pics.filter((pic) => pic.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ error: `No picture found with id#${req.params.id}` });
  }
});

// POST add pictures
router.post("/", (req, res) => {
  const newPic = {
    id: uuid.v4(),
    originalFileName: req.body.originalFileName,
    extension: req.body.extension,
    url: req.body.url,
    dateAdded: moment().format("DD/MM/YYYY, H:mm:ss"),
  };

  if (!newPic.url) {
    return res.status(400).json({ error: `Error: Some field are missing.` });
  }

  pics.push(newPic);
  res.json(pics);
});

// PUT single picture (based on id)
router.put("/:id", (req, res) => {
  const found = pics.some((pic) => pic.id === parseInt(req.params.id));
  if (found) {
    const updatedPicture = req.body;
    pics.forEach((pic) => {
      if (pic.id === parseInt(req.params.id)) {
        pic.originalFileName = updatedPicture.originalFileName
          ? updatedPicture.originalFileName
          : pic.originalFileName;
        pic.extension = updatedPicture.extension
          ? updatedPicture.extension
          : pic.extension;
        pic.url = updatedPicture.url ? updatedPicture.url : pic.url;
        res.json({ msg: `Picture #${pic.id} has been updated.`, pic });
      }
    });
  } else {
    res
      .status(400)
      .json({ error: `No picture found with id#${req.params.id}` });
  }
});

// DELETE single picture (based on id)
router.delete("/:id", (req, res) => {
  const found = pics.some((pic) => pic.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: `Picture #${pic.id} has been deleted.`,
      pitures: pics.filter((pic) => pic.id !== parseInt(req.params.id)),
    });
  } else {
    res
      .status(400)
      .json({ error: `No picture found with id#${req.params.id}` });
  }
});

module.exports = router;
