const express = require("express");
const AWS = require('aws-sdk');
const multer = require('multer');
const router = express.Router();

// Allow only JPG nd PNG
const fileFilter = (req, file, callback) =>{
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true)
  } else {
    callback(null, true)
  }
}

// Limits size of 5MB
const limits = { fileSize: 1024 * 1024 * 5 };

// Define the upload methods
const upload = multer({dest: 'public/uploads/', limits: limits, fileFilter: fileFilter });

// POST upload
router.post("/", upload.single('image'), (req, res, next) => {
    if (!req.isAuth) {
      res.status(401).json({error: "Unauthenticated"});
    } else {
      console.log('file', req.file);
      res.status(200).json({resultFileName: req.file.filename });
    }
});

module.exports = router;


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