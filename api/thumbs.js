const express = require("express");
const { v1: uuidv1 } = require('uuid');
const router = express.Router();

const createThumbnail = require('../helpers/createThumbnail')
const uploadLocalFileS3 = require('../helpers/uploadLocalFileS3')

// Post a URL of a pic and get a URL of its thumb on AWS S3
router.post("/", async (req, res) => {

  const url = req.body.url;
  const randomName = uuidv1();

  createThumbnail(url, randomName)
    .then(thumbUrlLocal => {
      uploadLocalFileS3(thumbUrlLocal, randomName)
        .then(thumbUrlS3 => {
          return res.status(401).json({ thumbUrl: thumbUrlS3 });
        });
    });


});

module.exports = router;