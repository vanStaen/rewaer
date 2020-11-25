const express = require("express");
const router = express.Router();

const createThumbnail = require('../helpers/createThumbnail')
const uploadLocalFileS3 = require('../helpers/uploadLocalFileS3')

// Post a URL of a pic and get a URL of its thumb on AWS S3
router.post("/", async (req, res) => {

  const url = req.body.url;

  createThumbnail(url)
    .then(thumbUrlLocal => {
      return res.status(401).json({ thumbUrl: thumbUrlLocal });
    });


});

module.exports = router;