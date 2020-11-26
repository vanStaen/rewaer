const express = require("express");
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const router = express.Router();
const { v1: uuidv1 } = require('uuid');

const createThumbnail = require('../helpers/createThumbnail')
const uploadFileFromUrlToS3 = require('../helpers/uploadFileFromUrlToS3')
const deleteLocalFile = require('../helpers/deleteLocalFile')

// Limits size of 5MB
const sizeLimits = { fileSize: 1024 * 1024 * 5 };

// Allow only JPG nd PNG
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true)
  } else {
    callback(null, true)
  }
}

// Define s23 bucket login info
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  Bucket: process.env.S3_BUCKET_ID
});

// Define upload function as Single upload of 'file' to s3
const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_ID,
    acl: 'public-read',
  }),
  limits: sizeLimits,
  fileFilter: fileFilter
}).single('file');

router.post('/', async (req, res, next) => {
  if (!req.isAuth)
    return res.status(401).json({ error: "Unauthenticated" });
  next();
}, (req, res) => {
  uploadS3(req, res, (error) => {
    //console.log('Requested File: ', req.file);
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {
        // If Success
        const imageOriginalName = req.file.originalname;
        const imageUrl = req.file.location;
        const thumbName = "t_" + req.file.key;
        // Create Thumbnail
        createThumbnail(imageUrl, thumbName)
          .then(thumbUrlLocal => {
            uploadFileFromUrlToS3(thumbUrlLocal, thumbName)
              .then(thumbUrlS3 => {
                deleteLocalFile(thumbName);
                // Return file name and file url to client
                return res.status(200).json({
                  imageOriginalName: imageOriginalName,
                  imageUrl: imageUrl,
                  thumbUrl: thumbUrlS3
                });
              }).catch((err) => {
                return res.status(400).json({ error: err });
              });
          });
      }
    }
  });
});

module.exports = router;

/*

router.post('/', (req, res, next) => {
  if (!req.isAuth)
    return res.status(401).json({ error: "Unauthenticated" });
  next();
}, (req, res) => {
  uploadS3(req, res, (error) => {
    //console.log('Requested File: ', req.file);
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {
        // If Success
        const imageOriginalName = req.file.originalname;
        const imageUrl = req.file.location;
        // Return file name and file url to client
        res.json({
          imageOriginalName: imageOriginalName,
          imageUrl: imageUrl
        });
      }
    }
  });
});

*/