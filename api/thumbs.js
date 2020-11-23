const express = require("express");
const AWS = require('aws-sdk');
const fs = require('fs');
const jimp = require('jimp');
const { v1: uuidv1 } = require('uuid');
const router = express.Router();


// Define s23 bucket login info
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  Bucket: process.env.S3_BUCKET_ID
});

// Upload File to S3
async function uploadFileS3(tempURL, tempFileName) {
  const file = fs.readFileSync(tempURL);
  const params = {
    Bucket: process.env.S3_BUCKET_ID,
    Key: tempFileName,
    Body: file
  };
  // Uploading files to the bucket
  const resURL = await s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    return data.Location
  });
  return resURL
};

// Post a URL of a pic and get a URL of its thumb on AWS S3
router.post("/", async (req, res) => {

  const url = req.body.url;
  const tempPath = './public/uploads/';
  const tempFileName = uuidv1();
  const tempURL = tempPath + tempFileName;
  const cleanedUrl = tempURL.slice(2, tempURL.length);

  jimp.read(url, (err, img) => {
    if (err) {
      res.status(400).json({
        error: `${err})`,
      });
      return;
    }
    img.resize(120, 120)
      .quality(60)
      .write(tempURL);

    // upload to S3
    const thumbOnS3 = uploadFileS3(tempURL, tempFileName);
    console.log('thumbOnS3', thumbOnS3)

    // Return the URL of the tubnail on S3
    res.status(201).json({ thumbUrlOns3: `http://localhost:5000/${thumbOnS3}` });
  });

});

module.exports = router;