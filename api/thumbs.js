const express = require("express");
const { v1: uuidv1 } = require('uuid');
const router = express.Router();

const createThumbnail = require('../helpers/createThumbnail')
const uploadFileToS3 = require('../helpers/uploadFileToS3')
const deleteLocalFile = require('../helpers/deleteLocalFile')

// Post a URL of a pic and get a URL of its thumb on AWS S3
router.post("/", async (req, res) => {

  const url = req.body.url;
  const fileName = uuidv1();

  createThumbnail(url, fileName)
    .then(thumbUrlLocal => {
      uploadFileToS3(thumbUrlLocal, fileName)
        .then(thumbUrlS3 => {
          deleteLocalFile(fileName);
          return res.status(201).json({ thumbUrl: thumbUrlS3 });
        }).catch((err) => {
          return res.status(400).json({ error: err });
        });
    });


});

module.exports = router;