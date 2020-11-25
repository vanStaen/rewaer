const express = require("express");
const AWS = require('aws-sdk');
const fs = require('fs');
const router = express.Router();

const createThumbnail = require('../helpers/createThumbnail')


// Define S3 bucket login info
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  Bucket: process.env.S3_BUCKET_ID
});


// Post a URL of a pic and get a URL of its thumb on AWS S3
router.post("/", async (req, res) => {

  const url = req.body.url;

  createThumbnail(url)
    .then(finalURL => {
      console.log('Wait until it happens');
      return res.status(401).json({ thumbURL: finalURL });
    });

  /*

  const uploadThumbnailToS3 = async () => {
    const tempURLThumb = await createThumbPic();
    console.log('2', tempURLThumb);
    const file = await fs.readFileSync(tempURLThumb);
    const params = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: tempFileName,
      Body: file
    };
    // Uploading files to the bucket
    await s3.upload(params, function (err, data) {
      if (err) { throw err; }
      console.log(`File uploaded successfully. ${data.Location}`);
    });
    return Data.Location;
  } */

});

module.exports = router;