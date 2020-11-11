const express = require("express");
const AWS = require('aws-sdk');
const multer = require('multer');

const router = express.Router();
const upload = multer({dest: 'public/uploads/'});

/* 
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
  */

// POST upload
router.post("/", upload.single('image'), (req, res, next) => {
    console.log('file', req.file);
    const id = req.body.userId;
    console.log('id', id);
    res.status(200).json({userId: req.body.userId, fileName: req.file.originalname });
});

module.exports = router;