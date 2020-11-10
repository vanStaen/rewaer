const express = require("express");
const AWS = require('aws-sdk');
const router = express.Router();

// configure the keys for accessing AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  
// create S3 instance
const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: process.env.S3_BUCKET_ID,
      ContentType: type.mime,
      Key: `${name}.${type.ext}`,
    };
    return s3.upload(params).promise();
  };

// POST upload
router.post("/", async (req, res) => {
    res.status(200).json({msg: 'Upload was a success!' });
});

module.exports = router;
