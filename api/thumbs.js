const express = require("express");
const jimp = require('jimp');
const { v1: uuidv1 } = require('uuid');
const router = express.Router();

// GET all data from watchlist
router.post("/", async (req, res) => {
  const url = req.body.url;
  const tempPath = './public/uploads/';
  const tempFileName = uuidv1();
  const tempURL = tempPath + tempFileName;
  const cleanedUrl = tempURL.slice(2, tempURL.length);

  try {
    jimp.read(url, (err, img) => {
      img.resize(120, 120)
        .quality(60)
        .write(tempURL)
    })
    res.status(201).json({ thumbUrl: `http://localhost:5000/${cleanedUrl}` });
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

module.exports = router;

/*
  jimp.read(url, (err, img) => {
    img.resize(120, 120)
      .quality(60)
      .write(tempURL)
  })
    .then(() => {
      res.status(400).json({
        thumbUrl: `http://localhost:5000/${cleanedUrl}`,
      });
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` })
    })

*/