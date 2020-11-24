const express = require("express");
const AWS = require('aws-sdk');
const fs = require('fs');
const jimp = require('jimp');
const { v1: uuidv1 } = require('uuid');
const router = express.Router();


// Define S3 bucket login info
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  Bucket: process.env.S3_BUCKET_ID
});


// Post a URL of a pic and get a URL of its thumb on AWS S3
router.post("/", (req, res) => {

  const url = req.body.url;
  const tempPath = './public/uploads/';
  const tempFileName = uuidv1();

  const createThumbPic = async () => {
    const tempURL = tempPath + tempFileName;
    jimp.read(url, async (err, img) => {
      if (err) {
        res.status(400).json({
          error: `${err})`,
        });
        return;
      }
      img.resize(120, 120)
        .quality(60)
        .write(tempURL);
    });
    return tempURL;
  }

  const uploadThumbnailToS3 = async () => {
    const tempURLThumb = await createThumbPic();
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
  }

  // Execute Code and respond to client
  uploadThumbnailToS3().then((resData) => {
    res.status(201).json({ thumbUrl: resData });
  }).catch((err) => {
    res.status(400).json({ error: err });
  });

});

module.exports = router;